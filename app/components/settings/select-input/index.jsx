import React from "react";

const index = ({
  options,
  name,
  label,
  required = false,
  onChange,
  vertical = false,
  value = "",
  minWidth = true,
  error = "",
}) => {
  return (
    <div
      className={
        "flex gap-1 w-full " +
        (vertical ? " flex-col items-start" : " items-center")
      }
    >
      <label
        className={
          "text-sm font-semibold " + (minWidth ? "min-w-[200px] " : "min-w-max")
        }
        htmlFor=""
      >
        {label}
      </label>
      {!vertical && ":"}
      <select
        name={name}
        onChange={(e) => onChange(e.target.value)}
        className={
          "py-2 px-4 pe-9 block w-full border rounded-lg h-9 text-xs " +
          (error && "border-red-500")
        }
        required={required}
      >
        <option value="" hidden disabled selected>
          Select
        </option>
        {options.length > 0 &&
          options?.map((option, index) =>
            typeof option === "string" ? (
              <option value={option} key={index}>
                {option}
              </option>
            ) : (
              <option value={option.id} key={index}>
                {option.name}
              </option>
            )
          )}
      </select>
      {error && (
        <p className="text-[11px] text-red-500 absolute mt-[60px]">{error}</p>
      )}
    </div>
  );
};

export default index;
