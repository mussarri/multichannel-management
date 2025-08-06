/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const SortButton = ({
  sortOptions,
  setSortOptions,
  sortBy,
  text,
}: {
  sortOptions: any;
  setSortOptions: any;
  sortBy: string;
  text: string;
}) => {
 
  return (
    <button
      onClick={() =>
        setSortOptions({
          sortBy: sortBy,
          order:
            sortOptions.order === "asc"
              ? "desc"
              : sortOptions.order === "desc"
              ? null
              : "asc",
        })
      }
    >
      {" "}
      {text}
      {sortOptions.sortBy === sortBy &&
        (sortOptions.order === null
          ? ""
          : sortOptions.order === "asc"
          ? "▲"
          : "▼")}
    </button>
  );
};

export default SortButton;
