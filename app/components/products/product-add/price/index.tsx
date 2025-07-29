/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

export default function ProductPriceForm({
  form,
  setForm,
  errors,
  setErrors,
}: {
  form: any;
  setForm: any;
  errors: any;
  setErrors: any;
}) {
  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-xl font-semibold">Fiyat Bilgileri</h2>
      {
        <div className=" grid grid-cols-2 gap-3">
          <label>Liste Fiyatı (₺)</label>
          <input
            type="number"
            step="0.01"
            className="border p-2 rounded outline-none"
            value={form.listPrice}
            name="listPrice"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, listPrice: e.target.value }))
            }
          />

          <label>Satış Fiyatı (₺)</label>
          <input
            type="number"
            step="0.01"
            className="border p-2 rounded outline-none"
            value={form.salePrice}
            name="salePrice"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, salePrice: e.target.value }))
            }
          />

          <label>Alış / Maliyet Fiyatı (₺)</label>
          <input
            type="number"
            step="0.01"
            className="border p-2 rounded outline-none"
            name="costPrice"
            value={form.costPrice}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, costPrice: e.target.value }))
            }
          />

          <label>KDV Oranı (%)</label>
          <input
            type="number"
            className="border p-2 rounded outline-none"
            name="vatRate"
            value={form.vatRate}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, vatRate: e.target.value }))
            }
          />
        </div>
      }

      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 rounded outline-none">
          <ul className="list-disc pl-5">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* <button
        onClick={handleSubmit}
        type="button"
        className="bg-blue-600 text-white px-4 py-2 rounded outline-none hover:bg-blue-700"
      >
        Kaydet
      </button> */}
    </div>
  );
}
