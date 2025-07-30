/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { Suspense } from "react";
import Link from "next/link";
import { Pencil, PlusCircleIcon, Trash2 } from "lucide-react";
import "rsuite/Steps/styles/index.css";
import ProductCard from "../product-card";

import ProductStatus from "@/app/components/products/product-info/product-status";
import ProductPreview from "@/app/components/products/product-info/product-preview";
import ProductImages from "@/app/components/products/product-info/product-images";
import ProductDescription from "@/app/components/products/product-info/product-description";

const Info = ({ product }: { product: any }) => {
  const data = product;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ürün Bilgileri</h2>
      <div className="max-w-[800px]">
        <ProductStatus id={product.id} isActive={product.is_active} />
        <ProductCard data={product} />
        <ProductImages data={product} />
        <ProductDescription description={product.description} id={product.id} />
        {data.variants.length < 2 && (
          <div className="bg-card border rounded-lg mt-4">
            <h2 className="text-sm flex items-center justify-between p-4 pb-3 font-bold text-foreground border-b">
              Varyantlar
              <Link
                className="text-[12px] font-[500]"
                href={`/dashboard/products/edit/${data.id}`}
              >
                {" "}
                (Düzenle)
              </Link>
            </h2>
            <div className="p-4">
              <button type="button" className="text-sm flex items-center gap-2">
                {" "}
                <PlusCircleIcon size={17} />
                <Link href="#" className=" font-[600] text-[13px]">
                  Boyut , Renk gibi seçenekler ekleyin
                </Link>
              </button>
            </div>
          </div>
        )}

        {data.variants && data.variants.length > 0 && (
          <div className="bg-card border rounded-lg mt-4 overflow-y-scroll">
            <h2 className="text-sm flex items-center justify-between p-4 pb-3 font-bold text-foreground border-b">
              Varyantlar
              <Link
                className="text-[12px] font-[500]"
                href={`/dashboard/variants/${data.id}`}
              >
                {" "}
                (Düzenle)
              </Link>
            </h2>
            <table className="product-variants min-w-max">
              <thead>
                <tr className="text-sm w-full">
                  <td className="text-left">Title</td>
                  <td className="text-left">SKU</td>
                  <td className="text-left">Varyant Bilgisi</td>
                  <td className="text-left">Varyant Kodu</td>
                  <td className="text-right">Price</td>
                  <td className="text-right">Desi</td>
                  <td className="text-right">Stok</td>
                  <td className="text-center">İşlemler</td>
                </tr>
              </thead>
              <tbody>
                {data.variants &&
                  data.variants.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="text-sm w-full font-extralight"
                      >
                        <th className="text-left py-2 font-light">
                          {item.title}
                        </th>

                        <th className="text-left py-2 font-light">
                          {item.sku}
                        </th>
                        <th className="text-left font-light">
                          {JSON.stringify(item.combination)
                            .replaceAll('"', "")
                            .replaceAll("{", "")
                            .replaceAll("}", "")
                            .replaceAll(",", ", ")}
                        </th>
                        <th className="text-left font-light">
                          {item.variant_code}
                        </th>
                        <th className="text-right font-light">{item.price}</th>
                        <th className="text-right font-light">{item.desi}</th>
                        <th className="text-right font-light">{item.stock}</th>

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
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProductPreview data={product} />
    </div>
  );
};

export default Info;
