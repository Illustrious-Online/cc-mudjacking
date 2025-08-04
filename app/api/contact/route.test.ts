import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';

// Mock console.log and console.error
const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => undefined);
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock the JWT token generation
vi.mock('@/lib/supabase', () => ({
  generateExternalApiToken: vi.fn().mockResolvedValue('mock-jwt-token'),
}));

describe('Contact API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default successful response from external API
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, id: '12345' }),
    });
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
    expect(responseData.data).toEqual({ success: true, id: '12345' });

    // Verify external API was called with correct data
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.illustrious.cloud/inquiry',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer mock-jwt-token',
          'X-Supabase-Project-Ref': '',
          'X-Token-Type': 'limited-scope-jwt',
          'X-Token-Expires': expect.any(String),
        },
      })
    );

    // Verify the body contains the expected data
    const fetchCall = mockFetch.mock.calls[0];
    const bodyData = JSON.parse(fetchCall[1].body);
    expect(bodyData).toMatchObject({
      ...validData,
      timestamp: expect.any(String),
    });

    expect(mockConsoleLog).toHaveBeenCalledWith(
      'Contact form submitted successfully:',
      expect.objectContaining({
        ...validData,
        timestamp: expect.any(String),
        externalApiResponse: { success: true, id: '12345' },
      })
    );
  });

  it('handles external API failure', async () => {
    // Mock external API failure
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

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

    expect(response.status).toBe(502);
    expect(responseData.message).toBe('Failed to submit inquiry to external service');
    expect(responseData.error).toBe('External service unavailable');

    expect(mockConsoleError).toHaveBeenCalledWith(
      'External API error:',
      expect.objectContaining({
        status: 500,
        statusText: 'Internal Server Error',
        data: validData,
      })
    );
  });

  it('handles network errors', async () => {
    // Mock network error
    mockFetch.mockRejectedValue(new TypeError('Failed to fetch'));

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

    expect(response.status).toBe(503);
    expect(responseData.message).toBe('Network error - unable to reach external service');
    expect(responseData.error).toBe('Network error');
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
});
