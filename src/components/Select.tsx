import * as React from "react";
import { MenuItem, Select as MuiSelect, SelectChangeEvent } from "@mui/material";
import clsx from "clsx";


const baseSelectStyles = `
  w-full
  bg-white
  text-gray-900
  border
  border-gray-300
  rounded-lg
  shadow-sm
  outline-none
  transition-all
  duration-200
  ease-in-out
  hover:border-gray-400
  focus:ring-2
  focus:ring-blue-500
  focus:ring-opacity-50
  focus-visible:border-blue-500
  focus-visible:ring-2
  focus-visible:ring-blue-500
  disabled:bg-gray-100
  disabled:border-gray-200
  disabled:cursor-not-allowed
  placeholder:text-gray-400
  text-sm
  px-2
  py-1
  dark:bg-gray-200
  dark:text-white
  dark:border-gray-600
  dark:focus:ring-blue-500
  dark:focus:border-blue-500
  dark:hover:border-gray-500
  dark:disabled:bg-gray-700
`;

interface SelectProps {
  options: string[];
  selectedValues: string;
  className?: string;
  onChange?: (selectedValues: string) => void;
  disabled?: boolean;
  errorText?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  selectedValues,
  className,
  onChange,
  disabled,
  errorText,
}) => {
  
  const handleChange = (event: SelectChangeEvent<string>): void => {
    onChange?.(event.target.value as string);
  };

 
  const renderMenuItems = () => {
    return options?.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ));
  };

  return (
    <div className="relative w-full">
      <MuiSelect
        value={selectedValues}
        onChange={handleChange}
        className={clsx(baseSelectStyles, className)}
        displayEmpty
        disabled={disabled}
        sx={selectStyles}
      >
        <MenuItem value="">
          <span className="!text-md !text-gray-600">Select</span>
        </MenuItem>
        {renderMenuItems()}
      </MuiSelect>
      {errorText && <p className="mt-1 text-sm text-red-500">{errorText}</p>}
    </div>
  );
};


const selectStyles = {
  "& .MuiSelect-select": {
    padding: "14px 12px !important",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#cbd5e0 !important",
    borderWidth: "1px !important",
  },
  "&.Mui-focused": {
    borderColor: "#3182ce !important",
    borderWidth: "0px !important",
    boxShadow: "0 0 0 4px rgba(49, 130, 206, 0.2)",
  },
  "&.Mui-disabled": {
    backgroundColor: "#f7fafc",
    borderColor: "#e2e8f0",
  },
};

export default Select;