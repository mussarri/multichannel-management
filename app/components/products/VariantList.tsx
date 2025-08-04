/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const VariantList = ({ id, variants }: { id: string; variants: any }) => {
  return (
    <div className="bg-card border rounded-lg mt-4 overflow-y-scroll">
      <h2 className="text-sm flex items-center justify-between p-4 pb-3 font-bold text-foreground border-b">
        Varyantlar
        <Link
          className="text-[12px] font-[500]"
          href={`/dashboard/variants/${id}`}
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
            <td className="text-right">Liste Price</td>
            <td className="text-right">Satis Price</td>
            <td className="text-right">Desi</td>
            <td className="text-right">Stok</td>
            <td className="text-center">İşlemler</td>
          </tr>
        </thead>
        <tbody>
          {variants &&
            variants.map((item, index) => {
              return (
                <tr key={index} className="text-sm w-full font-extralight">
                  <th className="text-left py-2 font-light">{item.title}</th>

                  <th className="text-left py-2 font-light">{item.sku}</th>
                  <th className="text-left font-light">
                    {JSON.stringify(item.combination)
                      .replaceAll('"', "")
                      .replaceAll("{", "")
                      .replaceAll("}", "")
                      .replaceAll(",", ", ")}
                  </th>
                  <th className="text-left font-light">{item.variant_code}</th>
                  <th className="text-right font-light">{item.listPrice}</th>
                  <th className="text-right font-light">{item.salePrice}</th>
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
  );
};

export default VariantList;
