/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";

import { FileQuestion, Pencil, Trash2 } from "lucide-react";
import { check } from "@/app/views/CategoryList";

import { Button } from "@/components/ui/button";
import { IoIosClose } from "react-icons/io";
import Link from "next/link";
// server actions
// Not: server actionları çağırmak için form submit veya fetch wrapper gerekebilir, burada örnek fetch ile

export default function CategoryAttributeStepper({
  category,
  marketplaces,
  attributes,
}: {
  category: any;
  marketplaces: any;
  attributes: any;
}) {
  const [open, setOpen] = useState({
    category: null,
    marketPlace: null,
    attribute: null,
    value: null,
  });

  const handleOpen = (a, b, c) => {
    setOpen((prev) => {
      return {
        ...prev,
        marketPlace: c,
        [a]: b,
      };
    });
  };

  return (
    <>
      {/* kategori attribute value eslenmis mi */}
      <div className="overflow-x-auto box rounded-lg mt-4">
        <h2 className="font-semibold text-md p-4">
          {category.name + "  Secenekler Değerleri "}
          <Link
            href={"/dashboard/variants/create/?id=" + category.id}
            className={"text-xs font-medium text-primary"}
          >
            (Duzenle)
          </Link>
        </h2>
        <div className="p-4">
          <table className="attribute-table  w-full shadow-sm text-sm">
            <thead className="bg-inherit">
              <tr className="">
                <th className="text-left p-2"></th>
                {marketplaces.map((i) => {
                  return (
                    <th key={i.id} className="text-left p-2">
                      {i.marketPlace.name}
                    </th>
                  );
                })}
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {attributes.map((attr) => {
                return (
                  <>
                    <tr
                      key={attr.id}
                      className="border-4 rounded border-background bg-card hover:bg-muted/40"
                    >
                      <td className="text-left capitalize p-1">
                        <div className="flex flex-col items-start font-semibold">
                          {attr.name}
                        </div>
                      </td>
                      {marketplaces.map((i) => {
                        const map = attr.CategoryAttributeMapping.find(
                          (m) => m.marketplaceId === parseInt(i.marketplaceId)
                        );

                        return (
                          <td key={i.id} className="text-left p-2">
                            {check(!!map)} {map ? map.remoteAttributeName : ""}
                          </td>
                        );
                      })}
                      <td>
                        <div className="flex justify-center gap-2">
                          <button>
                            <Pencil size={15} color="var(--warning)" />
                          </button>
                          <button>
                            <Trash2 size={15} color="var(--error)" />{" "}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {attr.values.map((value) => {
                      return (
                        <tr
                          className="border-4 rounded border-background bg-card hover:bg-muted/40"
                          key={value.id}
                        >
                          <td className="px-2 py-1">
                            <div className="flex flex-col items-start">
                              -{value.name}
                            </div>
                          </td>{" "}
                          {marketplaces.map((i) => {
                            const map = value.AttributeValueMapping.find(
                              (m) =>
                                m.marketplaceId === parseInt(i.marketplaceId)
                            );
                            return (
                              <td key={i.id} className="px-2">
                                <div className="flex justify-start">
                                  {map ? (
                                    map.remoteValueName
                                  ) : (
                                    <IoIosClose size={15} />
                                  )}
                                </div>
                              </td>
                            );
                          })}
                          <td>
                            <div className="flex justify-center gap-2">
                              <Button
                                style={{
                                  fontSize: 10,
                                  padding: "0px 5px!important",
                                  height: "1.4rem",
                                }}
                                variant="secondary"
                                size="sm"
                              >
                                Düzenle
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
