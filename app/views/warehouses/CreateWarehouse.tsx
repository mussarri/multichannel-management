/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useActionState, useEffect } from "react";
// import TextInput from "@/app/components/settings/text-input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { createWarehouse } from "@/app/action";

const CreateWarehouse = () => {
  const [state, formAction, pending] = useActionState(createWarehouse, null);
  useEffect(() => {
    if (state?.error) toast.error(state?.message);
    if (state?.success) toast.success(state?.message);
  }, [state]);

  return (
    <div className="box mt-2 max-w-xl">
      <h2 className="font-semibold text-sm p-4 border-b">Yeni Depo Oluştur</h2>
      <form action={formAction}>
        <div className="p-4 space-y-3">
          <input
            name="name"
            type="text"
            placeholder="Depo Adı Giriniz"
            required={true}
            onChange={() => {}}
            className="border rounded"
            style={{
              outline: "none",
            }}
          />
          <input
            name="address"
            type="text"
            placeholder="Depo Adresi Giriniz"
            required={true}
            onChange={() => {}}
            className="border rounded"
            style={{
              outline: "none",
            }}
          />
          <div className="text-right">
            <Button disabled={pending} type="submit">
              Kaydet
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateWarehouse;
