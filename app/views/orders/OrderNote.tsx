/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { addNoteToOrder } from "@/app/actions/orderactions";
import { Button } from "@/components/ui/button";
import TextInput from "@/app/components/settings/text-input";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input, TextField } from "@mui/material";

const OrderActionForm1 = ({ order }) => {
  const [message, formAction, pending] = useActionState(addNoteToOrder, null);
  const [note, setNote] = useState(order.note);

  useEffect(() => {
    if (message?.error) {
      toast.error(message?.message);
    }
    if (message?.success) {
      toast.success(message?.message);
    }
    console.log(message);
  }, [message]);

  return (
    <form action={formAction}>
      <div className="box p-4 min-w-[400px] flex flex-col pr-5 justify-end gap-4">
        <input type="hidden" name="orderId" value={order.id} />

        <TextInput
          value={note}
          onChange={(e) => setNote(e)}
          vertical={true}
          label="Not"
          error={false}
          required={false}
          placeholder="Not"
          name="note"
          type="text"
        />
        <div className="text-right">
          <Button>Notu Kaydet</Button>
        </div>
      </div>
    </form>
  );
};

export default OrderActionForm1;
