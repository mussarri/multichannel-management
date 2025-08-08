/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Check, CircleX, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import MakeCategoryMap from "@/app/components/categories/CategoryMap";
import Link from "next/link";
import SortButton from "../components/sortButton";
import CategoryTitle from "@/app/components/categories/CategoryTitle";

export const check = (value: boolean) => {
  return value ? (
    <Check color="green" size={16} />
  ) : (
    <CircleX color="red" size={16} />
  );
};

function filterProducts(
  products: any[],
  filters: any,
  marketplaces: any[]
): any[] {
  return products.filter((category) => {
    const { name, checked, hasVariant, maxStock, minStock, brand, active } =
      filters;

    // 1. Arama (title)
    if (name && !category.name.toLowerCase().includes(name.toLowerCase())) {
      return false;
    }
    if (Object.values(checked).some((i) => i == true)) {
      console.log(true);

      let mappedAll = 0;
      marketplaces.map((i) => {
        if (
          category.MarketplaceCategoryMapping.find(
            (m) => m.marketplaceId === parseInt(i.marketplaceId)
          )
        )
          mappedAll++;
      });

      return mappedAll === marketplaces.length ? false : true;
    }
    if (
      brand &&
      !category.brand.name.toLowerCase().includes(brand.toLowerCase())
    ) {
      return false;
    }

    // 2. Varyantlı / Varyantsız filtre

    if (hasVariant !== undefined) {
      const has = category?.variants?.length > 1;

      if (hasVariant !== has) return false;
    }

    if (active !== undefined) {
      const isActive = category?.is_active;

      if (active !== isActive) return false;
    }

    // 4. Stok aralığı
    if (minStock !== undefined && category.stock < parseFloat(minStock))
      return false;
    if (maxStock !== undefined && category.stock > parseFloat(maxStock))
      return false;

    // 5. Marketplacelerden en az biri eşleşmeli
    // if (marketplaces && marketplaces.length > 0) {
    //   const intersection = product.marketplaces.filter((m) =>
    //     marketplaces.includes(m)
    //   );
    //   if (intersection.length === 0) return false;
    // }

    return true;
  });
}

function filterAndSortProducts(
  products: any[],
  filters: any,
  sortOptions: any,
  marketplaces: any[]
): any[] {
  const filtered = filterProducts(products, filters, marketplaces);

  const { sortBy, order = "asc" } = sortOptions;

  if (sortBy && order) {
    filtered.sort((a, b) => {
      const aValue = sortBy.includes(".")
        ? a[sortBy.split(".")[0]][sortBy.split(".")[1]]
        : a[sortBy];
      const bValue = sortBy.includes(".")
        ? b[sortBy.split(".")[0]][sortBy.split(".")[1]]
        : b[sortBy];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (sortBy === "createdAt") {
        const fieldA = new Date(aValue as string).getTime();
        const fieldB = new Date(bValue as string).getTime();
        if (fieldA === undefined || fieldB === undefined) return 0;

        if (order === "asc") {
          return fieldA > fieldB ? 1 : -1;
        } else {
          return fieldA < fieldB ? 1 : -1;
        }
      }

      return 0;
    });
  }

  return filtered;
}
const CategoryList = ({ categories, marketplaces }) => {
  const [open, setOpen] = React.useState({
    category: null,
    marketPlace: null,
  });
  const handleOpen = (category: any, marketPlace: any) => {
    setOpen({ category, marketPlace });
  };
  const [filtered, setFiltered] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    checked: {},
  });

  const [sortOptions, setSortOptions] = useState({
    sortBy: "price",
    order: "desc",
  });

  useEffect(() => {
    setFiltered(
      filterAndSortProducts(categories, filters, sortOptions, marketplaces)
    );
  }, [categories, filters, sortOptions, marketplaces]);

  return (
    <div className="overflow-x-auto   rounded-lg">
      <CategoryTitle categories={categories} />
      <div className="box">
        <h2 className="p-3 font-semibold ">Filtre</h2>
        <div className="p-3 grid grid-cols-3 gap-3 ">
          <input
            type="text"
            name=""
            id=""
            placeholder="Kategori"
            className="outline-none"
            value={filters.name}
            onChange={(e) =>
              setFilters((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
          />
          <div>
            {marketplaces.map((item) => {
              return (
                <div key={item.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={item.name}
                    id="market"
                    className="mx-2"
                    checked={filters.checked[item.marketplaceId]}
                    onChange={() =>
                      setFilters((prev) => {
                        return {
                          ...prev,
                          checked: {
                            ...prev.checked,
                            [item.marketplaceId]:
                              !prev.checked[item.marketplaceId],
                          },
                        };
                      })
                    }
                  />
                  <label htmlFor="market">Eslenmisleri Gosterme</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="box mt-4 p-4">
        <table className="min-w-full shadow-sm text-sm">
          <thead className="bg-inherit">
            <tr className="">
              <th className="text-left p-2 ">
                <SortButton
                  setSortOptions={setSortOptions}
                  sortOptions={sortOptions}
                  text="Adı"
                  sortBy="name"
                />
              </th>
              {marketplaces.map((i) => (
                <th key={i.id} className="text-center p-2 capitalize">
                  {i.marketPlace.name}
                </th>
              ))}
              <th className="text-center p-2 ">
                {" "}
                <SortButton
                  setSortOptions={setSortOptions}
                  sortOptions={sortOptions}
                  text="Urun Sayisi"
                  sortBy="products.length"
                />
              </th>
              <th className="text-right p-2 ">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((category) => (
              <tr
                key={category.id}
                className="border-4 rounded border-background bg-card hover:bg-muted/40"
              >
                <td className="p-2">
                  <Link href={"/dashboard/categories/" + category.id}>
                    {category.name}
                  </Link>
                </td>
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
                            marketplaces={marketplaces}
                          />
                        )}
                      </div>
                    </td>
                  );
                })}

                <td className="p-2 text-center">{category.products.length}</td>
                <td className="p-2 ">
                  <div className="flex items-center justify-end text-right space-x-2">
                    <Link
                      href={`/dashboard/categories/${category.id}`}
                      className=""
                    >
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
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-4 text-muted-foreground"
                >
                  Aramanıza uygun kategori bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
