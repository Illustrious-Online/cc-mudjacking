import { describe, expect, it, vi } from "vitest";
import { toaster } from "./toaster";

describe("Toaster API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a loading toast", () => {
    const result = toaster.create({
      type: "loading",
      title: "Loading...",
    });

    expect(result).toBeDefined();
  });

  it("creates a toast with title and description", () => {
    const result = toaster.create({
      type: "info",
      title: "Info Title",
      description: "This is a description.",
    });

    expect(result).toBeDefined();
  });

  it("creates a toast with action", () => {
    const result = toaster.create({
      type: "info",
      title: "Action Toast",
      action: {
        label: "Action",
        onClick: () => {
          // Action click handler
        },
      },
    });

    expect(result).toBeDefined();
  });

  it("creates a closable toast", () => {
    const result = toaster.create({
      type: "info",
      title: "Closable Toast",
      meta: {
        closable: true,
      },
    });

    expect(result).toBeDefined();
  });

  it("creates a success toast", () => {
    const result = toaster.success({
      title: "Success",
      description: "Operation completed successfully",
    });

    expect(result).toBeDefined();
  });

  it("creates an error toast", () => {
    const result = toaster.error({
      title: "Error",
      description: "Something went wrong",
    });

    expect(result).toBeDefined();
  });
});
