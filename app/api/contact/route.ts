import { type NextRequest, NextResponse } from 'next/server';
import { submitContactForm } from '../../../lib/eden-client';

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

// Basic validation interface - Eden Treaty will handle detailed validation
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  recaptchaToken: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormData;

    // Basic validation - Eden Treaty will handle detailed validation
    if (!(body.name && body.email && body.service && body.message && body.recaptchaToken)) {
      return NextResponse.json(
        {
          message: 'Missing required fields',
          error: 'Please fill in all required fields',
        },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    const recaptchaResult = await verifyRecaptcha(body.recaptchaToken);

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

    // Use Eden Treaty for type-safe API call
    const response = await submitContactForm(
      {
        name: body.name,
        email: body.email,
        phone: body.phone,
        service: body.service,
        message: body.message,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'X-Org-Id': process.env.ORGANIZATION_ID || 'cc-mudjacking',
        },
      }
    );

    // Handle Eden Treaty response
    if (response.error) {
      console.error('External API error:', {
        status: response.error.status,
        message: response.error.value?.message || 'Unknown error',
        data: body,
      });

      return NextResponse.json(
        {
          message: 'Failed to submit inquiry to external service',
          error: response.error.value?.message || 'External service unavailable',
        },
        { status: response.error.status || 502 }
      );
    }

    const externalApiData = response.data?.data;

    console.log('Contact form submitted successfully:', {
      ...body,
      timestamp: new Date().toISOString(),
      externalApiResponse: externalApiData,
    });

    return NextResponse.json(
      {
        message: response.data?.message || 'Contact form submitted successfully',
        data: externalApiData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

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
