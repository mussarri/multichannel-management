/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { updateOrder } from "@/app/actions/orderactions";
import { OrderStatus } from "@prisma/client";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderActionForm2 = ({ order }) => {
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
      key={1}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("status", action);
        formData.append("orderId", order.id);
        console.log(formData);

        formAction(formData);
      }}
      className="text-right space-x-2"
    >
      <button
        type="submit"
        disabled={pending}
        className="hover-no inline-flex items-center border border-red-300 px-3 py-1.5 rounded-md text-red-500 hover:bg-red-50 text-[13px] gap-2 font-bold"
        onClick={() => {
          setAction(OrderStatus.CANCELLED);
        }}
      >
        Siparişi İptal Et
      </button>
      <button
        type="submit"
        className="hover-no inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50 text-[13px] gap-2 font-bold"
        onClick={() => {
          setAction(OrderStatus.INVOICED);
        }}
      >
        E-Fatura Oluştur
      </button>
    </form>
  );
};

export default OrderActionForm2;
