"use client";
export default function Toggle({
  label,
  name,
  onChange,
  value,
}: {
  label: string;
  name: string;
  onChange: () => void;
  value: boolean;
}) {
  return (
    <label className="flex gap-2 items-center cursor-pointer min-h-[33px]">
      <span className="text-xs font-semibold text-gray-900 dark:text-gray-300 min-w-[200px]">
        {label}
      </span>
      :
      <div
        className={
          "relative w-11 h-6 rounded-full border shadow" +
          (value ? " bg-blue-200" : " bg-white ")
        }
      >
        <div
          className={
            "w-5 h-5 m-[1px] rounded-full  " +
            (value ? " translate-x-5 bg-blue-400" : " bg-blue-100 ")
          }
        ></div>
      </div>
      <input
        type="checkbox"
        value=""
        name={name}
        className="sr-only peer"
        onClick={() => {
          onChange();
        }}
      />
    </label>
  );
}
