"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const array = pathname.split("/").slice(1);
  const list = [
    { name: "variantSync", formatted: "Seçenek Eşitleme" },
    {
      name: "variantSyncSpec",
      formatted: "Seçenek Değeri Eşitleme",
    },
    {
      name: "channels",
      formatted: "Pazaryeri",
    },
  ];
  return (
    <ol className="flex items-center whitespace-nowrap mb-4">
      {array.map((item, idx) =>
        !list.map((listItem) => listItem.name).includes(item) ? (
          <li key={idx} className="inline-flex items-center">
            <Link
              className={
                "flex items-center text-xs text-foreground " +
                (array.length - 1 == idx ? " text-background" : "")
              }
              href={
                "/" +
                array.slice(0, idx + 1).join("/") +
                (item === "dashboard" ? "/overview/" : "")
              }
            >
              {item[0].toUpperCase() + item.slice(1)}
            </Link>
            {array.length - 1 > idx && (
              <svg
                className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            )}
          </li>
        ) : (
          <div
            className={
              "flex items-center text-xs text-foreground " +
              (array.length - 1 == idx ? " text-background" : "")
            }
            key={idx}
          >
            {list.find((listItem) => listItem.name === item)?.formatted}
            {array.length - 1 > idx && (
              <svg
                className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            )}
          </div>
        )
      )}
    </ol>
  );
}
