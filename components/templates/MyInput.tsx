import { InputField } from "@/hooks/useInputField";
import { interFont } from "@/styles/fonts";
import { ChangeEventHandler, RefObject } from "react";
import { twMerge } from "tailwind-merge";

interface MyInputProps {
  type?: "text" | "number" | "email" | "password"; // Add more types as needed
  placeholder?: string;
  inputField: InputField;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  dark?: boolean;
  className?: string;
  divClassName?: string;
  defaultValue?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
}

const MyInput: React.FC<MyInputProps> = ({
  type = "text",
  placeholder,
  inputField,
  onChange,
  className,
  divClassName,
  defaultValue,
  onFocus,
  onBlur,
  maxLength,
}) => {
  return (
    <div className={twMerge("flex justify-center", divClassName)}>
      <input
        ref={inputField.ref}
        step="any"
        maxLength={maxLength}
        className={twMerge(
          "w-full max-w-sm border rounded-lg bg-light_primary p-4",
          interFont,
          inputField.error ? "border-red" : "border-zinc-600",
          className
        )}
        type={type}
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
          inputField.setError(false);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        defaultValue={defaultValue}
      ></input>
    </div>
  );
};

export default MyInput;
