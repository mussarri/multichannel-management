/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useActionState, useEffect, useState } from "react";
import {
  Check,
  Pencil,
  PlusIcon,
  RefreshCcw,
  Trash2,
  XIcon,
} from "lucide-react";
import Link from "next/link";

import { deleteProduct } from "@/app/action";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import ProductsFilter from "./filter";
import { useRouter } from "next/navigation";
import SortButton from "@/app/components/sortButton";
import { useSession } from "next-auth/react";

function filterProducts(products: any[], filters: any): any[] {
  return products.filter((product) => {
    const {
      search,
      hasVariant,
      priceMin,
      priceMax,
      maxStock,
      minStock,
      brand,
      active,
    } = filters;

    // 1. Arama (title)
    if (search && !product.title.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (
      brand &&
      !product.brand.name.toLowerCase().includes(brand.toLowerCase())
    ) {
      return false;
    }

    // 2. Varyantlı / Varyantsız filtre

    if (hasVariant !== undefined) {
      const has = product?.variants?.length > 1;

      if (hasVariant !== has) return false;
    }

    if (active !== undefined) {
      const isActive = product?.is_active;

      if (active !== isActive) return false;
    }

    // 3. Fiyat aralığı
    if (priceMin !== undefined && product.price < parseFloat(priceMin))
      return false;
    if (priceMax !== undefined && product.price > parseFloat(priceMax))
      return false;

    // 4. Stok aralığı
    if (minStock !== undefined && product.stock < parseFloat(minStock))
      return false;
    if (maxStock !== undefined && product.stock > parseFloat(maxStock))
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
  sortOptions: any
): any[] {
  const filtered = filterProducts(products, filters);

  const { sortBy, order = "asc" } = sortOptions;

  if (sortBy) {
    if (sortBy == "brand") {
      filtered.sort((a, b) => {
        const aValue = a.brand.name;
        const bValue = b.brand.name;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
    }

    filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

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

export function ProductTable({ products }: { products: any[] }) {
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortOptions, setSortOptions] = useState({
    sortBy: "price",
    order: "desc",
  });
  const { data } = useSession();
  console.log(data);

  useEffect(() => {
    setFiltered(filterAndSortProducts(products, filters, sortOptions));
  }, [products, filters, sortOptions]);

  const [message, formAction, isPending] = useActionState(deleteProduct, null);

  useEffect(() => {
    if (message?.error) {
      toast.error(message?.message);
    }
    if (message?.success) {
      toast.success(message?.message);
    }
  }, [message?.error, message?.message, message?.success]);

  const OnClick = () => {
    const router = useRouter();
    router.refresh();
    router.push("/dashboard/products/");
  };

  return (
    <div
      className="space-y-4 w-full"
      style={{
        width: "100%",
      }}
    >
      <div className=" bg-card box border-b px-4 py-2 gap-3">
        <h2 className="text-md font-semibold">Filtre</h2>
        <ProductsFilter onChange={setFilters} />
      </div>

      <div className="box p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-md font-semibold pb-2">Tablo</h2>
          <button
            type="button"
            className="hover:scale-110 duration-300 hover:cursor-pointer"
            onClick={OnClick}
          >
            <RefreshCcw size={15} />
          </button>
        </div>
        <div className="overflow-x-auto  border rounded-lg">
          <table className="min-w-full shadow-sm text-sm product">
            <thead className="bg-inherit">
              <tr className="">
                <th className="text-left p-2 border-b">ID</th>
                <th className="text-left p-2 border-b">
                  <SortButton
                    setSortOptions={setSortOptions}
                    sortOptions={sortOptions}
                    text="Ürün Adı"
                    sortBy="title"
                  />
                </th>
                <th className="text-left p-2 border-b">
                  <SortButton
                    setSortOptions={setSortOptions}
                    sortOptions={sortOptions}
                    text="Marka"
                    sortBy="brand"
                  />
                </th>
                <th className="text-left p-2 border-b">SKU</th>
                <th className="text-left p-2 border-b">Varyant</th>
                <th className="text-left p-2 border-b">
                  <SortButton
                    setSortOptions={setSortOptions}
                    sortOptions={sortOptions}
                    text="Fiyat"
                    sortBy="price"
                  />
                </th>
                <th className="text-left p-2 border-b">
                  {" "}
                  <SortButton
                    setSortOptions={setSortOptions}
                    sortOptions={sortOptions}
                    text="Stok"
                    sortBy="stock"
                  />
                </th>

                <th className="text-right p-2 border-b">Aktiflik</th>
                <th className="text-right p-2 border-b">
                  <SortButton
                    setSortOptions={setSortOptions}
                    sortOptions={sortOptions}
                    text="Tarih"
                    sortBy="createdAt"
                  />
                </th>
                <th className="text-right p-2 border-b">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filtered &&
                filtered.map((product) => {
                  const created = new Date(
                    product.createdAt
                  ).toLocaleDateString("en-GB");
                  return (
                    <tr key={product.id} className="border-b hover:bg-muted/40">
                      <td className="p-2"></td>
                      <td className="p-2">
                        <Link href={`/dashboard/products/${product.id}`}>
                          {product.name}
                        </Link>
                      </td>
                      <td className="p-2">{product.brand.name}</td>
                      <td className="p-2">{product.sku}</td>
                      <td className="p-2">
                        {product.variants.length > 1 ? "Var" : "Yok"}
                      </td>
                      <td className="p-2">
                        {product.variants.length === 1
                          ? product.variants[0].price + "₺"
                          : "Yok"}
                      </td>
                      <td className="p-2">{product.stock}</td>

                      <td className="p-2">
                        <div className="flex justify-center items-center">
                          {product.is_active ? (
                            <Check size={15} color="green" />
                          ) : (
                            <XIcon size={15} color="red" />
                          )}
                        </div>
                      </td>
                      <td className="p-2 text-right">{created}</td>
                      <td className="p-2 text-right space-x-2">
                        <div className="flex gap-2 justify-end">
                          {" "}
                          <Link href={`/dashboard/products/${product.id}`}>
                            <Pencil
                              size={16}
                              className="hover:scale-110 duration-200 hover:cursor-pointer"
                              color="var(--warning)"
                            />
                          </Link>
                          <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                              <button type="button">
                                <Trash2
                                  size={16}
                                  className="hover:scale-110 duration-200 hover:cursor-pointer"
                                  color="var(--error)"
                                />
                              </button>
                            </DialogTrigger>

                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  {product.name + " silinsin mi?"}
                                </DialogTitle>
                              </DialogHeader>

                              <form
                                action={formAction}
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  const formData = new FormData();
                                  formData.append("id", product.id);
                                  formAction(formData);
                                  setOpen(false);
                                }}
                                className="flex justify-end items-center gap-2"
                              >
                                <input
                                  type="text"
                                  name="id"
                                  value={product.id}
                                  hidden
                                />
                                <button
                                  className="rounded border px-3 p-1 text-sm"
                                  type="button"
                                  onClick={() => setOpen(false)}
                                >
                                  Iptal
                                </button>
                                <button
                                  className="rounded border px-3 p-1 text-sm bg-error text-white"
                                  type="submit"
                                  disabled={isPending}
                                >
                                  Evet
                                </button>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                    </tr>
                  );
                })}

              {filtered && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-4 text-muted-foreground"
                  >
                    Aramanıza uygun ürün bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
