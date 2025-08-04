/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Check, CircleX, Pencil, Trash2 } from "lucide-react";
import React from "react";
import MakeCategoryMap from "@/app/components/categories/CategoryMap";

const CategoryList = ({ categories, marketplaces }) => {
  const check = (value: boolean) => {
    return value ? (
      <Check color="green" size={16} />
    ) : (
      <CircleX color="red" size={16} />
    );
  };

  const [open, setOpen] = React.useState({
    category: null,
    marketPlace: null,
  });

  const handleOpen = (category: any, marketPlace: any) => {
    setOpen({ category, marketPlace });
  };

  return (
    <div className="overflow-x-auto   rounded-lg">
      <table className="min-w-full shadow-sm text-sm">
        <thead className="bg-inherit">
          <tr className="">
            <th className="text-left p-2 ">Adı</th>
            {marketplaces.map((i) => (
              <th key={i.id} className="text-center p-2 capitalize">
                {i.marketPlace.name}
              </th>
            ))}
            <th className="text-center p-2 ">Urun Sayisi</th>
            <th className="text-right p-2 ">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-4 rounded border-background bg-card hover:bg-muted/40"
            >
              <td className="p-2">{category.name}</td>
              {marketplaces.map((i) => {
                const mappingThisCategory =
                  category.MarketplaceCategoryMapping.find(
                    (m) => m.marketplaceId === parseInt(i.marketplaceId)
                  );

                return (
                  <td key={i.id} className="p-2 ">
                    <div className="flex justify-center items-center gap-2">
                      {check(!!mappingThisCategory)}{" "}
                      {mappingThisCategory?.remoteCategoryName}
                      {!!mappingThisCategory == false && (
                        <MakeCategoryMap
                          open={
                            open.category === category.id &&
                            open.marketPlace === i.id
                          }
                          setOpen={(value: boolean) =>
                            handleOpen(
                              value ? category.id : null,
                              value ? i.id : null
                            )
                          }
                          category={category}
                          marketPlace={i}
                        />
                      )}
                    </div>
                  </td>
                );
              })}

              <td className="p-2 text-center">{category.products.length}</td>
              <td className="p-2 text-right space-x-2">
                <button>
                  <Pencil
                    size={16}
                    className="hover:scale-110 duration-200 hover:cursor-pointer"
                    color="var(--warning)"
                  />
                </button>
                <button>
                  <Trash2
                    size={16}
                    className="hover:scale-110 duration-200 hover:cursor-pointer"
                    color="var(--error)"
                  />
                </button>
              </td>
            </tr>
          ))}

          {categories.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4 text-muted-foreground">
                Aramanıza uygun kategori bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
