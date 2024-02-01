import notify from "@/myfunctions/notify";
import { useRef, useState } from "react";

export type InputField = {
  ref: React.RefObject<HTMLInputElement>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  verify: () => boolean;
  setValue: (value: string | undefined) => void;
  getValue: () => string | undefined;
};

export const useInputField = (
  verifier: (name: string | undefined) => [boolean, string][]
): InputField => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const verify = () => {
    const tests = verifier(inputRef.current?.value);
    for (const [cond, message] of tests) {
      if (cond) {
        notify(message);
        setError(true);
        return false;
      }
    }
    setError(false);
    return true;
  };

  const getValue = () => inputRef.current?.value;
  const setValue = (value: string | undefined) => {
    if (inputRef.current == null || !value) return;
    inputRef.current.value = value;
  };

  return { ref: inputRef, error, setError, verify, getValue, setValue };
};

export const useCheckboxField = (unCheckedMessage: string) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const verify = () => {
    if (!inputRef.current?.checked) {
      notify(unCheckedMessage);
      setError(true);
      return false;
    }
    setError(false);
    return true;
  };

  return { ref: inputRef, error, setError, verify };
};
