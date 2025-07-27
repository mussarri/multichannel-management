import React from "react";

const index = ({
  label = "Label",
  placeholder = "Placeholder",
  name,
  value,
  onChange,
  required,
  type = "text",
  error = false,
  vertical = false,
  readOnly = false,
}: {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: string) => void;
  required: boolean;
  type: string;
  error: boolean;
  vertical: boolean;
  readOnly?: boolean;
}) => {
  const InputElement = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            className="py-2 px-3 sm:py-3 sm:px-4 block w-full text-sm"
            placeholder="This is a textarea placeholder"
            style={{ outline: "none" }}
          ></textarea>
        );
      default:
        return (
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.target as HTMLInputElement;
              onChange(target.value);
            }}
            required={required}
            className={
              "border p-2 rounded-lg w-full outline-none text-sm " +
              (error ? "border-red-500" : "")
            }
            readOnly={readOnly}
          />
        );
    }
  };

  return (
    <div
      className={
        "flex gap-1 " + (vertical ? " flex-col items-start" : "items-center ")
      }
    >
      <label
        htmlFor=""
        className="min-w-[200px] text-sm uppercase font-semibold"
      >
        {label}
      </label>
      {vertical || ":"}
      {InputElement()}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default index;
