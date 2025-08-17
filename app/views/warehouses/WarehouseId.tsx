/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";
import AddProductToWarehouse from "@/app/components/warehouse/AddProductToWarehouse";
import UpdateStock from "@/app/components/warehouse/UpdateStock";
const StocksTable = ({ stocks, products, warehouseId }) => {
  const data = stocks;
  // Define table columns to pass into table

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
          return <div>{row.original.product.id}</div>;
        },
      },
      {
        accessorKey: "sku",
        header: "SKU",
        cell: ({ row }) => {
          return <div>{row.original.product.sku}</div>;
        },
      },
      {
        accessorKey: "name", // Accessor key for the "name" field from data object
        header: "Ürün Adı", // Column header
        cell: ({ row }) => {
          return <div>{row.original.product.name}</div>;
        },
      },
      {
        accessorKey: "quantity",
        header: "Miktar",
        cell: ({ row }) => {
          return (
            <div>
              {row.original.quantity}
              <UpdateStock
                product={row.original.product}
                warehouseId={warehouseId}
              />
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Olusturulma Tarihi",
        cell: ({ row }) => {
          const date = new Date(row.original.createdAt);
          return (
            <div>
              {date.toLocaleDateString() + " " + date.toLocaleTimeString()}
            </div>
          );
        },
      },
    ],
    []
  );

  const getColumns = (maxQtyLength: number, basecolumns: any[]) => {
    const quantityColumns = Array.from(
      { length: maxQtyLength },
      (_, index) => ({
        id: `qty_${index}`,
        header: `Stok ${index + 1}`,
        cell: ({ row }) => row.original.quantities[index] ?? "-",
      })
    );

    return [...basecolumns, ...quantityColumns];
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="pb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Depo Ürünleri</h1>
        <AddProductToWarehouse products={products} warehouseId={warehouseId} />
      </div>
      <div className="box p-4 space-y-2">
        <div className="flex font-semibold justify-between items-center">
          <h2>Tablo</h2>
        </div>
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th key={header.id} id={header.id}>
                          {" "}
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {stocks.length == 0 && (
          <div className="text-sm text-secondary-foreground">
            {" "}
            Bu depoda ürün bulunmuyor.
          </div>
        )}
      </div>
    </>
  );
};

export default StocksTable;
