import { beforeEach, describe, expect, it, vi } from "vitest";
import { 
  createMockUserService, 
  createMockUserServiceWithUser, 
  createMockUserServiceWithError,
  mockUserDetails,
  mockAdminUserDetails 
} from "./__mocks__/user-service";

// Example of how to use the mock UserService in other tests
describe("UserService Mock Examples", () => {
  describe("Basic mock usage", () => {
    it("should use default mock that returns null", async () => {
      const mockUserService = createMockUserService();
      
      const result = await mockUserService.getUser("user-123");
      
      expect(result).toBeNull();
      expect(mockUserService.getUser).toHaveBeenCalledWith("user-123");
    });

    it("should use mock with predefined user data", async () => {
      const mockUserService = createMockUserServiceWithUser(mockUserDetails);
      
      const result = await mockUserService.getUser("user-123");
      
      expect(result).toEqual(mockUserDetails);
      expect(mockUserService.getUser).toHaveBeenCalledWith("user-123");
    });

    it("should use mock with error", async () => {
      const error = new Error("API Error");
      const mockUserService = createMockUserServiceWithError(error);
      
      await expect(mockUserService.getUser("user-123")).rejects.toThrow("API Error");
      expect(mockUserService.getUser).toHaveBeenCalledWith("user-123");
    });
  });

  describe("Custom mock implementations", () => {
    it("should allow custom mock implementations", async () => {
      const mockUserService = createMockUserService();
      
      // Override specific method
      mockUserService.getUser.mockResolvedValue(mockAdminUserDetails);
      
      const result = await mockUserService.getUser("admin-123");
      
      expect(result).toEqual(mockAdminUserDetails);
      expect(mockUserService.getUser).toHaveBeenCalledWith("admin-123");
    });

    it("should allow different responses for different calls", async () => {
      const mockUserService = createMockUserService();
      
      // Mock different responses for different calls
      mockUserService.getUser
        .mockResolvedValueOnce(mockUserDetails)
        .mockResolvedValueOnce(mockAdminUserDetails)
        .mockResolvedValueOnce(null);
      
      const result1 = await mockUserService.getUser("user-123");
      const result2 = await mockUserService.getUser("admin-123");
      const result3 = await mockUserService.getUser("nonexistent");
      
      expect(result1).toEqual(mockUserDetails);
      expect(result2).toEqual(mockAdminUserDetails);
      expect(result3).toBeNull();
      
      expect(mockUserService.getUser).toHaveBeenCalledTimes(3);
    });
  });

  describe("Integration with other components", () => {
    it("should work with component that uses UserService", async () => {
      // This is an example of how you might mock UserService in a component test
      const mockUserService = createMockUserServiceWithUser(mockUserDetails);
      
      // Mock the module import
      vi.doMock("./user-service", () => ({
        UserService: vi.fn().mockImplementation(() => mockUserService),
      }));
      
      // In a real component test, you would:
      // 1. Import the component that uses UserService
      // 2. Render the component
      // 3. Assert that the component behaves correctly with the mocked service
      
      expect(mockUserService.getUser).not.toHaveBeenCalled();
    });
  });
}); 