/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

const ProductCard = ({ data }: { data: any }) => {
  const mobile = useMediaQuery("(max-width: 500px)");

  return (
    <div className="mt-4">
      <div
        className={
          "flex frelative overflow-x-auto" +
          (mobile
            ? " bg-card rounded border flex-col items-start"
            : " box items-center gap-5  p-3")
        }
      >
        <div
          className={
            "flex flex-1   h-full items-start  " +
            (mobile ? " border-b flex-col w-full" : " ")
          }
        >
          <div
            className={
              "min-w-[70px] " + (mobile ? " w-full p-2 border-b" : " ")
            }
          >
            <div className="overflow-hidden flex items-center justify-center rounded w-[50px] h-[50px]">
              <Image
                width={100}
                height={100}
                src={
                  data?.images && data?.images?.length > 0
                    ? process.env.NEXT_PUBLIC_IMAGE_URL + data.images[0]?.url
                    : "/package.jpg"
                }
                alt=""
                objectFit="contain"
              />
            </div>
          </div>
          <div
            className={
              "flex items-start text-sm " +
              (mobile ? " p-2 border-b flex-col gap-2" : "gap-5")
            }
          >
            <div className="w-max">
              <p className="text-foreground font-semibold text-[13px]">
                Urun Adi
              </p>
              <span className="text-xs text-secondary-foreground">
                {data.name || "Apple Macbook Pro M4 Pro 24GB RAM 512GB SSD"}
              </span>
            </div>
            <div className="w-max">
              <p className="text-foreground font-semibold text-[13px]">
                Basligi
              </p>
              <span className="text-xs text-secondary-foreground">
                {data.title || "-"}
              </span>
            </div>
            <div className="w-max">
              <p className="text-foreground font-semibold text-[13px]">
                Kategorisi
              </p>
              <span className="text-xs text-secondary-foreground">
                {data.category.name || "-"}
              </span>
            </div>
            <div className="w-max">
              <p className="text-foreground font-semibold text-[13px]">SKU</p>
              <span className="text-xs text-secondary-foreground">
                {data.sku || "PHN-123"}
              </span>
            </div>
          </div>
        </div>
        <div className={"flex gap-2 " + (mobile ? " p-2 border-b " : "")}>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
            <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
              Aktif
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
            <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
              Aktif
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
            <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
              Aktif
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
            <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
              Aktif
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
            <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
              Aktif
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
