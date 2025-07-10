# UserService Tests and Mocks

This directory contains comprehensive tests and mocks for the `UserService` class.

## Files

- `user-service.ts` - The actual UserService implementation
- `user-service.test.ts` - Comprehensive unit tests for UserService
- `user-service-mock-example.test.ts` - Examples of how to use the mock UserService
- `__mocks__/user-service.ts` - Mock implementation for use in other tests

## Test Coverage

The UserService tests achieve **100% coverage** across all metrics:
- **Statements**: 100%
- **Branches**: 100%
- **Functions**: 100%
- **Lines**: 100%

## Running Tests

```bash
# Run all service tests
bun run test services/

# Run specific test file
bun run test services/user-service.test.ts

# Run with coverage
bun run test services/ --coverage
```

## Test Scenarios Covered

### Constructor Tests
- Default API URL when environment variable is not set
- Custom API URL when environment variable is set

### createUser Tests
- Successful user creation
- Handling partial user data
- Error handling for non-ok API responses
- Error handling for network failures
- Custom API URL configuration

### getUser Tests
- Fetching user by ID
- Fetching user with custom parameter (e.g., by email)
- Handling 404 responses (user not found)
- Error handling for other API errors
- Error handling for network failures
- Custom API URL configuration

### updateUser Tests
- Successful user updates
- Handling empty update data
- Error handling for non-ok API responses
- Error handling for network failures
- Custom API URL configuration

## Using Mocks in Other Tests

The `__mocks__/user-service.ts` file provides reusable mocks for testing components that depend on UserService.

### Basic Usage

```typescript
import { createMockUserService } from "./services/__mocks__/user-service";

const mockUserService = createMockUserService();
// mockUserService.getUser.mockResolvedValue(null) by default
```

### Mock with User Data

```typescript
import { 
  createMockUserServiceWithUser, 
  mockUserDetails 
} from "./services/__mocks__/user-service";

const mockUserService = createMockUserServiceWithUser(mockUserDetails);
// All methods return the provided user data
```

### Mock with Error

```typescript
import { createMockUserServiceWithError } from "./services/__mocks__/user-service";

const error = new Error("API Error");
const mockUserService = createMockUserServiceWithError(error);
// All methods throw the provided error
```

### Custom Mock Implementations

```typescript
const mockUserService = createMockUserService();

// Override specific methods
mockUserService.getUser.mockResolvedValue(customUserData);
mockUserService.createUser.mockRejectedValue(new Error("Creation failed"));

// Different responses for different calls
mockUserService.getUser
  .mockResolvedValueOnce(user1)
  .mockResolvedValueOnce(user2)
  .mockResolvedValueOnce(null);
```

### Mocking in Component Tests

```typescript
import { vi } from "vitest";
import { createMockUserServiceWithUser, mockUserDetails } from "./services/__mocks__/user-service";

// Mock the UserService module
vi.doMock("./services/user-service", () => ({
  UserService: vi.fn().mockImplementation(() => createMockUserServiceWithUser(mockUserDetails)),
}));

// Now when components import UserService, they'll get the mock
```

## Available Mock Data

The mock file provides common user data for testing:

- `mockUserDetails` - Standard user with role "user"
- `mockAdminUserDetails` - Admin user with role "admin" and superAdmin: true

## Best Practices

1. **Use the mock factory functions** instead of creating mocks manually
2. **Reset mocks between tests** using `vi.clearAllMocks()` in `beforeEach`
3. **Test error scenarios** to ensure robust error handling
4. **Verify API calls** to ensure the service is calling the correct endpoints
5. **Test environment variable handling** to ensure configuration works correctly

## Environment Variables

The UserService uses the `ELYSIA_API_URL` environment variable. Tests verify:
- Default fallback to `http://localhost:8000`
- Proper use of custom API URLs when set
- Environment variable handling in different scenarios 