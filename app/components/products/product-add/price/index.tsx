/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

export default function ProductPriceForm({
  formValues,
  setForm,
  errors,
  setErrors,
}: {
  formValues: any;
  setForm: any;
  errors: any;
  setErrors: any;
}) {
  const [salePrice, setSalePrice] = useState("");
  const [listPrice, setListPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [taxRate, setTaxRate] = useState("18");

  const handleSubmit = () => {
    const newErrors = [];

    if (!salePrice) newErrors.push("Satış fiyatı zorunludur");
    if (!listPrice) newErrors.push("Piyasa fiyatı zorunludur");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit veya console log
    console.log({
      price: Number(salePrice),
      costPrice: Number(costPrice) || null,
      taxRate: Number(taxRate),
    });
  };

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-xl font-semibold">Fiyat Bilgileri</h2>

      <div className=" grid grid-cols-2 gap-3">
        <label>Piyasa Fiyatı (₺)</label>
        <input
          type="number"
          step="0.01"
          className="border p-2 rounded outline-none"
          value={listPrice}
          name="listPrice"
          onChange={(e) => setListPrice(e.target.value)}
        />

        <label>Satış Fiyatı (₺)</label>
        <input
          type="number"
          step="0.01"
          className="border p-2 rounded outline-none"
          value={salePrice}
          name="salePrice"
          onChange={(e) => setSalePrice(e.target.value)}
        />

        <label>Alış / Maliyet Fiyatı (₺)</label>
        <input
          type="number"
          step="0.01"
          className="border p-2 rounded outline-none"
          name="costPrice"
          value={costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
        />

        <label>KDV Oranı (%)</label>
        <input
          type="number"
          className="border p-2 rounded outline-none"
          name="vatRate"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
        />
      </div>

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
