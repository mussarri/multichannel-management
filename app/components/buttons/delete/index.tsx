import React from "react";

const index = ({ text }: { text: boolean }) => {
  return (
    <div className="flex gap-1 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
      <svg
        className="w-5 stroke-red-700"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
      {text && <div className="font-semibold text-sm text-red-700">Delete</div>}
    </div>
  );
};

export default index;
