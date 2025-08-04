/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ProductCard from "@/app/components/products/product-card";
import { Button } from "@/components/ui/button";
import { BlocksIcon, RefreshCwIcon, Trash, Trash2 } from "lucide-react";
import React, { useState } from "react";

const index = ({
  product,
  variants,
  marketplaces,
}: {
  product: any;
  variants: any[];
  marketplaces: any[];
}) => {
  const [formData, setFormData] = useState(() =>
    variants.map((option: any) => ({
      variant_code: option.variant_code,
      combinations: {
        ...option,
        variant: undefined,
      },
      barkod: option.barkod,
      sku: option.sku,
      stock: option.stock,
      desi: option.desi,
      title: option.title,
      price: option.price,
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
        price: "",
      }))
    );
  };

  console.log(formData);

  return (
    <div className="w-full overflow-auto">
      <h2 className="text-xl font-semibold min-w-[250px]">
        {" "}
        Seçenek Grupları{" "}
      </h2>
      <ProductCard data={product} />
      <div className="box p-4 mt-4">
        <div className="flex items-center justify-between pb-5 w-full ">
          <div className="flex gap-2 text-sm variant-table-buttons">
            <button onClick={() => {}}>
              {" "}
              <Trash size={15} /> Tüm Seçenekleri Sil{" "}
            </button>
            <button onClick={handleClearVariants}>
              {" "}
              <RefreshCwIcon size={15} /> Tüm Seçenekleri Temizle{" "}
            </button>
          </div>
        </div>
        <table className="variant-table-create">
          <thead>
            <tr className="border-b">
              <th>Seçenek</th>
              <th>
                <div>
                  <span>Barkod</span>
                  <button onClick={handleGenerateBarcode}>Barkod Uret</button>
                </div>
              </th>
              <th>
                <div>
                  <span>Stok Kodu</span>
                  <button onClick={handleGenerateBarcode}>SKU Uret</button>
                </div>
              </th>
              <th>
                <div>
                  <span>Stok</span>
                  <button onClick={handleGenerateBarcode}>
                    Toplu Guncelle
                  </button>
                </div>
              </th>
              <th>
                <div>
                  <span>Satis Fiyati</span>
                  <button onClick={handleGenerateBarcode}>
                    Toplu Guncelle
                  </button>
                </div>
              </th>
              <th>
                <div>
                  <span>Liste Fiyati</span>
                  <button onClick={handleGenerateBarcode}>
                    Toplu Guncelle
                  </button>
                </div>
              </th>
              {marketplaces
                .map((i) => i.marketPlace)
                .map((item) => (
                  <>
                    <th>
                      <div>
                        <span className="capitalize">
                          {item?.name + " "}Satis Fiyat
                        </span>
                        <button onClick={handleGenerateBarcode}>
                          Toplu Guncelle
                        </button>
                      </div>
                    </th>
                    <th>
                      <div>
                        <span className="capitalize">
                          {item?.name + " "}List Fiyat
                        </span>
                        <button onClick={handleGenerateBarcode}>
                          Toplu Guncelle
                        </button>
                      </div>
                    </th>
                  </>
                ))}
              <th>
                <div>
                  <span>Maliyet</span>
                  <button onClick={handleGenerateBarcode}>
                    Toplu Guncelle
                  </button>
                </div>
              </th>
              <th className="text-right">Sil</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((item: any, index: number) => (
              <tr key={index}>
                <td className="text-left">
                  <div className="w-max">{item.variant_code}</div>
                </td>
                <td className="text-left">
                  <input
                    type="text"
                    name="barkod"
                    id=""
                    className="w-max"
                    value={item.barkod}
                    onChange={(e) =>
                      handleChange(index, "barkod", e.target.value)
                    }
                  />
                </td>
                <td className="text-left text-[13px]">
                  <div className="w-max">{item.sku}</div>
                </td>
                <td className="text-left">
                  <input
                    type="number"
                    name="Stok"
                    id=""
                    value={item.stock}
                    onChange={(e) =>
                      handleChange(index, "stock", e.target.value)
                    }
                  />
                </td>
                <td className="text-left">
                  <input
                    type="number"
                    className=""
                    name="list_price"
                    id=""
                    value={item.stock}
                    onChange={(e) =>
                      handleChange(index, "list_price", e.target.value)
                    }
                  />
                </td>
                <td className="text-left">
                  <input
                    type="number"
                    className=""
                    name="sale_price"
                    id=""
                    value={item.stock}
                    onChange={(e) =>
                      handleChange(index, "sale_price", e.target.value)
                    }
                  />
                </td>

                {marketplaces
                  .map((i) => i.marketPlace)
                  .map((item) => (
                    <>
                      <td className="text-left">
                        <input
                          type="number"
                          className=""
                          name={item.name + "_list_price"}
                          id=""
                          value={item[item.name + "_sale_price"]}
                          onChange={(e) =>
                            handleChange(
                              index,
                              item.name + "_list_price",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="text-left">
                        <input
                          type="number"
                          className=""
                          name={item.name + "_sale_price"}
                          id=""
                          value={item[item.name + "_sale_price"]}
                          onChange={(e) =>
                            handleChange(
                              index,
                              item.name + "_sale_price",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </>
                  ))}

                <td className="text-left">
                  <input
                    type="number"
                    className=""
                    name="price"
                    id=""
                    value={item.costPrice}
                    onChange={(e) =>
                      handleChange(index, "stock", e.target.value)
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
          <button
            type="button"
            className="text-sm p-2 px-3 rounded bg-[#008000] text-white"
            onClick={handleSave}
          >
            Kaydet
          </button>
        </div>
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
