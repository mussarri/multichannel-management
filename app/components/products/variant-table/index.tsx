/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { BlocksIcon, RefreshCwIcon, Trash, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const index = ({
  attributes,
  product,
  marketplaces,
}: {
  attributes: any[];
  product: any;
  marketplaces: any[];
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

  const combinations = generateCombinations(attributes);

  const [formData, setFormData] = useState(() =>
    combinations.map((option: any) => ({
      variant_code: option.variant,
      combinations: {
        ...option,
        variant: undefined,
      },
      barkod: "",
      sku: product.sku + "-" + option.variant,
      stock: 0,
      desi: product.desi,
      title: product.title,
      description: product.description,
      price: product.price,
      n11_price: product.price,
      trendyol_price: product.price,
      trendyol_sale_price: product.price,
      unit_count: 1,
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

    console.log("Kayıt verisi:", formData);
  };

  const generateBarcode = () => {
    return (
      "BC-" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 100)
    );
  };

  const handleGenerateBarcode = () => {
    setFormData((prev: any[]) =>
      prev.map(function (item) {
        const newBarcode = generateBarcode();
        return { ...item, barkod: newBarcode };
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
        stock: "",
        price: "",
        n11_price: "",
        trendyol_price: "",
        trendyol_sale_price: "",
        unitCount: "",
      }))
    );
  };

  const handleDeleteAllVariants = () => {
    setFormData([
      {
        variant_code: "default",
        combinations: {},
        barkod: "",
        sku: product.sku,
        stock: 0,
        desi: product.desi,
        title: product.title,
        description: product.description,
        price: product.price,
        n11_price: product.price,
        trendyol_price: product.price,
        trendyol_sale_price: product.price,
        unit_count: 1,
      },
    ]);
    redirect("/dashboard/products/" + product.id);
  };

  return (
    <div className="w-full overflow-auto mt-5 py-6 box p-4">
      <div className="flex items-center justify-between pb-5 w-full">
        <h2 className="text-xl font-semibold min-w-[250px]">
          {" "}
          Seçenek Grupları{" "}
        </h2>
        <div className="flex gap-2 text-sm variant-table-buttons">
          <button>
            <BlocksIcon size={16} />
            Trendyol Seçenek Eşitle
          </button>
          <button>
            <BlocksIcon size={16} />
            Gittigidiyor Seçenek Eşitle
          </button>
          <button onClick={handleDeleteAllVariants}>
            {" "}
            <Trash size={15} /> Tüm Seçenekleri Sil{" "}
          </button>
          <button onClick={handleClearVariants}>
            {" "}
            <RefreshCwIcon size={15} /> Tüm Seçenekleri Temizle{" "}
          </button>
        </div>
      </div>
      <table className="variant-table w-max">
        <thead>
          <tr className="border-b">
            <th>Seçenek</th>
            <th>
              <div>
                <span>Barkod</span>
                <button onClick={handleGenerateBarcode}>Barkod Uret</button>
              </div>
            </th>
            <th>Stok Kodu</th>
            <th>
              <div>
                <span>Stok</span>
                <button
                  onClick={() =>
                    setBulkModal({ open: true, field: "stock", value: "" })
                  }
                >
                  Toplu Güncelle
                </button>
              </div>
            </th>
            <th>
              <div>
                <span>Fiyat</span>
                <button
                  onClick={() =>
                    setBulkModal({ open: true, field: "price", value: "" })
                  }
                >
                  Toplu Güncelle
                </button>
              </div>
            </th>
            {marketplaces
              .map((i) => i.markatPlace)
              .map((item: any) => (
                <th key={item.id}>{item.name} Fiyat</th>
              ))}
            <th>
              <div>
                {" "}
                <span>N11 Fiyat</span>
                <button
                  onClick={() =>
                    setBulkModal({ open: true, field: "n11_price", value: "" })
                  }
                >
                  Toplu Güncelle
                </button>
              </div>
            </th>
            <th>
              <div>
                <span>Trendyol Liste Fiyat</span>
                <button
                  onClick={() =>
                    setBulkModal({
                      open: true,
                      field: "trendyol_price",
                      value: "",
                    })
                  }
                >
                  Toplu Güncelle
                </button>
              </div>
            </th>
            <th>
              <div>
                <span>Trendyol Satıs Fiyat</span>
                <button
                  onClick={() =>
                    setBulkModal({
                      open: true,
                      field: "trendyol_sale_price",
                      value: "",
                    })
                  }
                >
                  Toplu Güncelle
                </button>
              </div>
            </th>
            <th>Kacli Satiliyot</th>
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
              <td className="text-left text-[13px]">{item.sku}</td>
              <td className="text-left">
                <input
                  type="text"
                  name="stock"
                  id=""
                  value={item.stock}
                  onChange={(e) => handleChange(index, "stock", e.target.value)}
                />
              </td>
              <td className="text-left">
                <input
                  type="text"
                  name="price"
                  id=""
                  value={item.price}
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                />
              </td>
              <td className="text-left">
                <input
                  type="text"
                  name="n11_price"
                  id=""
                  value={item.n11_price}
                  onChange={(e) =>
                    handleChange(index, "n11_price", e.target.value)
                  }
                />
              </td>
              <td className="text-left">
                <input
                  type="text"
                  name="trendyol_price"
                  id=""
                  value={item.trendyol_price}
                  onChange={(e) =>
                    handleChange(index, "trendyol_price", e.target.value)
                  }
                />
              </td>
              <td className="text-left">
                <input
                  type="text"
                  name="trendyol_sale_price"
                  id=""
                  value={item.trendyol_sale_price}
                  onChange={(e) =>
                    handleChange(index, "trendyol_sale_price", e.target.value)
                  }
                />
              </td>
              <td className="text-left">
                <input
                  type="text"
                  name="unit_count"
                  id=""
                  value={item.unit_count}
                  onChange={(e) =>
                    handleChange(index, "unitCount", e.target.value)
                  }
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
        <Button onClick={handleSave}>Kaydet</Button>
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
                onClick={() =>
                  setBulkModal({ open: false, field: "", value: "" })
                }
                className="px-3 py-1 border"
              >
                Vazgeç
              </button>
              <button
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
