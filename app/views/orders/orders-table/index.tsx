/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use, useActionState, useEffect, useState } from "react";
import {
  Check,
  EyeIcon,
  Pencil,
  PlusIcon,
  RefreshCcw,
  Trash2,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";
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
import OrderActions from "@/app/components/orders/OrderActionButtons";
import StatusButtons from "@/lib/statusButtons";

const OrderStatusTR = {
  PENDING: "Bekliyor",
  PICKING: "Hazırlanıyor",
  INVOICED: "Fatura Kesildi",
  SHIPPED: "Kargoya Verildi",
  DELIVERED: "Teslim Edildi",
  ATCOLLECTIONPOINT: "Toplama Noktasına Geldi",
  CANCELLED: "İptal Edildi",
  UNSUPLIED: "Tedarik Edilemedi",
  UNPACKED: "Alınmadı",
  UNDELIVERED: "Teslim Edilemedi",
  RETURNED: "İade Edildi",
};

function filterOrders(orders: any[], filters: any): any[] {
  return orders.filter((order) => {
    const {
      search,
      status,
      hasVariant,
      priceMin,
      priceMax,
      maxStock,
      minStock,
      brand,
      active,
    } = filters;

    // 1. Arama (title)
    if (search && !order.title.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (
      brand &&
      !order.brand.name.toLowerCase().includes(brand.toLowerCase())
    ) {
      return false;
    }

    // 2. Varyantlı / Varyantsız filtre

    if (hasVariant !== undefined) {
      const has = order?.variants?.length > 1;

      if (hasVariant !== has) return false;
    }

    if (active !== undefined) {
      const isActive = order?.is_active;

      if (active !== isActive) return false;
    }
    if (status !== undefined) {
      const orderStatus = OrderStatusTR[order?.status];

      if (status !== orderStatus) return false;
    }

    // 3. Fiyat aralığı
    if (priceMin !== undefined && order.price < parseFloat(priceMin))
      return false;
    if (priceMax !== undefined && order.price > parseFloat(priceMax))
      return false;

    // 4. Stok aralığı
    if (minStock !== undefined && order.stock < parseFloat(minStock))
      return false;
    if (maxStock !== undefined && order.stock > parseFloat(maxStock))
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

function filterAndSortOrders(
  orders: any[],
  filters: any,
  sortOptions: any
): any[] {
  const filtered = filterOrders(orders, filters);

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

export default function OrderTable({ orders }: { orders: any[] }) {
  const [open, setOpen] = useState({
    orderId: null,
    deleteOrderId: null,
  });
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortOptions, setSortOptions] = useState({
    sortBy: "price",
    order: "desc",
  });

  const [isItemsOpen, setIsItemsOpen] = useState({
    orderID: null,
  });

  useEffect(() => {
    setFiltered(filterAndSortOrders(orders, filters, sortOptions));
  }, [orders, filters, sortOptions]);

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
          <table className="w-full shadow-sm text-sm order">
            <thead className="bg-inherit">
              <tr>
                <th className="text-left p-2 border-b">Siparis No</th>
                <th className="text-center p-2 border-b">Durum</th>
                <th className="text-left p-2 border-b">
                  <SortButton
                    setSortOptions={setSortOptions}
                    sortOptions={sortOptions}
                    text="Musteri"
                    sortBy="customer"
                  />
                </th>
                <th className="text-left p-2 border-b">
                  <SortButton
                    setSortOptions={setSortOptions}
                    sortOptions={sortOptions}
                    text="Pazaryeri"
                    sortBy="marketplace"
                  />
                </th>
                <th className="text-left p-2 border-b">Toplam</th>

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
                [...filtered].map((order) => {
                  const created = new Date(order.createdAt).toLocaleDateString(
                    "en-GB"
                  );
                  return (
                    <>
                      <tr
                        key={order.id}
                        className={
                          "border-b hover:bg-secondary " +
                          (isItemsOpen.orderID == order.id
                            ? "bg-secondary"
                            : "")
                        }
                      >
                        <td>
                          <Link
                            href={`/dashboard/orders/${order.id}`}
                            style={{
                              textDecoration: "underline",
                            }}
                          >
                            {order.orderNumber}
                          </Link>
                        </td>

                        <td className="text-center py-1">
                          <StatusButtons status={order.status} />
                        </td>
                        <td>{order?.customer?.name}</td>
                        <td>{order?.marketplace?.name}</td>
                        <td>{order?.totalPrice + order?.currency}</td>

                        <td className="text-right">{created}</td>
                        <td className="text-right">
                          <div className="flex gap-2 items-center justify-end">
                            {" "}
                            <button
                              onClick={() =>
                                setIsItemsOpen((prev) => {
                                  return {
                                    ...prev,
                                    orderID: prev.orderID ? null : order.id,
                                  };
                                })
                              }
                            >
                              <EyeIcon size={14} />
                            </button>
                            {/* <OrderActions order={order} /> */}
                            <Link href={`/dashboard/orders/${order.id}`}>
                              <Pencil size={14} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                      {isItemsOpen.orderID == order.id && (
                        <tr>
                          <td colSpan={7} className="py-2">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b bg-secondary">
                                  <th className="px-2"></th>
                                  <th className="px-2"></th>
                                  <th>Ürün Adı</th>
                                  <th>Fiyat</th>
                                  <th>Adet</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.orderItems.map((item, i) => (
                                  <tr
                                    key={item.id}
                                    className="border-b hover:bg-secondary "
                                  >
                                    <td className="p-1">{i + 1}</td>
                                    <td>
                                      {" "}
                                      {item.product.images.length > 0 && (
                                        <div>
                                          <Image
                                            src={
                                              process.env
                                                .NEXT_PUBLIC_IMAGE_URL +
                                              item?.product?.images[0].url
                                            }
                                            width={50}
                                            height={50}
                                            alt=""
                                          />
                                        </div>
                                      )}
                                    </td>
                                    <td className="text-center">
                                      <Link
                                        href={
                                          "/dashboard/products/" +
                                          item?.product.id +
                                          ""
                                        }
                                      >
                                        {item?.product.name}
                                      </Link>
                                    </td>
                                    <td className="text-center">
                                      {" "}
                                      {item?.product.salePrice + "₺"}
                                    </td>
                                    <td className="text-center">
                                      {" "}
                                      {item?.quantity}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}

              {filtered && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-4 text-muted-foreground"
                  >
                    Aramanıza sipariş ürün bulunamadı.
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
