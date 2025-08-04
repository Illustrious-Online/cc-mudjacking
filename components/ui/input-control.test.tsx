import InputControl from "@/components/ui/input-control";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("InputControl Component", () => {
  const renderInputControl = (
    props: React.ComponentProps<typeof InputControl>,
  ) => {
    return render(
      <ChakraProvider value={defaultSystem}>
        <InputControl {...props} />
      </ChakraProvider>,
    );
  };

  it("renders the input field with the correct label", () => {
    renderInputControl({
      id: "test-input",
      name: "test",
      label: "Test Label",
      type: "text",
      required: true,
    });
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("shows required indicator when required is true", () => {
    renderInputControl({
      id: "test-input",
      name: "test",
      label: "Test Label",
      type: "text",
      required: true,
    });
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not show required indicator when required is false", () => {
    renderInputControl({
      id: "test-input",
      name: "test",
      label: "Test Label",
      type: "text",
      required: false,
    });
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("calls handleChange when text input changes", () => {
    const handleChange = vi.fn();
    renderInputControl({
      id: "test-input",
      name: "test",
      label: "Test Label",
      type: "text",
      required: true,
      handleChange,
    });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls handleBlur when text input loses focus", () => {
    const handleBlur = vi.fn();
    renderInputControl({
      id: "test-input",
      name: "test",
      label: "Test Label",
      type: "text",
      required: true,
      handleBlur,
    });

    const input = screen.getByRole("textbox");
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it("renders phone input when type is 'phone' and calls setFieldValue on change", () => {
    const setFieldValue = vi.fn();
    renderInputControl({
      id: "phone-input",
      name: "phone",
      label: "Phone Label",
      type: "phone",
      required: true,
      setFieldValue,
    });

    const phoneInput = screen.getByRole("textbox");
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    expect(setFieldValue).toHaveBeenCalledWith("phone", "1234567890");
  });

  it("calls setFieldTouched when phone input loses focus", () => {
    const setFieldTouched = vi.fn();
    renderInputControl({
      id: "phone-input",
      name: "phone",
      label: "Phone Label",
      type: "phone",
      required: true,
      setFieldTouched,
    });

    const phoneInput = screen.getByRole("textbox");
    fireEvent.blur(phoneInput);
    expect(setFieldTouched).toHaveBeenCalledWith("phone", true);
  });

  it("handles phone input without setFieldValue gracefully", () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    renderInputControl({
      id: "phone-input",
      name: "phone",
      label: "Phone Label",
      type: "phone",
      required: true,
    });

    const phoneInput = screen.getByRole("textbox");
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    expect(consoleSpy).toHaveBeenCalledWith("No setFieldValue provided");
    consoleSpy.mockRestore();
  });

  it("handles phone input without setFieldTouched gracefully", () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    renderInputControl({
      id: "phone-input",
      name: "phone",
      label: "Phone Label",
      type: "phone",
      required: true,
    });

    const phoneInput = screen.getByRole("textbox");
    fireEvent.blur(phoneInput);
    expect(consoleSpy).toHaveBeenCalledWith("No setFieldValue provided");
    consoleSpy.mockRestore();
  });

  it("renders textarea when type is 'textarea'", () => {
    renderInputControl({
      id: "textarea-input",
      name: "textarea",
      label: "Textarea Label",
      type: "textarea",
      required: true,
      placeholder: "Enter text here",
    });

    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("placeholder", "Enter text here");
  });

  it("calls handleChange and handleBlur for textarea", () => {
    const handleChange = vi.fn();
    const handleBlur = vi.fn();
    renderInputControl({
      id: "textarea-input",
      name: "textarea",
      label: "Textarea Label",
      type: "textarea",
      required: true,
      handleChange,
      handleBlur,
    });

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Test text" } });
    fireEvent.blur(textarea);

    expect(handleChange).toHaveBeenCalled();
    expect(handleBlur).toHaveBeenCalled();
  });

  it("renders select dropdown when type is 'select'", () => {
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];
    renderInputControl({
      id: "select-input",
      name: "select",
      label: "Select Label",
      type: "select",
      required: true,
      options,
      placeholder: "Choose an option",
    });

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(screen.getByText("Choose an option")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("calls handleChange and handleBlur for select", () => {
    const handleChange = vi.fn();
    const handleBlur = vi.fn();
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];
    renderInputControl({
      id: "select-input",
      name: "select",
      type: "select",
      required: true,
      options,
      handleChange,
      handleBlur,
    });

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "option1" } });
    fireEvent.blur(select);

    expect(handleChange).toHaveBeenCalled();
    expect(handleBlur).toHaveBeenCalled();
  });

  it("handles select focus and blur events", () => {
    const handleBlur = vi.fn();
    const options = [
      { value: "option1", label: "Option 1" },
    ];
    renderInputControl({
      id: "select-input",
      name: "select",
      type: "select",
      required: true,
      options,
      handleBlur,
    });

    const select = screen.getByRole("combobox");
    fireEvent.focus(select);
    fireEvent.blur(select);

    expect(handleBlur).toHaveBeenCalled();
  });

  it("renders default input when type is not special", () => {
    renderInputControl({
      id: "email-input",
      name: "email",
      label: "Email Label",
      type: "email",
      required: true,
      placeholder: "Enter email",
    });

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "Enter email");
  });

  it("displays an error message when there is an error", () => {
    renderInputControl({
      id: "test-input",
      name: "test",
      label: "Test Label",
      type: "text",
      required: true,
      touched: true,
      errors: "This field is required",
    });

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("does not display error message when not touched", () => {
    renderInputControl({
      id: "test-input",
      name: "test",
      label: "Test Label",
      type: "text",
      required: true,
      touched: false,
      errors: "This field is required",
    });

    expect(screen.queryByText("This field is required")).not.toBeInTheDocument();
  });

  it("applies error styling when touched and has errors", () => {
    renderInputControl({
      id: "test-input",
      name: "test",
      label: "Test Label",
      type: "text",
      required: true,
      touched: true,
      errors: "This field is required",
    });

    const input = screen.getByRole("textbox");
    expect(input).toHaveStyle("border-color: var(--chakra-colors-red-500)");
  });

  it("uses custom rows for textarea", () => {
    renderInputControl({
      id: "textarea-input",
      name: "textarea",
      label: "Textarea Label",
      type: "textarea",
      required: true,
      rows: 10,
    });

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "10");
  });

  it("uses default rows (5) for textarea when not specified", () => {
    renderInputControl({
      id: "textarea-input",
      name: "textarea",
      label: "Textarea Label",
      type: "textarea",
      required: true,
    });

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("passes value prop to input", () => {
    renderInputControl({
      id: "test-input",
      name: "test",
      label: "Test Label",
      type: "text",
      required: true,
      value: "Initial value",
    });

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Initial value");
  });

  it("passes value prop to textarea", () => {
    renderInputControl({
      id: "textarea-input",
      name: "textarea",
      label: "Textarea Label",
      type: "textarea",
      required: true,
      value: "Initial textarea value",
    });

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("Initial textarea value");
  });

  it("passes value prop to select", () => {
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];
    renderInputControl({
      id: "select-input",
      name: "select",
      type: "select",
      required: true,
      options,
      value: "option1",
    });

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("option1");
  });

  it("passes value prop to phone input", () => {
    renderInputControl({
      id: "phone-input",
      name: "phone",
      label: "Phone Label",
      type: "phone",
      required: true,
      value: "1234567890",
    });

    const phoneInput = screen.getByRole("textbox");
    expect(phoneInput).toHaveValue("+1 (234) 567-890");
  });
});
