"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useTransition } from "react";
import { revalidate } from "../actions/marketplaceactions";

const RefreshButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(async () => {
      revalidate();
    });
  };

  return (
    <button
      className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
      onClick={() => handleRefresh}
      disabled={isPending}
    >
      {isPending ? "Yenileniyor..." : "Yenile"}
    </button>
  );
};

export default RefreshButton;
