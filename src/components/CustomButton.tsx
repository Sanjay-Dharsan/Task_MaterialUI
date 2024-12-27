import * as React from "react";
import { Button as BaseButton, ButtonOwnerState, ButtonProps } from "@mui/base/Button";
import { CircularProgress } from "@mui/material";

const buttonVariants = {
  primary: `
    bg-teal-600
    text-white
    hover:bg-teal-500
    active:bg-teal-700
  `,
  
  secondary: `
    bg-yellow-200
    text-yellow-900
    hover:bg-yellow-300
    active:bg-yellow-400
    disabled:bg-yellow-100
  `,
  
  outline: `
    bg-transparent
    border
    border-gray-400
    text-gray-800
    hover:bg-gray-100
    active:bg-gray-200
    disabled:bg-transparent
  `,
};

const baseButtonStyles = `
  px-4
  py-2
  rounded-lg
  font-medium
  transition-all
  duration-200
  ease-in-out
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-blue-500
  focus-visible:ring-opacity-50
  disabled:cursor-not-allowed
`;

interface ExtendedButtonProps extends ButtonProps {
  variant?: keyof typeof buttonVariants;
  isLoading?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ExtendedButtonProps>((props, ref) => {
  const { variant = "primary", className, isLoading, children, ...otherProps } = props;

  // Combine styles dynamically
  const buttonClassName = `${baseButtonStyles} ${buttonVariants[variant]} ${className || ""}`;

  return (
    <BaseButton
      {...otherProps}
      ref={ref}
      slotProps={{
        root: (state: ButtonOwnerState) => ({
          className: `${buttonClassName} ${state.disabled ? "opacity-50" : ""}`,
        }),
      }}
    >
      {isLoading ? <CircularProgress size={20} /> : children}
    </BaseButton>
  );
});

export default CustomButton;