import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseServiceKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
}

// Create a Supabase client with the service role key for server-side operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Generate a limited-scope JWT token for external API authentication
 * This token has specific claims and a short expiration time
 */
export async function generateExternalApiToken(payload: {
  name: string;
  email: string;
  service: string;
}) {
  try {
    // Create a custom JWT with limited scope
    const tokenPayload = {
      aud: 'external-api',
      iss: supabaseUrl,
      sub: 'contact-form',
      exp: Math.floor(Date.now() / 1000) + (5 * 60), // 5 minutes expiration
      iat: Math.floor(Date.now() / 1000),
      // Limited scope claims
      scope: ['contact:submit'],
      user: {
        name: payload.name,
        email: payload.email,
        service: payload.service,
      },
    };

    // Sign the token with the service role key (only for token generation)
    const token = jwt.sign(tokenPayload, supabaseServiceKey, {
      algorithm: 'HS256',
    });

    return token;
  } catch (error) {
    console.error('Error generating external API token:', error);
    throw new Error('Failed to generate authentication token');
  }
}



// Type definitions
export interface InquiryData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  timestamp: string;
}

export interface ExternalApiTokenPayload {
  name: string;
  email: string;
  service: string;
} 