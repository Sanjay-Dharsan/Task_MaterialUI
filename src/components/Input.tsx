import * as React from "react";
import {
  InputBase,
  InputBaseProps,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const baseInputStyles = `
  w-full
  px-2
  py-1
  text-gray-800
  bg-white
  border
  border-gray-100
  rounded-lg
  shadow-sm
  outline-none
  focus:ring-2
  focus:ring-blue-600
  focus:ring-opacity-50
  transition-all
  duration-300
  ease-in-out
  hover:border-gray-500
  focus-visible:border-blue-600
  focus-visible:ring-blue-600
  focus-visible:ring-opacity-50
  disabled:bg-gray-200
  disabled:cursor-not-allowed
  placeholder:text-gray-100
  text-sm
  focus:outline-none
  dark:bg-gray-200
  dark:border-gray-600
  dark:text-white
  dark:focus:ring-blue-100
  dark:focus:border-blue-100
  dark:hover:border-gray-100
  dark:disabled:bg-gray-100
`;

interface CustomInputProps extends InputBaseProps {
  errorText?: string;
}

export const Input = React.forwardRef(function Input(
  props: CustomInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { className, type, errorText, ...otherProps } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <InputBase
        {...otherProps}
        inputRef={ref}
        type={type === "password" && showPassword ? "text" : type}
        className={`${baseInputStyles} ${errorText ? "border-red-500" : ""} ${className || ""}`}
        sx={{
          "&:hover": {
            borderColor: "#cbd5e0 !important",
          },
          "&.Mui-focused": {
            borderColor: "#3182ce !important",
            boxShadow: "0 0 0 4px rgba(49, 130, 206, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: "#f7fafc",
            borderColor: "#e2e8f0",
          },
        }}
        endAdornment={
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null
        }
      />
      {errorText && <p className="mt-1 text-sm text-red-500">{errorText}</p>}
    </div>
  );
});

export default Input;