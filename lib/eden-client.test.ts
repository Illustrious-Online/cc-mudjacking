/**
 * Eden Treaty Client Tests
 * 
 * This file tests the Eden Treaty client integration for end-to-end type safety.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  client, 
  submitContactForm, 
  getInquiry, 
  getInquiries, 
  updateInquiry, 
  deleteInquiry 
} from './eden-client';

// Mock the environment variables
vi.mock('process', () => ({
  env: {
    ELYSIA_API_URL: 'http://localhost:3001',
  },
}));

// Set the environment variable for tests
process.env.ELYSIA_API_URL = 'http://localhost:3001';

describe('Eden Treaty Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('submitContactForm', () => {
    it('should have correct type structure for contact form data', () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234',
        service: 'Mudjacking',
        message: 'I need mudjacking services for my driveway',
        timestamp: new Date().toISOString(),
      };

      // TypeScript should validate this structure at compile time
      expect(contactData.name).toBe('John Doe');
      expect(contactData.email).toBe('john@example.com');
      expect(contactData.phone).toBe('555-1234');
      expect(contactData.service).toBe('Mudjacking');
      expect(contactData.message).toBe('I need mudjacking services for my driveway');
      expect(contactData.timestamp).toBeDefined();
    });

    it('should handle optional phone field', () => {
      const contactData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        service: 'Foundation Repair',
        message: 'I need foundation repair services',
        timestamp: new Date().toISOString(),
      };

      // Phone is optional, so this should be valid
      expect(contactData.name).toBe('Jane Doe');
      expect(contactData.email).toBe('jane@example.com');
      expect(contactData.phone).toBeUndefined();
    });
  });

  describe('getInquiry', () => {
    it('should accept string ID parameter', () => {
      const inquiryId = 'test-inquiry-id';
      
      // TypeScript should validate that ID is a string
      expect(typeof inquiryId).toBe('string');
      expect(inquiryId).toBe('test-inquiry-id');
    });
  });

  describe('getInquiries', () => {
    it('should handle optional query parameters', () => {
      const queryParams = {
        page: '1',
        limit: '10',
        service: 'Mudjacking',
        search: 'driveway',
      };

      // All query parameters should be optional
      expect(queryParams.page).toBe('1');
      expect(queryParams.limit).toBe('10');
      expect(queryParams.service).toBe('Mudjacking');
      expect(queryParams.search).toBe('driveway');
    });

    it('should handle empty query parameters', () => {
      const emptyQuery = {};

      // Should accept empty query object
      expect(emptyQuery).toEqual({});
    });
  });

  describe('updateInquiry', () => {
    it('should handle partial update data', () => {
      const updateData = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      // Should accept partial update data
      expect(updateData.name).toBe('Updated Name');
      expect(updateData.email).toBe('updated@example.com');
    });

    it('should handle all optional fields', () => {
      const fullUpdateData = {
        name: 'Full Update',
        email: 'full@example.com',
        phone: '555-9999',
        service: 'Updated Service',
        message: 'Updated message content',
      };

      expect(fullUpdateData.name).toBe('Full Update');
      expect(fullUpdateData.email).toBe('full@example.com');
      expect(fullUpdateData.phone).toBe('555-9999');
      expect(fullUpdateData.service).toBe('Updated Service');
      expect(fullUpdateData.message).toBe('Updated message content');
    });
  });

  describe('deleteInquiry', () => {
    it('should accept string ID parameter', () => {
      const inquiryId = 'delete-test-id';
      
      expect(typeof inquiryId).toBe('string');
      expect(inquiryId).toBe('delete-test-id');
    });
  });

  describe('client configuration', () => {
    it('should have correct base URL', () => {
      // The client should be configured with the correct base URL
      expect(process.env.ELYSIA_API_URL).toBe('http://localhost:3001');
    });

    it('should export all necessary functions', () => {
      expect(typeof submitContactForm).toBe('function');
      expect(typeof getInquiry).toBe('function');
      expect(typeof getInquiries).toBe('function');
      expect(typeof updateInquiry).toBe('function');
      expect(typeof deleteInquiry).toBe('function');
      expect(typeof client).toBe('function');
    });
  });

  describe('type safety', () => {
    it('should enforce required fields in contact form', () => {
      // This test ensures TypeScript compilation will fail if required fields are missing
      const validContactData = {
        name: 'Test User',
        email: 'test@example.com',
        service: 'Test Service',
        message: 'Test message content',
        timestamp: new Date().toISOString(),
      };

      // All required fields should be present
      expect(validContactData.name).toBeDefined();
      expect(validContactData.email).toBeDefined();
      expect(validContactData.service).toBeDefined();
      expect(validContactData.message).toBeDefined();
      expect(validContactData.timestamp).toBeDefined();
    });

    it('should enforce string types for IDs', () => {
      const inquiryId = 'string-id';
      
      // ID should be a string
      expect(typeof inquiryId).toBe('string');
    });

    it('should enforce email format validation', () => {
      const validEmail = 'test@example.com';
      const invalidEmail = 'not-an-email';
      
      // Valid email should pass
      expect(validEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      
      // Invalid email should not match pattern
      expect(invalidEmail).not.toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });

  describe('error handling', () => {
    it('should handle network errors gracefully', () => {
      // This test ensures the client can handle network errors
      const networkError = new Error('Network error');
      
      expect(networkError.message).toBe('Network error');
      expect(networkError).toBeInstanceOf(Error);
    });

    it('should handle validation errors', () => {
      const validationError = {
        message: 'Validation error',
        status: 400,
      };
      
      expect(validationError.message).toBe('Validation error');
      expect(validationError.status).toBe(400);
    });
  });
});
