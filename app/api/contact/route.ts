import { type NextRequest, NextResponse } from 'next/server';
import { type InquiryInput, submitInquiry } from '../../../lib/inquiry-client';

type ContactFormData = InquiryInput;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormData;

    // Basic presence check; the platform does full validation + reCAPTCHA.
    if (!(body.name && body.email && body.service && body.message && body.recaptchaToken)) {
      return NextResponse.json(
        {
          message: 'Missing required fields',
          error: 'Please fill in all required fields',
        },
        { status: 400 }
      );
    }

    // Forward to the platform — it verifies the reCAPTCHA token (single-use, so
    // we never verify it here), creates the inquiry, and emails the org.
    const result = await submitInquiry({
      name: body.name,
      email: body.email,
      phone: body.phone,
      service: body.service,
      message: body.message,
      recaptchaToken: body.recaptchaToken,
    });

    if (!result.ok) {
      return NextResponse.json(
        { message: result.message, error: result.message },
        { status: result.status }
      );
    }

    return NextResponse.json(
      { message: 'Inquiry submitted successfully', data: { id: result.id } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: 'Unknown error occurred' },
      { status: 500 }
    );
  }
}
