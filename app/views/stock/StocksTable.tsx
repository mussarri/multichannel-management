/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import UpdateStock from "@/app/components/warehouse/UpdateStock";
import { XIcon } from "lucide-react";
import { rankItem } from "@tanstack/match-sorter-utils";

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

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
        cell: ({ row }) => {
          return (
            <div>
              {row.original.stock}{" "}
              {row.original.WarehouseStock.length == 0 && (
                <UpdateStock product={row.original} warehouseId={"0"} />
              )}
            </div>
          );
        },
      },
    ],
    []
  );

  const getColumns = (maxQtyLength: number, array) => {
    const quantityColumns = Array.from({ length: maxQtyLength }, (_, index) => {
      return {
        id: `qty_${index}`,
        header: `${array[index].name}`,
        headerClassName: "text-right",
        cell: ({ row }) => {
          if (row.original.WarehouseStock.length == 0)
            return (
              <div className="flex  justify-end">
                <XIcon />
              </div>
            );
          return (
            <div>
              {row.original.WarehouseStock.find(
                (stock) => array[index].name == stock.warehouse.name
              ) ?? "-"}
              <UpdateStock
                product={row.original.id}
                warehouseId={
                  row.original.WarehouseStock.find(
                    (stock) => array[index].name == stock.warehouse.name
                  )?.warehouseId || "0"
                }
              />
            </div>
          );
        },
      };
    });

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
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    filterFns: { fuzzy: fuzzyFilter },
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="box p-4 space-y-2">
      <div className="flex font-semibold justify-between items-center">
        <h2>Tablo</h2>
      </div>
      <div>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          {table.getHeaderGroups()[0].headers.map((header) => {
            if (header.column.getCanFilter()) {
              return (
                <input
                  key={header.id}
                  placeholder={`${header.column.columnDef.header} filtrele`}
                  value={(header.column.getFilterValue() as string) ?? ""}
                  onChange={(e) => header.column.setFilterValue(e.target.value)}
                />
              );
            }
            return null;
          })}
        </div>
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
