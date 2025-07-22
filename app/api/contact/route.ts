import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// type ContactFormData = z.infer<typeof contactSchema>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    // Get the recipient email from environment variables
    const recipientEmail = process.env.CONTACT_EMAIL || 'ccmudjacking@gmail.com';

    // For now, we'll just log the data and return success
    // In a real implementation, you would send an email here
    console.log('Contact form submission:', {
      ...validatedData,
      timestamp: new Date().toISOString(),
      recipientEmail,
    });

    // TODO: Implement actual email sending
    // You can use services like:
    // - Resend (resend.com)
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES

    // Example with Resend (you would need to install @resend/node):
    /*
    import { Resend } from '@resend/node';
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'ccmudjacking@gmail.com',
      to: recipientEmail,
      subject: `New Contact Form Submission - ${validatedData.service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Service:</strong> ${validatedData.service}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
      `,
    });
    */

    // TODO: Store in database for dashboard
    // You can use your existing Supabase setup:
    /*
    import { createClient } from '@supabase/supabase-js';
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    await supabase
      .from('contact_inquiries')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        service: validatedData.service,
        message: validatedData.message,
        status: 'new',
        created_at: new Date().toISOString(),
      });
    */

    return NextResponse.json({ message: 'Contact form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: 'Validation error',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
