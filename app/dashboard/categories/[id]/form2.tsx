/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";

import { Check, Trash2, XIcon } from "lucide-react";
import { check } from "@/app/views/CategoryList";

import Link from "next/link";
import AttributeValueMap from "@/app/components/attribute/AttributeValueMap";
import AttributeMap from "@/app/components/attribute/AttributeMap";
import { CreateAttribute } from "@/app/components/attribute/CreateAttribute";
import CreateValue from "@/app/components/attribute/CreateValue";
import DeleteAttribute from "@/app/components/attribute/DeleteAttribute";
import DeleteValue from "@/app/components/attribute/DeleteValue";

// server actions
// Not: server actionları çağırmak için form submit veya fetch wrapper gerekebilir, burada örnek fetch ile

export default function CategoryAttributeStepper({
  category,
  marketplaces,
  attributes,
  syncLogs,
}: {
  category: any;
  marketplaces: any;
  attributes: any;
  syncLogs;
}) {
  const [open, setOpen] = useState({
    category: null,
    marketPlace: null,
    attribute: null,
    createAttribute: null,
    value: null,
    createValue: null,
  });

  const handleOpen = (a, b) => {
    setOpen((prev) => {
      return {
        ...prev,
        [a]: b,
      };
    });
  };

  return (
    <>
      {/* kategori attribute value eslenmis mi */}
      <div className="overflow-x-auto box rounded-lg mt-4">
        <h2 className="font-semibold text-md p-4 border-b">
          {category.name + "  Secenekler Değerleri "}
          <Link
            href={"/dashboard/variants/create/?id=" + category.id}
            className={"text-xs font-medium text-primary"}
          >
            (Duzenle)
          </Link>
        </h2>
        <div className="p-4">
          <table className="attribute-table  w-full rounded-md text-sm">
            <thead className="bg-inherit border ">
              <tr className="">
                <th className="text-left p-2">
                  {process.env.NEXT_PUBLIC_BRAND_NAME}
                </th>
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
            <tbody className="border-l-2 border-r-2 border-background  ">
              {attributes.map((attr1) => {
                return (
                  <>
                    <tr
                      key={attr1.id}
                      className="rounded border-background bg-secondary"
                    >
                      <td className="text-left capitalize p-1">
                        <div className="flex gap-2 items-start font-semibold">
                          {attr1.name}
                        </div>
                      </td>
                      {marketplaces.map((i) => {
                        const map = attr1.CategoryAttributeMapping.find(
                          (m) => m.marketplaceId === parseInt(i.marketplaceId)
                        );

                        return (
                          <td key={i.id} className="text-left p-2">
                            <div className="flex gap-2 items-center text-sm">
                              {check(!!map)}{" "}
                              {map ? map.remoteAttributeName : ""}
                            </div>
                          </td>
                        );
                      })}
                      <td>
                        <div className="flex justify-center items-center gap-2">
                          <AttributeMap
                            open={open.attribute === attr1.id}
                            setOpen={(val: boolean) =>
                              handleOpen(
                                "attribute",
                                val == true ? attr1.id : null
                              )
                            }
                            attribute={attr1}
                            marketplaces={marketplaces}
                          />
                          <DeleteAttribute id={attr1.id} />
                        </div>
                      </td>
                    </tr>
                    {attr1.values.map((value) => {
                      return (
                        <tr
                          className="border-b-4 rounded border-background bg-card hover:bg-muted/40"
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
                                    <div className="flex gap-2 items-center text-sm">
                                      <Check color="green" size={16} />
                                      {map.remoteValueName}
                                    </div>
                                  ) : (
                                    <div className="flex gap-2 items-center text-sm">
                                      <XIcon size={16} />
                                    </div>
                                  )}
                                </div>
                              </td>
                            );
                          })}
                          <td>
                            <div className="flex justify-center items-center gap-2">
                              <AttributeValueMap
                                open={open.value === value.id}
                                setOpen={(val: boolean) =>
                                  handleOpen(
                                    "value",
                                    val == true ? value.id : null
                                  )
                                }
                                value={value}
                                marketplaces={marketplaces}
                              />
                              <DeleteValue attrId={attr1.id} value={value} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="border-b-2 rounded border-background bg-card hover:bg-muted/40">
                      <td className="p-2">
                        <CreateValue
                          attribute={attr1}
                          category={category}
                          open={open.createValue === attr1.id}
                          setOpen={(val: boolean) =>
                            handleOpen(
                              "createValue",
                              val == true ? attr1.id : null
                            )
                          }
                        />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <div className="p-2">
            <CreateAttribute
              category={category}
              attributes={attributes}
              open={open.createAttribute === category.id}
              setOpen={(val: boolean) =>
                handleOpen("createAttribute", val == true ? category.id : null)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
