import Link from "next/link";
import React from "react";

const index = ({ href, text }: { href: string; text: boolean }) => {
  return (
    <Link
      href={href}
      className="flex w-max gap-1 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer"
      style={{ display: "flex", alignItems: "center" }}
    >
      <svg
        className="w-5 stroke-green-700"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
      {text && <div className="font-semibold text-sm text-green-700">Edit</div>}
    </Link>
  );
};

export default index;
