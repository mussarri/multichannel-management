/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updateProductStatus } from "@/app/action";
import { toast } from "react-toastify";
import {
  startTransition,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import React from "react";

const Page = ({ id, isActive }: { id; isActive: any }) => {
  const [pending, startTransition] = useTransition();
  const [optimisticActive, toggleOptimistic] = useOptimistic(isActive);

  const handleToggle = () => {
    toggleOptimistic(!optimisticActive); // önce UI'da değiştir
    startTransition(async () => {
      try {
        const result = await updateProductStatus(id, optimisticActive);

        toast.success(`Ürün ${result.data ? "aktif" : "pasif"} yapıldı`);
      } catch (error) {
        toast.error("Güncelleme başarısız");
        toggleOptimistic(optimisticActive); // geri al
      }
    });
  };

  return (
    <div className="box rounded-lg flex flex-col gap-1 items-start">
      <h2 className="text-sm flex items-center justify-between p-4 pb-3 font-bold text-foreground border-b w-full">
        Ürün Satış Durumu
      </h2>
      <div className="p-3 w-full">
        <button
          type="button"
          disabled={pending}
          className={
            " p-2 text-sm text-center  rounded cursor-pointer w-full max-w-[400px] transition-all duration-200 " +
            (optimisticActive
              ? "bg-green-500 text-white"
              : " bg-secondary text-secondary-foreground")
          }
          onClick={(e) => {
            handleToggle();
          }}
        >
          {optimisticActive ? "Aktif" : "Pasif"}
        </button>
      </div>
    </div>
  );
};

export default Page;
