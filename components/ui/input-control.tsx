"use client"

import { Field, Input, Textarea } from "@chakra-ui/react";
import type { JSX } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useColorModeValue } from "./color-mode";

interface InputControlProps {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  value?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFieldValue?: (field: string, value: string) => void;
  setFieldTouched?: (field: string, isTouched: boolean) => void;
  touched?: boolean;
  errors?: string;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
}

export default function InputControl({
  id,
  name,
  label,
  type,
  required,
  placeholder,
  value,
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldTouched,
  touched,
  errors,
  options,
  rows = 5,
}: InputControlProps): JSX.Element {
  const borderColor = useColorModeValue('outline', 'white');
  const errorBorderColor = 'red.500';

  return (
    <Field.Root required invalid={touched && !!errors}>
      <Field.Label htmlFor={id} fontSize="sm" fontWeight="bold">
        {label}
        {required && <Field.RequiredIndicator />}
      </Field.Label>
      {type === "phone" ? (
        <PhoneInput
          disableDropdown
          country={"us"}
          value={value}
          onChange={(value) =>
            setFieldValue
              ? setFieldValue("phone", value)
              : console.log("No setFieldValue provided")
          }
          onBlur={() =>
            setFieldTouched
              ? setFieldTouched("phone", true)
              : console.log("No setFieldValue provided")
          }
          inputProps={{
            id: id,
            name: name,
          }}
          inputStyle={{
            width: "100%",
            background: "inherit",
            margin: "unset",
            padding: "20px 12px",
            borderRadius: "8px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: touched && !!errors ? 'var(--chakra-colors-red-500)' : 'var(--chakra-colors-outline)',
            fontSize: "16px",
            backgroundColor: "inherit",
          }}
          buttonStyle={{ display: "none" }}
        />
      ) : type === "textarea" ? (
        <Textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          borderColor={touched && !!errors ? errorBorderColor : borderColor}
          focusRingColor={touched && !!errors ? errorBorderColor : borderColor}
          _focus={{
            borderColor: touched && !!errors ? errorBorderColor : borderColor,
            boxShadow: `0 0 0 1px ${touched && !!errors ? 'var(--chakra-colors-red-500)' : 'var(--chakra-colors-outline)'}`,
          }}
          _dark={{
            _focus: {
              boxShadow: `0 0 0 1px ${touched && !!errors ? 'var(--chakra-colors-red-500)' : 'var(--chakra-colors-white)'}`,
            }
          }}
          rows={rows}
        />
      ) : type === "select" ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: touched && !!errors ?  'var(--chakra-colors-red-500)' : 'var(--chakra-colors-outline)',
            fontSize: '16px',
            backgroundColor: 'inherit',
            color: 'inherit',
            outline: 'none',
            transition: 'all 0.2s ease-in-out',
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = `0 0 0 1px ${touched && !!errors ? 'var(--chakra-colors-red-500)' : borderColor === 'white' ? 'var(--chakra-colors-white)' : 'var(--chakra-colors-outline)'}`;
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = 'none';
            handleBlur?.(e);
          }}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          borderColor={touched && !!errors ? errorBorderColor : borderColor}
          focusRingColor={touched && !!errors ? errorBorderColor : borderColor}
          _focus={{
            borderColor: touched && !!errors ? errorBorderColor : borderColor,
            boxShadow: `0 0 0 1px ${touched && !!errors ? 'var(--chakra-colors-red-500)' : 'var(--chakra-colors-outline)'}`,
          }}
          _dark={{
            _focus: {
              boxShadow: `0 0 0 1px ${touched && !!errors ? 'var(--chakra-colors-red-500)' : 'var(--chakra-colors-white)'}`,
            }
          }}
        />
      )}
      <Field.ErrorText>{errors}</Field.ErrorText>
    </Field.Root>
  );
}
