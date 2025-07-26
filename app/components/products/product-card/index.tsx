/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

const ProductCard = ({ data }: { data: any }) => {
  const mobile = useMediaQuery("(max-width: 500px)");

  return (
    <>
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
              "min-w-[150px] " + (mobile ? " w-full p-2 border-b" : " ")
            }
          >
            <div className="bg-slate-500 rounded w-[50px] h-[50px]"></div>
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
                {data.title || "Apple Macbook Pro M4 Pro 24GB RAM 512GB SSD"}
              </span>
            </div>
            <div className="w-max">
              <p className="text-foreground font-semibold text-[13px]">
                Urun Kodu
              </p>
              <span className="text-xs text-secondary-foreground">
                {data.stock_code || "PHN-123"}
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
      <div className="p-3 mt-5 bg-card box overflow-scroll max-h-[500px]">
        <h2 className="text-md pb-3 font-bold text-foreground">Varyantlar</h2>
        {data.variants && data.variants.length > 1 && (
          <table className="product-variants min-w-max">
            <thead>
              <tr className="text-sm w-full">
                <td className="text-left">Title</td>
                <td className="text-left">SKU</td>
                <td className="text-left">Varyant Bilgisi</td>
                <td className="text-left">Varyant Kodu</td>
                <td className="text-left">Acıklama</td>
                <td className="text-right">Price</td>
                <td className="text-right">Desi</td>
                <td className="text-right">Stok</td>
                <td className="text-center">Resimler</td>
                <td className="text-center">İşlemler</td>
              </tr>
            </thead>
            <tbody>
              {data.variants.map((item, index) => (
                <tr key={index} className="text-sm w-full font-extralight">
                  <th className="text-left py-2 font-light">{item.title}</th>

                  <th className="text-left py-2 font-light">{item.sku}</th>
                  <th className="text-left font-light">
                    {item.attributes
                      .map((attribute, index) => attribute.value)
                      .join(" - ")}
                  </th>
                  <th className="text-left font-light">{item.variant_code}</th>
                  <th className="text-left font-light">{item.description}</th>
                  <th className="text-right font-light">{item.price}</th>
                  <th className="text-right font-light">{item.desi}</th>
                  <th className="text-right font-light">{item.stock}</th>
                  <th className="p-2 flex gap-2">
                    {item.images.map((image, index) => (
                      <Image
                        src={image.url}
                        width={80}
                        height={80}
                        key={index}
                        alt=""
                      />
                    ))}
                    {item.images.map((image, index) => (
                      <Image
                        src={image.url}
                        width={80}
                        height={80}
                        key={index}
                        alt=""
                      />
                    ))}
                    {item.images.map((image, index) => (
                      <Image
                        src={image.url}
                        width={80}
                        height={80}
                        key={index}
                        alt=""
                      />
                    ))}
                    {item.images.map((image, index) => (
                      <Image
                        src={image.url}
                        width={80}
                        height={80}
                        key={index}
                        alt=""
                      />
                    ))}
                  </th>
                  <th className="">
                    <div className="flex gap-2">
                      {" "}
                      <Link href={`/dashboard/products/${item.id}`}>
                        <Pencil
                          size={16}
                          className="hover:scale-110 duration-200 hover:cursor-pointer"
                          color="var(--warning)"
                        />
                      </Link>
                      <button>
                        <Trash2
                          size={16}
                          className="hover:scale-110 duration-200 hover:cursor-pointer"
                          color="var(--error)"
                        />
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ProductCard;
