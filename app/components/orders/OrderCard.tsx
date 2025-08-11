/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import StatusButtons from "@/lib/statusButtons";
import { Status } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

const OrderCard = ({ order }) => {
  const created = new Date(order.createdAt);
  const updated = new Date(order.updatedAt);

  return (
    <div className="mt-4 ">
      <div className={"p-4 box overflow-x-auto"}>
        <table className="w-full order-details">
          <thead>
            <tr>
              <th className="text-left ">Sipariş Numarası</th>
              <th className="">Durum</th>
              <th className="">Pazaryeri</th>
              <th className="">Müşteri</th>
              <th className="">Ürün Sayısı</th>
              <th className="">Fiyat</th>
              <th className="text-right">Oluşturulma</th>
              <th className="text-right">Güncelleme </th>
            </tr>
          </thead>
          <tbody>
            <tr className={" "}>
              <td className="">
                <span className="text-xs text-secondary-foreground">
                  {order?.id || ""}
                </span>
              </td>
              <td className="text-center">
                <span className="text-xs text-secondary-foreground">
                  <StatusButtons status={order?.status} />
                </span>
              </td>
              <td className="text-center">
                <span className="text-xs text-secondary-foreground">
                  {order?.marketplace?.name || "-"}
                </span>
              </td>
              <td className="text-center">
                <div className="flex gap-2 items-center justify-center">
                  <div className="w-8 h-8 rounded-full flex justify-center items-center text-sm bg-secondary-foreground text-white">
                    {order.customer.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <span className="text-xs text-secondary-foreground">
                      {order?.customer?.name || "-"}
                    </span>
                    <span className="text-xs text-secondary-foreground">
                      {order?.customer?.email || "-"}
                    </span>
                  </div>
                </div>
              </td>
              <td className="text-center">
                <span className="text-xs text-secondary-foreground">
                  {order?.orderItems?.length || "-"}
                </span>
              </td>

              <td className="text-center">
                <span className="text-sm text-secondary-foreground">
                  {order?.totalPrice + "₺" || "-"}
                </span>
              </td>
              <td className="text-right">
                <p className="text-xs text-secondary-foreground">
                  {created.toLocaleDateString()}
                </p>
                <p className="text-xs text-secondary-foreground">
                  {created.toLocaleTimeString()}
                </p>
              </td>
              <td className="text-right">
                <p className="text-xs text-secondary-foreground">
                  {updated.toLocaleDateString()}
                </p>
                <p className="text-xs text-secondary-foreground">
                  {updated.toLocaleTimeString()}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={"box overflow-x-auto mt-4"}>
        <div className="flex items-center justify-start p-4 border-b">
          <h2 className="text-lg font-semibold">Ürünler</h2>
        </div>
        <div className="p-4">
          <table className="w-full border order-details rounded">
            <thead>
              <tr className="border-b bg-secondary">
                <th className="px-2"></th>
                <th className=""></th>
                <th>Ürün Adı</th>
                <th>Fiyat</th>
                <th className="px-2 p-1">Adet</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item, i) => (
                <tr key={item.id} className="border-b hover:bg-secondary">
                  <td>{i + 1}</td>
                  <td>
                    {" "}
                    {item.images?.length > 0 && (
                      <div>
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                            item?.product?.images[0].url
                          }
                          width={50}
                          height={50}
                          alt=""
                        />
                      </div>
                    )}
                  </td>
                  <td className="text-center"> {item?.product.name}</td>
                  <td className="text-center">
                    {" "}
                    {item?.product.salePrice + "₺"}
                  </td>
                  <td className="text-right"> {item?.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
