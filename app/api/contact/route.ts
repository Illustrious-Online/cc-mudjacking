import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateExternalApiToken } from '@/lib/supabase';

async function verifyRecaptcha(
  token: string
): Promise<{ success: boolean; isNetworkError?: boolean }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('reCAPTCHA secret key not configured');
    return { success: false };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    // Check if the verification was successful and score is acceptable
    // reCAPTCHA v3 returns a score from 0.0 to 1.0, where 1.0 is very likely a good interaction
    return { success: data.success === true && data.score >= 0.5 };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, isNetworkError: true };
  }
}

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  recaptchaToken: z.string().min(1, 'reCAPTCHA verification required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    // Verify reCAPTCHA token
    const recaptchaResult = await verifyRecaptcha(validatedData.recaptchaToken);

    if (!recaptchaResult.success) {
      if (recaptchaResult.isNetworkError) {
        return NextResponse.json(
          {
            message: 'Network error - unable to reach external service',
            error: 'Network error',
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          message: 'reCAPTCHA verification failed',
          error: 'Invalid or suspicious request',
        },
        { status: 400 }
      );
    }

    // Generate a limited-scope JWT token for external API authentication
    const authToken = await generateExternalApiToken({
      name: validatedData.name,
      email: validatedData.email,
      service: validatedData.service,
    });

    // Prepare the request payload (exclude recaptchaToken from external API)
    const requestPayload = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      service: validatedData.service,
      message: validatedData.message,
      timestamp: new Date().toISOString(),
    };

    // Send data to external API with limited-scope JWT token
    const externalApiResponse = await fetch(`${process.env.ELYSIA_API_URL}/inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        'X-Supabase-Project-Ref':
          process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0] || '',
        'X-Token-Type': 'limited-scope-jwt',
        'X-Token-Expires': new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes from now
      },
      body: JSON.stringify(requestPayload),
    });

    if (!externalApiResponse.ok) {
      console.error('External API error:', {
        status: externalApiResponse.status,
        statusText: externalApiResponse.statusText,
        data: validatedData,
      });

      return NextResponse.json(
        {
          message: 'Failed to submit inquiry to external service',
          error: 'External service unavailable',
        },
        { status: 502 }
      );
    }

    const externalApiData = await externalApiResponse.json();

    console.log('Contact form submitted successfully:', {
      ...validatedData,
      timestamp: new Date().toISOString(),
      externalApiResponse: externalApiData,
    });

    return NextResponse.json(
      {
        message: 'Contact form submitted successfully',
        data: externalApiData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: 'Validation error',
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    // Handle authentication errors
    if (error instanceof Error && error.message.includes('authentication')) {
      return NextResponse.json(
        {
          message: 'Authentication error',
          error: 'Unable to authenticate with external service',
        },
        { status: 401 }
      );
    }

    // Handle network errors or other fetch-related errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        {
          message: 'Network error - unable to reach external service',
          error: 'Network error',
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        message: 'Internal server error',
        error: 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
