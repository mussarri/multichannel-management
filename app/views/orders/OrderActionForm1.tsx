/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { updateOrder } from "@/app/actions/orderactions";
import { OrderStatus } from "@prisma/client";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderActionForm1 = ({ order }) => {
  const [message, formAction, pending] = useActionState(updateOrder, null);

  useEffect(() => {
    if (message?.error) {
      toast.error(message?.message);
    }
    if (message?.success) {
      toast.success(message?.message);
    }
    console.log(message);
  }, [message]);

  const [action, setAction] = useState("");

  return (
    <form
      key={0}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("status", action);
        formData.append("orderId", order.id);
        formAction(formData);
      }}
    >
      <div className="text-right space-x-2">
        {/* <button
          type="submit"
          onClick={() => {
            setAction(OrderStatus.PENDING);
          }}
          disabled={pending}
          className="hover-no inline-flex items-center border border-red-300 px-3 py-1.5 rounded-md text-red-500 hover:bg-red-50 text-[13px] gap-2 font-bold"
        >
          pending
        </button> */}
        <button
          type="submit"
          onClick={() => {
            setAction(OrderStatus.CANCELLED);
          }}
          disabled={pending}
          className="hover-no inline-flex items-center border border-red-300 px-3 py-1.5 rounded-md text-red-500 hover:bg-red-50 text-[13px] gap-2 font-bold"
        >
          Siparişi İptal Et
        </button>
        <button
          type="submit"
          onClick={() => {
            setAction(OrderStatus.UNSUPLIED);
          }}
          disabled={pending}
          className="hover-no inline-flex items-center border border-red-300 px-3 py-1.5 rounded-md text-red-500 hover:bg-red-50 text-[13px] gap-2 font-bold"
        >
          {" "}
          Tedarik Edilemedi Olarak İşaretle
        </button>
        <button
          type="submit"
          onClick={() => {
            setAction(OrderStatus.PICKING);
          }}
          disabled={pending}
          className="hover-no inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50 text-[13px] gap-2 font-bold"
        >
          Sipariş Hazırlanıyor Olarak İşaretle
        </button>
      </div>
    </form>
  );
};

export default OrderActionForm1;
