/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { BlocksIcon, RefreshCwIcon, Trash, Trash2 } from "lucide-react";
import React, { useState } from "react";

const index = ({
  form,
  setForm,
  variants,
}: {
  form: any;
  setForm: (value: any) => void;
  variants: any[];
}) => {
  function generateCombinations(variants, index = 0, current = {}) {
    if (index === variants.length) {
      return [
        {
          ...current,
          variant: Object.values(current).join("-"),
        },
      ];
    }

    const [key, values] = variants[index];
    const results = [];

    values.forEach((value) => {
      results.push(
        ...generateCombinations(variants, index + 1, {
          ...current,
          [key]: value,
        })
      );
    });

    return results;
  }

  const combinations = generateCombinations(variants);

  const [formData, setFormData] = useState(() =>
    combinations.map((option: any) => ({
      variant_code: option.variant,
      combinations: {
        ...option,
        variant: undefined,
      },
      barkod: "",
      sku: "",
      desi: form.desi,
      title: form.title,
      product_name: form.name,
      price: form.price,
      sub_title: form.subtitle,
      description: form.decsription,
      // is_active: false,
      // is_default: false,
      // model: "",
      // images: [],
      // salePrice: form.salePrice,
      // listPrice: form.listPrice,
      // costPrice: form.costPrice,
      // stock: 0,
      // vatRate: 18,
    }))
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (index: number, field: string, value: string) => {
    setFormData((prev: any) =>
      prev.map((item: any, i: number) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const [bulkModal, setBulkModal] = useState({
    open: false,
    field: "",
    value: "",
  });

  const applyBulkUpdate = () => {
    setFormData((prev: any[]) =>
      prev.map((item) => ({
        ...item,
        [bulkModal.field]: bulkModal.value,
      }))
    );
    setBulkModal({ open: false, field: "", value: "" }); // Modal'ı kapat
  };

  const handleSave = () => {
    const hasEmpty = formData.some(
      (item: { [s: string]: unknown } | ArrayLike<unknown>) =>
        Object.values(item).some((val) => val === "")
    );

    if (hasEmpty) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    setForm((prev: any) => ({ ...prev, variants: formData }));

    console.log("Kayıt verisi:", formData);
  };

  const generateBarcode = () => {
    return (
      "BC-" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 100)
    );
  };

  function generateSKU(itemName, variantPart) {
    const namePart = itemName
      .replace(/[^a-zA-Z0-9]/g, "") // remove non-alphanum
      .toUpperCase()
      .slice(0, 6); // keep it short (optional)

    const uniquePart = Math.random().toString(36).substring(2, 5).toUpperCase();

    return `${namePart}-${variantPart}-${uniquePart}`;
  }

  const handleGenerateBarcode = () => {
    setFormData((prev: any[]) =>
      prev.map(function (item) {
        const newBarcode = generateBarcode();
        return { ...item, barkod: newBarcode };
      })
    );
  };
  const handleGenerateSku = () => {
    setFormData((prev: any[]) =>
      prev.map(function (item) {
        const newBarcode = generateSKU(item.product_name, item.variant_code);
        return { ...item, sku: newBarcode };
      })
    );
  };

  const handleDeleteVariant = (index: number) => {
    setFormData((prev: any) => prev.filter((_: any, i: number) => i !== index));
  };

  const handleClearVariants = () => {
    setFormData((prev: any[]) =>
      prev.map((item) => ({
        ...item,
        barkod: "",
        sku: "",
        title: "",
        description: "",
        price: "",
      }))
    );
  };

  return (
    <div className="w-full overflow-auto mt-5 py-6 box p-4">
      <div className="flex items-center justify-between pb-5 w-full">
        <h2 className="text-xl font-semibold min-w-[250px]">
          {" "}
          Seçenek Grupları{" "}
        </h2>
        <div className="flex gap-2 text-sm variant-table-buttons">
          <button type="button" onClick={() => {}}>
            {" "}
            <Trash size={15} /> Tüm Seçenekleri Sil{" "}
          </button>
          <button type="button" onClick={handleClearVariants}>
            {" "}
            <RefreshCwIcon size={15} /> Tüm Seçenekleri Temizle{" "}
          </button>
        </div>
      </div>
      <table className="variant-table-create w-max">
        <thead>
          <tr className="border-b">
            <th>Seçenek</th>
            <th>
              <div>
                <span>Barkod</span>
                <button type="button" onClick={handleGenerateBarcode}>
                  Barkod Uret
                </button>
              </div>
            </th>
            <th>
              <div>
                <span>Stok Kodu</span>
                <button type="button" onClick={handleGenerateSku}>
                  SKU Uret
                </button>
              </div>
            </th>
            <th className="text-right">Sil</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((item: any, index: number) => (
            <tr key={index}>
              <td className="text-left">{item.variant_code}</td>
              <td className="text-left">
                <input
                  type="text"
                  name="barkod"
                  id=""
                  value={item.barkod}
                  onChange={(e) =>
                    handleChange(index, "barkod", e.target.value)
                  }
                />
              </td>
              <td className="text-left text-[13px]">
                <input
                  type="text"
                  name="sku"
                  id=""
                  value={item.sku}
                  onChange={(e) => handleChange(index, "sku", e.target.value)}
                />
              </td>

              <td className="text-right">
                <button onClick={() => handleDeleteVariant(index)}>
                  <Trash2
                    size={16}
                    className="hover:scale-110 duration-200 hover:cursor-pointer"
                    color="var(--error)"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <button
          type="button"
          className="text-sm p-2 px-3 rounded bg-[#008000] text-white"
          onClick={handleSave}
        >
          Kaydet
        </button>
      </div>
      {bulkModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded shadow-md w-[300px]">
            <h3 className="text-lg font-semibold mb-3 capitalize">
              {bulkModal.field} Alanını Güncelle
            </h3>
            <input
              type="text"
              className="w-full border p-2 mb-4 outline-none"
              value={bulkModal.value}
              onChange={(e) =>
                setBulkModal((prev) => ({ ...prev, value: e.target.value }))
              }
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setBulkModal({ open: false, field: "", value: "" })
                }
                className="px-3 py-1 border"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={applyBulkUpdate}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Uygula
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
