/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import TextInput from "@/app/components/settings/text-input";
import SelectInput from "@/app/components/settings/select-input";
import { OrderStatus } from "@prisma/client";

const OrderStatusTR = {
  PENDING: "Bekliyor",
  PICKING: "Hazırlanıyor",
  INVOICED: "Fatura Kesildi",
  SHIPPED: "Kargoya Verildi",
  DELIVERED: "Teslim Edildi",
  ATCOLLECTIONPOINT: "Toplama Noktasına Geldi",
  CANCELLED: "İptal Edildi",
  UNSUPLIED: "Tedarik Edilemedi",
  UNPACKED: "Alınmadı",
  UNDELIVERED: "Teslim Edilemedi",
  RETURNED: "İade Edildi",
};

export default function OrderFilter({
  onChange,
}: {
  onChange: (filters: any) => void;
}) {
  const [filters, setFilters] = useState({
    order_no: "",
    status: undefined,
    minPrice: "",
    maxPrice: "",
    customer_name: "",
    marketplaces: [] as string[],
  });

  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMarketplaceToggle = (name: string) => {
    setFilters((prev) => {
      const isActive = prev.marketplaces.includes(name);
      const newMarketplaces = isActive
        ? prev.marketplaces.filter((m) => m !== name)
        : [...prev.marketplaces, name];
      return { ...prev, marketplaces: newMarketplaces };
    });
  };

  const handleChange = () => {
    onChange(filters); // filtreler değiştiğinde parent'a bildir
  };

  return (
    <div className="filter grid grid-cols-3 gap-x-4 gap-y-4 py-4 pr-4">
      <div className=" ">
        <select
          name={"status"}
          className={"py-2 px-4 pe-9 block w-full border  h-9 text-xs"}
        >
          <option
            onClick={(e) => {
              setFilters((prev) => ({
                ...prev,
                status: undefined,
              }));
              handleChange();
            }}
            selected={filters.status === undefined}
          >
            Tumu
          </option>
          {Object.values(OrderStatus)
            .map((i) => OrderStatusTR[i])
            .map((item, index) => (
              <option
                key={index}
                onClick={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    status: item,
                  }));
                  handleChange();
                }}
                selected={filters.status === item}
              >
                {item}
              </option>
            ))}
        </select>
      </div>
      {/* Arama */}

      <input
        type="text"
        name="order_no"
        value={filters.order_no}
        onChange={(e) => {
          handleInput(e);
          handleChange();
        }}
        placeholder="Siparis No ile ara"
        className="border focus:border-2 focus:border-gray-100"
      />
      <input
        type="text"
        name="customer_name"
        value={filters.customer_name}
        onChange={(e) => {
          handleInput(e);
          handleChange();
        }}
        placeholder="Müşteri adi ile ara"
        className="border focus:border-2 focus:border-gray-100"
      />

      {/* Marketplace seçimi */}
      <div className="flex flex-col justify-center">
        <div className="flex gap-2 flex-wrap">
          {["trendyol", "hepsiburada", "n11", "amazon", "gittigidiyor"].map(
            (mp) => (
              <label key={mp} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={filters.marketplaces.includes(mp)}
                  onChange={() => {
                    handleMarketplaceToggle(mp);
                    handleChange();
                  }}
                />
                <span className="capitalize">{mp}</span>
              </label>
            )
          )}
        </div>
      </div>
      <div className="flex gap-1">
        {/* Fiyat aralığı */}
        <div className="w-[170px]">
          <div className="*:not-first:mt-2">
            <div className="flex">
              <input
                type="number"
                className="file:text-foreground placeholder:text-muted-foreground  border flex h-9 w-full min-w-0  px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1  [-moz-appearance:_textfield] focus:z-10 border-r-0"
                placeholder="Min Fiyat ₺"
                name="minPrice"
                value={filters.minPrice}
                onChange={(e) => {
                  handleInput(e);
                  handleChange();
                }}
                style={{
                  borderRadius: "10px 0px 0 10px",
                }}
              />
              <input
                type="number"
                className="file:text-foreground placeholder:text-muted-foreground  border flex h-9 w-full min-w-0  px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1  [-moz-appearance:_textfield] focus:z-10 "
                name="maxPrice"
                value={filters.maxPrice}
                onChange={(e) => {
                  handleInput(e);
                  handleChange();
                }}
                placeholder="Max Fiyat ₺"
                style={{
                  borderRadius: "0px 10px 10px 0px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
