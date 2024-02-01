import Select, { StylesConfig } from "react-select";

interface MyDropDownPickerProps {
  value: string | undefined;
  setValue: (value: string | undefined) => void;
  options: { value: string; label: string }[];
  error?: boolean;
  onChange: () => void;
  placeholder?: string;
}

const MyDropDownPicker: React.FC<MyDropDownPickerProps> = ({
  value,
  setValue,
  options,
  error,
  onChange,
  placeholder,
}) => {
  return (
    <Select
      value={options.find((option) => option.value === value)}
      options={options}
      isSearchable={false}
      onChange={(newValue) => {
        onChange();
        setValue(newValue?.value);
      }}
      placeholder={placeholder}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: error ? "red" : "black",
          backgroundColor: "transparent",
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          color: "black",
          fontFamily: "cursive",
          fontSize: "1.5rem",
        }),

        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          color: "black",
          fontFamily: "cursive",
          fontSize: "1.5rem",
        }),
      }}
    />
  );
};

export default MyDropDownPicker;
