"use client";
import React, { useState } from "react";
import CalculateDesi from "@/app/components/products/CalculateDesi";
import GenerateSku from "@/app/components/products/GenerateSku";

const DesiBarkodSku = ({ formValues, setFormValues, errors }) => {
  const [desiOpen, setDesiOpen] = useState(false);
  return (
    <div className="flex flex-wrap gap-4">
      <div className={"flex gap-1 flex-col items-start"}>
        <label
          htmlFor=""
          className="min-w-[200px] text-sm uppercase font-semibold flex items-end gap-2"
        >
          Desi
          <CalculateDesi
            open={desiOpen}
            setOpen={setDesiOpen}
            setDesi={(v: number) =>
              setFormValues({ ...formValues, desi: v.toFixed(2) })
            }
          />
        </label>

        <input
          type="text"
          placeholder="desi"
          name={"desi"}
          required
          className={
            "border p-2 rounded-lg w-full outline-none text-sm " +
            (errors.desi ? "border-error" : "")
          }
          onChange={(e) => {
            setFormValues({ ...formValues, desi: e.target.value });
          }}
          value={formValues.desi}
        />
        {errors.desi && <p className="text-[12px] text-error">{errors.desi}</p>}
      </div>
      <div className={"flex gap-1 flex-col items-start"}>
        <label
          htmlFor=""
          className="min-w-[200px] text-sm uppercase font-semibold flex items-end gap-2"
        >
          Barkod
          <button
            type="button"
            className="mx-2 rounded-md text-primary p-0 text-[10px]"
          >
            Barkod Oluştur
          </button>
        </label>

        <input
          type="text"
          placeholder="barkod"
          name={"barkod"}
          required
          className={
            "border p-2 rounded-lg w-full outline-none text-sm " +
            (errors.barkod ? "border-error" : "")
          }
          onChange={(e) => {
            setFormValues({ ...formValues, barkod: e.target.value });
          }}
          value={formValues.barkod}
        />
        {errors.barkod && (
          <p className="text-[12px] text-error">{errors.barkod}</p>
        )}
      </div>
      <div className={"flex gap-1 flex-col items-start"}>
        <label
          htmlFor=""
          className="min-w-[200px] text-sm uppercase font-semibold flex items-end gap-2"
        >
          SKU
          <GenerateSku
            open={desiOpen}
            setOpen={setDesiOpen}
            setSku={(v: string) => setFormValues({ ...formValues, sku: v })}
          />
        </label>

        <input
          type="text"
          placeholder="sku"
          name={"sku"}
          required
          className={
            "border p-2 rounded-lg w-full outline-none text-sm " +
            (errors.sku ? "border-error" : "")
          }
          onChange={(e) => {
            setFormValues({ ...formValues, sku: e.target.value });
          }}
          value={formValues.sku}
        />
        {errors.sku && <p className="text-[12px] text-error">{errors.sku}</p>}
      </div>
    </div>
  );
};

export default DesiBarkodSku;
