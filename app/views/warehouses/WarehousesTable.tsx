/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";

const StocksTable = ({ warehouses }) => {
  const data = warehouses;
  // Define table columns to pass into table
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", // Accessor key for the "name" field from data object
        header: "Depo Adı", // Column header
      },
      {
        accessorKey: "address",
        header: "Adres",
      },
      {
        accessorKey: "stoklar",
        header: "Stoklar",
        cell: ({ row }) => {
          return <div>{row.original.stocks.length}</div>;
        },
      },

      {
        accessorKey: "createdAt",
        header: "Olusturlma Tarihi",
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
