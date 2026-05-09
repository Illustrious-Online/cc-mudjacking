import { treaty } from "@elysiajs/eden";
import { Elysia, t } from "elysia";

// Configuration for Eden Treaty
const config = {
  url: process.env.ELYSIA_API_URL || "http://localhost:3001",
};

/**
 * Elysia app schema for Eden Treaty type safety
 * 
 * This defines the API structure that matches your external Elysia API
 * to provide end-to-end type safety between frontend and backend.
 */
const app = new Elysia()
  .get("/", () => ({ 
    name: "CC Mudjacking API", 
    version: "1.0.0" 
  }))
  .post(
    "/inquiry",
    ({ body }) => ({
      message: "Inquiry created successfully",
      data: {
        id: "generated-id",
        ...body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }),
    {
      body: t.Object({
        name: t.String({ minLength: 2, maxLength: 256 }),
        email: t.String({ format: "email" }),
        phone: t.Optional(t.String({ maxLength: 256 })),
        service: t.String({ minLength: 1, maxLength: 256 }),
        message: t.String({ minLength: 10, maxLength: 2000 }),
        timestamp: t.String(),
      }),
    },
  )
  .get("/inquiry", () => ({
    message: "Inquiries retrieved successfully",
    data: [],
  }))
  .get("/inquiry/:id", ({ params }) => ({
    message: "Inquiry retrieved successfully",
    data: { 
      id: params.id,
      name: "Sample Inquiry",
      email: "sample@example.com",
      service: "Mudjacking",
      message: "Sample message",
      createdAt: new Date().toISOString(),
    },
  }))
  .put("/inquiry/:id", ({ body }) => ({
    message: "Inquiry updated successfully",
    data: body,
  }))
  .delete("/inquiry/:id", () => ({
    message: "Inquiry deleted successfully",
    data: null,
  }));

/**
 * Eden Treaty client for type-safe API communication.
 * 
 * This client provides end-to-end type safety between your Next.js frontend
 * and the external Elysia API. All API calls are fully typed based on the server schema.
 * 
 * @example
 * ```typescript
 * import { client } from './lib/eden-client';
 * 
 * // Fully typed API call
 * const response = await client.inquiry.post({
 *   name: "John Doe",
 *   email: "john@example.com",
 *   service: "Mudjacking",
 *   message: "I need mudjacking services",
 *   timestamp: new Date().toISOString()
 * });
 * 
 * if (response.data) {
 *   console.log(response.data.message); // Fully typed!
 *   console.log(response.data.data.id); // Inquiry ID
 * }
 * ```
 */
export const client = treaty(app, config.url as any);

/**
 * Eden Treaty client for production environment.
 * 
 * Use this for production builds with the actual API URL.
 */
export const clientProd = treaty(app, config.url as any);

/**
 * Helper function to get the appropriate client based on environment.
 * 
 * @param baseURL - Optional base URL for the API
 * @returns Eden Treaty client instance
 */
export function createClient(baseURL?: string) {
  return treaty(app, (baseURL || config.url) as any);
}

/**
 * Type-safe contact form submission
 * 
 * @param data - Contact form data
 * @param options - Request options including headers
 * @returns Promise with typed response
 */
export async function submitContactForm(
  data: {
    name: string;
    email: string;
    phone?: string;
    service: string;
    message: string;
    timestamp: string;
  },
  options?: {
    headers?: Record<string, string>;
  }
) {
  return client.inquiry.post(data, options);
}

/**
 * Type-safe inquiry retrieval by ID
 * 
 * @param id - Inquiry ID
 * @returns Promise with typed response
 */
export async function getInquiry(id: string) {
  return client.inquiry({ id }).get();
}

/**
 * Type-safe inquiry list retrieval
 * 
 * @param query - Query parameters
 * @returns Promise with typed response
 */
export async function getInquiries(query?: {
  page?: string;
  limit?: string;
  service?: string;
  search?: string;
}) {
  return client.inquiry.get({ query });
}

/**
 * Type-safe inquiry update
 * 
 * @param id - Inquiry ID
 * @param data - Update data
 * @returns Promise with typed response
 */
export async function updateInquiry(
  id: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    service?: string;
    message?: string;
  }
) {
  return client.inquiry({ id }).put(data);
}

/**
 * Type-safe inquiry deletion
 * 
 * @param id - Inquiry ID
 * @returns Promise with typed response
 */
export async function deleteInquiry(id: string) {
  return client.inquiry({ id }).delete();
}

export default client;
