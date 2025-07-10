import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserService } from "./user-service";
import type { UserDetails } from "@/types/auth";

// Mock fetch globally
global.fetch = vi.fn();

// Mock console.error to avoid noise in tests
const mockConsoleError = vi.spyOn(console, "error").mockImplementation(() => {});

describe("UserService", () => {
  let userService: UserService;
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    
    // Reset environment variables
    delete process.env.ELYSIA_API_URL;
    
    userService = new UserService();
    mockFetch = fetch as ReturnType<typeof vi.fn>;
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  describe("constructor", () => {
    it("should use default API URL when ELYSIA_API_URL is not set", () => {
      delete process.env.ELYSIA_API_URL;
      const service = new UserService();
      expect(service.apiUrl).toBe("http://localhost:8000");
    });

    it("should use environment variable when ELYSIA_API_URL is set", () => {
      process.env.ELYSIA_API_URL = "https://api.example.com";
      const service = new UserService();
      expect(service.apiUrl).toBe("https://api.example.com");
    });
  });

  describe("createUser", () => {
    const mockUserData = {
      id: "user-123",
      email: "test@example.com",
      firstName: "John",
      lastName: "Doe",
      avatarUrl: "https://example.com/avatar.jpg",
    };

    const mockUserDetails: UserDetails = {
      id: "user-123",
      identifier: "user-123",
      email: "test@example.com",
      firstName: "John",
      lastName: "Doe",
      avatarUrl: "https://example.com/avatar.jpg",
      role: "user",
      superAdmin: false,
    };

    it("should successfully create a user", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockUserDetails),
      });

      const result = await userService.createUser(mockUserData);

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8000/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mockUserData),
        }
      );
      expect(result).toEqual(mockUserDetails);
    });

    it("should handle partial user data", async () => {
      const partialUserData = {
        id: "user-123",
        email: "test@example.com",
      };

      const partialUserDetails: UserDetails = {
        id: "user-123",
        identifier: "user-123",
        email: "test@example.com",
        role: "user",
        superAdmin: false,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(partialUserDetails),
      });

      const result = await userService.createUser(partialUserData);

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8000/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(partialUserData),
        }
      );
      expect(result).toEqual(partialUserDetails);
    });

    it("should return null when API returns non-ok response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: "Bad Request",
      });

      const result = await userService.createUser(mockUserData);

      expect(result).toBeNull();
      expect(mockConsoleError).toHaveBeenCalledWith(
        "Error creating user:",
        expect.any(Error)
      );
    });

    it("should return null when fetch throws an error", async () => {
      const networkError = new Error("Network error");
      mockFetch.mockRejectedValueOnce(networkError);

      const result = await userService.createUser(mockUserData);

      expect(result).toBeNull();
      expect(mockConsoleError).toHaveBeenCalledWith(
        "Error creating user:",
        networkError
      );
    });

    it("should use custom API URL when configured", async () => {
      process.env.ELYSIA_API_URL = "https://api.example.com";
      const customService = new UserService();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockUserDetails),
      });

      await customService.createUser(mockUserData);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.example.com/users",
        expect.any(Object)
      );
    });
  });

  describe("getUser", () => {
    const mockUserDetails: UserDetails = {
      id: "user-123",
      identifier: "user-123",
      email: "test@example.com",
      firstName: "John",
      lastName: "Doe",
      avatarUrl: "https://example.com/avatar.jpg",
      role: "user",
      superAdmin: false,
    };

    it("should successfully fetch user by ID", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockUserDetails),
      });

      const result = await userService.getUser("user-123");

      expect(mockFetch).toHaveBeenCalledWith("http://localhost:8000/user/user-123");
      expect(result).toEqual(mockUserDetails);
    });

    it("should successfully fetch user with custom parameter", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockUserDetails),
      });

      const result = await userService.getUser("test@example.com", "email");

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8000/user/test@example.com?by=email"
      );
      expect(result).toEqual(mockUserDetails);
    });

    it("should return null when user is not found (404)", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      const result = await userService.getUser("nonexistent-user");

      expect(result).toBeNull();
      expect(mockConsoleError).not.toHaveBeenCalled();
    });

    it("should return null when API returns other error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      const result = await userService.getUser("user-123");

      expect(result).toBeNull();
      expect(mockConsoleError).toHaveBeenCalledWith(
        "Error fetching user:",
        expect.any(Error)
      );
    });

    it("should return null when fetch throws an error", async () => {
      const networkError = new Error("Network error");
      mockFetch.mockRejectedValueOnce(networkError);

      const result = await userService.getUser("user-123");

      expect(result).toBeNull();
      expect(mockConsoleError).toHaveBeenCalledWith(
        "Error fetching user:",
        networkError
      );
    });

    it("should use custom API URL when configured", async () => {
      process.env.ELYSIA_API_URL = "https://api.example.com";
      const customService = new UserService();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockUserDetails),
      });

      await customService.getUser("user-123");

      expect(mockFetch).toHaveBeenCalledWith("https://api.example.com/user/user-123");
    });
  });

  describe("updateUser", () => {
    const mockUserDetails: UserDetails = {
      id: "user-123",
      identifier: "user-123",
      email: "test@example.com",
      firstName: "John",
      lastName: "Doe",
      avatarUrl: "https://example.com/avatar.jpg",
      role: "user",
      superAdmin: false,
    };

    const updateData = {
      firstName: "Jane",
      lastName: "Smith",
    };

    it("should successfully update user", async () => {
      const updatedUserDetails = { ...mockUserDetails, ...updateData };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(updatedUserDetails),
      });

      const result = await userService.updateUser("user-123", updateData);

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8000/users/user-123",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
      expect(result).toEqual(updatedUserDetails);
    });

    it("should handle empty update data", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockUserDetails),
      });

      const result = await userService.updateUser("user-123", {});

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:8000/users/user-123",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      expect(result).toEqual(mockUserDetails);
    });

    it("should throw error when API returns non-ok response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: "Bad Request",
      });

      await expect(userService.updateUser("user-123", updateData)).rejects.toThrow(
        "Failed to update user"
      );
    });

    it("should throw error when fetch throws an error", async () => {
      const networkError = new Error("Network error");
      mockFetch.mockRejectedValueOnce(networkError);

      await expect(userService.updateUser("user-123", updateData)).rejects.toThrow(
        "Network error"
      );
    });

    it("should use custom API URL when configured", async () => {
      process.env.ELYSIA_API_URL = "https://api.example.com";
      const customService = new UserService();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockUserDetails),
      });

      await customService.updateUser("user-123", updateData);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.example.com/users/user-123",
        expect.any(Object)
      );
    });
  });
}); 