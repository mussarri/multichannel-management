import React from "react";

const index = ({
  options,
  name,
  label,
  required = false,
  onChange,
  vertical = false,
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
        className="py-3 px-4 pe-9 block w-full border rounded-lg h-9 text-xs"
        defaultValue={label}
      >
        {options.length > 0 &&
          options?.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default index;
