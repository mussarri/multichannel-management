/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const index = ({
  label,
  name,
  value,
  required,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  value: any;
  required: boolean;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <div className="flex items-center w-full">
      <input
        id={name}
        type="checkbox"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        checked={checked}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm checked:bg-black"
      />
      <label
        htmlFor={name}
        className="ms-2 text-xs font-medium text-secondary-foreground capitalize"
      >
        {label}
      </label>
    </div>
  );
};

export default index;
