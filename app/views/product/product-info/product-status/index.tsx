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
import { Combine } from "lucide-react";
import Link from "next/link";

const Page = ({
  product,
  marketplaces,
  isActive,
}: {
  product: any;
  marketplaces: any;
  isActive: any;
}) => {
  const [pending, startTransition] = useTransition();
  const [optimisticActive, toggleOptimistic] = useOptimistic(isActive);

  const handleToggle = () => {
    toggleOptimistic(!optimisticActive); // önce UI'da değiştir
    startTransition(async () => {
      try {
        const result = await updateProductStatus(product.id, optimisticActive);

        toast.success(`Ürün ${result.data ? "aktif" : "pasif"} yapıldı`);
      } catch (error) {
        toast.error("Güncelleme başarısız");
        toggleOptimistic(optimisticActive); // geri al
      }
    });
  };
  console.log(product);

  return (
    <div className="box rounded-lg flex flex-col gap-1 items-start">
      <div className="flex justify-between  border-b w-full p-4 pb-3 ">
        <h2 className="text-sm flex items-center justify-between font-bold text-foreground w-full">
          Ürün Satış Durumu
        </h2>
        <div className="w-full">
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
      {marketplaces.length === 0 && (
        <div className="p-4 py-6">
          <Link
            href={"/dashboard/integrations/channels"}
            className="text-sm flex items-center gap-2"
          >
            {" "}
            <Combine size={17} />
            <span className=" font-[600] text-[13px]">
              Ürünü satışa çıkarmak için önce pazaryerlerini ekleyin.
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
