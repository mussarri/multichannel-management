import React from "react";

const index = ({
  options,
  name,
  label,
  required = false,
  onChange,
  vertical = false,
  value,
}) => {
  return (
    <div
      className={
        "flex gap-1 w-full " +
        (vertical ? " flex-col items-start" : " items-center")
      }
    >
      <label className="min-w-[200px] text-sm font-semibold " htmlFor="">
        {label}
      </label>
      {!vertical && ":"}
      <select
        name={name}
        onChange={(e) => onChange(e.target.value)}
        className="py-2 px-4 pe-9 block w-full border rounded-lg h-9 text-xs"
        required={required}
      >
        <option value="" selected disabled hidden>
          Select
        </option>
        {options.length > 0 &&
          options?.map((option, index) => (
            <option value={option} key={index} selected={value === option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default index;
