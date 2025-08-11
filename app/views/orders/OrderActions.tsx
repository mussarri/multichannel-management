/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import TextInput from "@/app/components/settings/text-input";
import { Steps } from "rsuite";
import "rsuite/Steps/styles/index.css";
import OrderActionForm1 from "./OrderActionForm1";
import OrderActionForm2 from "./OrderActionForm2";
import OrderActionForm3 from "./OrderActionForm3";
import OrderNote from "./OrderNote";

const OrderStatus = {
  PENDING: "Bekliyor",
  PICKING: "Hazırlanıyor",
  INVOICED: "Fatura Kesildi",
  SHIPPED: "Kargoya Verildi",
  DELIVERED: "Teslim Edildi",
  ATCOLLECTIONPOINT: "Toplama Noktasına Geldi",
  CANCELLED: "İptal Edildi",
  UNSUPLIED: "Tedarik Edilemedi",
  UNPACKED: "Alınmadı",
  RETURNED: "İade Edildi",
};

const OrderActions = ({ order }) => {
  const [note, setNote] = useState("");
  const [index, setIndex] = useState(2);
  const [error, setError] = useState({});

  useEffect(() => {
    if (order.status == "PENDING") {
      setIndex(0);
    } else if (["PICKING"].includes(order.status)) {
      setIndex(1);
    } else if (["INVOICED"].includes(order.status)) {
      setIndex(2);
    } else if (
      [
        "SHIPPED",
        "DELIVERED",
        "ATCOLLECTIONPOINT",
        "CANCELLED",
        "UNSUPLIED",
        "UNPACKED",
      ].includes(order.status)
    ) {
      setIndex(3);
    }
  }, [order.status]);

  const actions = [
    <OrderActionForm1 key={0} order={order} />,
    <OrderActionForm2 key={0} order={order} />,
    <OrderActionForm3 key={0} order={order} />,
  ];

  return (
    <div className="flex gap-2 mt-5">
      {" "}
      <OrderNote order={order} />
      <div className="flex-1 flex justify-between flex-col ">
        {/* Fatura olmadan kargo ve iade butonlarını kilitliyoruz */}
        {["CANCELLED", "UNSUPLIED", "UNPACKED", "RETURNED"].includes(
          order.status
        ) || (
          <div className="box p-4">
            <Steps current={index} small>
              <Steps.Item title="Oluşturuldu" />
              <Steps.Item title="Hazırlanıyor" />
              <Steps.Item title="Fatura Kesildi" />
              <Steps.Item title="Kargoya Verildi" />
            </Steps>
          </div>
        )}
        <div className="p-2">
          <div>
            <span className="text-sm font-bold">Durum: </span>
            <span className="text-sm ">{OrderStatus[order.status] + " "}</span>
          </div>

          {index == 0 && (
            <p className="text-xs text-secondary-foreground">
              (Sipariş oluşturuldu ve işleminizi bekliyor...)
            </p>
          )}
          {index == 1 && (
            <p className="text-xs text-secondary-foreground">
              (Sipariş hazırlanıyor devam etmek için sipariş faturasını
              oluşturun...)
            </p>
          )}
          {index == 2 && (
            <p className="text-xs text-secondary-foreground">
              (Sipariş tamamlamak için kargo numarasını gönderin...)
            </p>
          )}
          <div className="mt-2">
            <span className="text-sm font-bold">Pazaryeri: </span>
            <span className="text-sm capitalize">
              {order.marketplace.name + " "}
            </span>
          </div>
        </div>

        <div className="mt-2">{actions[index]}</div>
      </div>
    </div>
  );
};

export default OrderActions;
