import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';

// Mock console.log and console.error
const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => undefined);
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

describe('Contact API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles valid contact form submission', async () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '5551234567',
      service: 'residential',
      message: 'I need help with my sunken driveway.',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(validData),
    });

    const response = await POST(request);
    const responseData = await response.json();

    expect(response.status).toBe(200);
    expect(responseData.message).toBe('Contact form submitted successfully');
    expect(mockConsoleLog).toHaveBeenCalledWith(
      'Contact form submission:',
      expect.objectContaining({
        ...validData,
        recipientEmail: 'ccmudjacking@gmail.com',
      })
    );
  });

  it('handles missing required fields', async () => {
    const invalidData = {
      name: '',
      email: 'invalid-email',
      phone: '123',
      service: '',
      message: 'Short',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const responseData = await response.json();

    expect(response.status).toBe(400);
    expect(responseData.message).toBe('Validation error');
    expect(responseData.errors).toBeDefined();
    expect(responseData.errors.length).toBeGreaterThan(0);
  });

  it('handles invalid email format', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      phone: '5551234567',
      service: 'residential',
      message: 'I need help with my sunken driveway.',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const responseData = await response.json();

    expect(response.status).toBe(400);
    expect(responseData.message).toBe('Validation error');
  });

  it('handles short name', async () => {
    const invalidData = {
      name: 'J',
      email: 'john@example.com',
      phone: '5551234567',
      service: 'residential',
      message: 'I need help with my sunken driveway.',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const responseData = await response.json();

    expect(response.status).toBe(400);
    expect(responseData.message).toBe('Validation error');
  });

  it('handles short phone number', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123',
      service: 'residential',
      message: 'I need help with my sunken driveway.',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const responseData = await response.json();

    expect(response.status).toBe(400);
    expect(responseData.message).toBe('Validation error');
  });

  it('handles short message', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '5551234567',
      service: 'residential',
      message: 'Short',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const responseData = await response.json();

    expect(response.status).toBe(400);
    expect(responseData.message).toBe('Validation error');
  });

  it('handles missing service selection', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '5551234567',
      service: '',
      message: 'I need help with my sunken driveway.',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(request);
    const responseData = await response.json();

    expect(response.status).toBe(400);
    expect(responseData.message).toBe('Validation error');
  });

  it('handles malformed JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: 'invalid json',
    });

    const response = await POST(request);
    const responseData = await response.json();

    expect(response.status).toBe(500);
    expect(responseData.message).toBe('Internal server error');
    expect(mockConsoleError).toHaveBeenCalled();
  });

  it('uses custom contact email from environment variable', async () => {
    // Temporarily set environment variable
    const originalEnv = process.env.CONTACT_EMAIL;
    process.env.CONTACT_EMAIL = 'custom@example.com';

    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '5551234567',
      service: 'residential',
      message: 'I need help with my sunken driveway.',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(validData),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      'Contact form submission:',
      expect.objectContaining({
        recipientEmail: 'custom@example.com',
      })
    );

    // Restore original environment variable
    process.env.CONTACT_EMAIL = originalEnv;
  });
});
