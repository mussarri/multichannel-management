/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import TextInput from "@/app/components/settings/text-input";
import SelectInput from "@/app/components/settings/select-input";
import { OrderStatus } from "@prisma/client";

export default function OrderFilter({
  onChange,
}: {
  onChange: (filters: any) => void;
}) {
  const [filters, setFilters] = useState({
    search: "",
    active: undefined,
    status: undefined,
    brand: "",
    hasVariant: undefined, // 'yes', 'no', 'all'
    minPrice: "",
    maxPrice: "",
    minStock: "",
    maxStock: "",
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
      <div className="flex items-center justify-start h-full gap-2 mb-4 col-span-2">
        <button
          onClick={() => {
            setFilters((prev) => ({
              ...prev,
              status: undefined,
            }));
            handleChange();
          }}
          className={`px-4 py-1 text-xs rounded shadow-sm capitalize ${
            filters.status === undefined
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
        >
          Tümü
        </button>
        {Object.values(OrderStatus).map((status) => (
          <button
            key={status.toString()}
            onClick={() => {
              setFilters((prev) => ({
                ...prev,
                status: status,
              }));
              handleChange();
            }}
            className={`px-4 py-1 text-xs rounded shadow-sm capitalize ${
              filters.status === status
                ? "bg-primary text-primary-foreground "
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {status.toLowerCase()}
          </button>
        ))}
      </div>
      <div></div>
      {/* Arama */}

      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={(e) => {
          handleInput(e);
          handleChange();
        }}
        placeholder="Urun adi ile ara"
        className="border focus:border-2 focus:border-gray-100"
      />
      <input
        type="text"
        name="brand"
        value={filters.brand}
        onChange={(e) => {
          handleInput(e);
          handleChange();
        }}
        placeholder="Marka adi ile ara"
        className="border focus:border-2 focus:border-gray-100"
      />

      <select
        name={"search"}
        className={"py-2 px-4 pe-9 block w-full border  h-9 text-xs"}
      >
        <option
          onClick={(e) => {
            setFilters((prev) => ({
              ...prev,
              hasVariant: undefined,
            }));
            handleChange();
          }}
          selected={filters.hasVariant === undefined}
        >
          Tumu
        </option>
        <option
          onClick={(e) => {
            setFilters((prev) => ({
              ...prev,
              hasVariant: true,
            }));
            handleChange();
          }}
          selected={filters.hasVariant === true}
        >
          Varyantlı
        </option>
        <option
          onClick={(e) => {
            setFilters((prev) => ({
              ...prev,
              hasVariant: false,
            }));
            handleChange();
          }}
          selected={filters.hasVariant === false}
        >
          Varyantsız
        </option>
      </select>
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

        {/* Stok aralığı */}
        <div className="w-[150px]">
          <div className="*:not-first:mt-2">
            <div className="flex">
              <input
                type="number"
                className="file:text-foreground placeholder:text-muted-foreground  border flex h-9 w-full min-w-0  px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1  [-moz-appearance:_textfield] focus:z-10 border-r-0"
                placeholder="Min Stok"
                name="minStock"
                value={filters.minStock}
                onChange={(e) => {
                  handleInput(e);
                  handleChange();
                }}
                style={{
                  borderRadius: "10px 0px 0px 10px",
                }}
              />
              <input
                type="number"
                className="file:text-foreground placeholder:text-muted-foreground  border flex h-9 w-full min-w-0  px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1  [-moz-appearance:_textfield] focus:z-10 "
                name="maxStock"
                value={filters.maxStock}
                onChange={(e) => {
                  handleInput(e);
                  handleChange();
                }}
                placeholder="Max Stok"
                style={{
                  borderRadius: "0px 10px 10px 0px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
}
