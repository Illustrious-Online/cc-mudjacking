import type { UserDetails } from "@/types/auth";
import { vi } from "vitest";

export class UserService {
  public apiUrl: string;

  constructor() {
    this.apiUrl = process.env.ELYSIA_API_URL || "http://localhost:8000";
  }

  // Mock methods that can be spied on
  createUser = vi.fn();
  getUser = vi.fn();
  updateUser = vi.fn();

  // Static mock instances for common scenarios
  static createMockInstance() {
    const mockService = new UserService();
    
    // Default mock implementations
    mockService.createUser.mockResolvedValue(null);
    mockService.getUser.mockResolvedValue(null);
    mockService.updateUser.mockResolvedValue(null);
    
    return mockService;
  }

  static createMockInstanceWithUser(userDetails: UserDetails) {
    const mockService = new UserService();
    
    mockService.createUser.mockResolvedValue(userDetails);
    mockService.getUser.mockResolvedValue(userDetails);
    mockService.updateUser.mockResolvedValue(userDetails);
    
    return mockService;
  }

  static createMockInstanceWithError(error: Error) {
    const mockService = new UserService();
    
    mockService.createUser.mockRejectedValue(error);
    mockService.getUser.mockRejectedValue(error);
    mockService.updateUser.mockRejectedValue(error);
    
    return mockService;
  }
}

// Export mock factory functions for easy use in tests
export const createMockUserService = UserService.createMockInstance;
export const createMockUserServiceWithUser = UserService.createMockInstanceWithUser;
export const createMockUserServiceWithError = UserService.createMockInstanceWithError;

// Common mock user data
export const mockUserDetails: UserDetails = {
  id: "mock-user-id",
  identifier: "mock-user-id",
  email: "mock@example.com",
  firstName: "Mock",
  lastName: "User",
  avatarUrl: "https://example.com/avatar.jpg",
  role: "user",
  superAdmin: false,
};

export const mockAdminUserDetails: UserDetails = {
  id: "mock-admin-id",
  identifier: "mock-admin-id",
  email: "admin@example.com",
  firstName: "Admin",
  lastName: "User",
  avatarUrl: "https://example.com/admin-avatar.jpg",
  role: "admin",
  superAdmin: true,
}; 