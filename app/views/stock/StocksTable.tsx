/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";

const StocksTable = ({ products, warehouses }) => {
  const columnHelper = createColumnHelper();

  const data = products;

  // Define table columns to pass into table
  const basecolumns = useMemo(
    () => [
      {
        accessorKey: "sku",
        header: "SKU",
      },
      {
        accessorKey: "name", // Accessor key for the "name" field from data object
        header: "Ürün Adı", // Column header
      },
      {
        accessorKey: "stock",
        header: "Stok",
      },
    ],
    []
  );

  console.log(products);

  const getColumns = (maxQtyLength: number, array) => {
    const quantityColumns = Array.from(
      { length: maxQtyLength },
      (_, index) => ({
        id: `qty_${index}`,
        header: `${array[index].name}`,
        cell: ({ row }) =>
          row.original.WarehouseStock.find(
            (stock) => array[index].name == stock.warehouse.name
          ) ?? "-",
      })
    );

    return [
      ...basecolumns,
      ...quantityColumns,
      {
        accessorKey: "updatedAt",
        header: "Güncelleme Tarihi",
        cell: ({ row }) => {
          const date = new Date(row.original.updatedAt);
          return (
            <div>
              {date.toLocaleDateString() + " " + date.toLocaleTimeString()}
            </div>
          );
        },
      },
    ];
  };
  const maxLength = Math.max(warehouses.length);
  const columns = getColumns(maxLength, warehouses);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
    </div>
  );
};

export default StocksTable;
