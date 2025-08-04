/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { FormEvent, useActionState, useEffect, useState } from "react";
import TextInput from "@/app/components/settings/text-input";
import { CirclePlusIcon, Trash2 } from "lucide-react";
import { deleteVariants } from "@/app/action";

function Page({
  formData,
  setForm,
  errors,
  setErrors,
}: {
  formData: any;
  setForm: (value: any) => void;
  errors: any;
  setErrors: (value: any) => void;
}) {
  const [option, setoption] = useState("");
  const [attInputs, setAttributesInput] = useState({});

  const [open, setOpen] = useState(false);
  const input =
    formData.variants.length > 1 &&
    formData.variants?.map((item) => item.combination);

  const grouped =
    input &&
    Object.fromEntries(
      Object.keys(input[0]).map((key) => [
        key,
        [...new Set(input.map((item) => item[key]))],
      ])
    );

  const [attributes, setAttributes] = useState<any[]>(
    grouped ? Array.from(Object.entries(grouped)) : []
  );

  const [variants, setVariants] = useState<any[]>(attributes);

  const [message, formAction, isPending] = useActionState(deleteVariants, null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setAttributesInput({});
    setoption("");
    setOpen(false);
  };

  const handleAttributeForm = (item: any) => {
    setAttributes((prev) => {
      return prev.map((att) => {
        return att[0] === item[0]
          ? [att[0], [...att[1], attInputs[item[0]]]]
          : att;
      });
    });
    setAttributesInput({});
  };
  const checkKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <div key={2} className="w-full max-w-[750px] flex flex-col relative">
      <div className="box w-full overflow-x-auto rounded-md ">
        <div className="p-4 flex gap-2 items-center justify-start pb-2 border-b">
          <p>Ürünün Varyantları Var mı ?</p>
          <div className="border bg-background rounded-lg px-2 py-2 relative overflow-hidden flex items-center justify-center">
            <span
              className={"cursor-pointer px-2  rounded text-xs"}
              onClick={() => {
                setErrors((prev) => {
                  return { ...prev, variants: "" };
                });
                setForm((prev) => {
                  return { ...prev, is_default: true };
                });
              }}
            >
              Hayir
            </span>
            <span
              className={"cursor-pointer px-2 rounded text-xs"}
              onClick={() =>
                setForm((prev) => {
                  return { ...prev, is_default: false };
                })
              }
            >
              Evet
            </span>
            <div
              className={
                "absolute top-0 left-0 h-full w-[50px] rounded-lg flex items-center justify-center cursor-pointer text-xs text-white transition-transform duration-500 " +
                (formData.is_default
                  ? "  bg-gray-500 "
                  : " bg-[#008000] translate-x-[52px] w-[45px]")
              }
            >
              {formData.is_default ? "Hayir" : "Evet"}
            </div>
          </div>
        </div>
        {!formData.is_default && (
          <div className="p-4 justify-between flex w-full ">
            <h2 className="text-lg font-semibold">Ürün Seçenek Gruplari</h2>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">Yeni Ürün Seçeneği Ekle</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Yeni Ürün Seçeneği Ekle</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                  <TextInput
                    name="name"
                    label="Ürün Seçeneği"
                    error={false}
                    type="text"
                    vertical={true}
                    required={true}
                    placeholder="Ürün Seçeneği"
                    value={option}
                    onChange={(e) => {
                      setoption(e);
                    }}
                  />

                  <div className="flex justify-end">
                    <Button>Kaydet</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {attributes?.length > 0 && (
          <div className="w-full p-4 bg-card text-card-foreground min-w-[750px]">
            <h2 className="text-md font-semibold mb-4">
              Seçenek Gruplari Liste
            </h2>

            <div className="flex gap-3">
              {attributes
                .filter((i) => i[0] !== "")
                .map((item, index) => (
                  <div key={index} className="">
                    <span
                      id="badge-dismiss-dark"
                      className="inline-flex items-center px-2 py-1 me-2 text-[13px] font-medium text-gray-800 bg-gray-100 rounded-sm dark:bg-gray-700 dark:text-gray-300"
                    >
                      {item[0]}
                      <button
                        type="button"
                        className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-xs hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
                        data-dismiss-target="#badge-dismiss-dark"
                        aria-label="Remove"
                        onClick={() => {
                          setAttributes((prev) =>
                            prev.filter((att) => att[0] !== item[0])
                          );
                        }}
                      >
                        <svg
                          className="w-2 h-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Remove badge</span>
                      </button>
                    </span>
                  </div>
                ))}
            </div>

            <div className="flex gap-3 mt-3">
              {attributes.map((item, index) => (
                <div onKeyDown={(e) => checkKeyDown(e)} key={index}>
                  <div className="flex flex-col gap-3 p-2 bg-secondary text-card-foreground rounded shadow-sm border min-w-[200px]">
                    <h3 className="capitalize text-xs">{item[0]}</h3>
                    <div className="flex gap-2 items-center">
                      <input
                        className="outline-none w-full"
                        name={item[0]}
                        type="text"
                        required={false}
                        placeholder={item[0]}
                        value={attInputs[item[0]] || ""}
                        onChange={(e) => {
                          setAttributesInput({
                            [e.target.name]: e.target.value,
                          });
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAttributeForm(item);
                          }
                        }}
                      />

                      <button
                        onClick={() => handleAttributeForm(item)}
                        className="text-xs h-max py-1 px-2  rounded hover:scale-110 transition-all duration-300"
                      >
                        <CirclePlusIcon size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {item[1] && item[1].length > 0 && (
                      <table className="text-xs font-light w-full my-2 ">
                        <thead>
                          <tr className="">
                            <th className="text-left py-1">Seçenek</th>
                            <th className="">Sil</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(item[1] as string[]).map((value, index) => (
                            <tr key={index} className="mt-4">
                              <th className="text-left font-light capitalize py-1">
                                {value}
                              </th>
                              <th>
                                <button
                                  className="text-xs rounded text-red-500 hover:scale-110 transition-all duration-300"
                                  onClick={() => {
                                    setAttributes((prev) =>
                                      prev.map((att) => {
                                        return att[0] === item[0]
                                          ? [
                                              att[0],
                                              att[1].filter((v) => v !== value),
                                            ]
                                          : att;
                                      })
                                    );
                                  }}
                                >
                                  <Trash2 size={13} color="red" />
                                </button>
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* {attributes?.length > 0 &&
          attributes?.every((i: any) => i[1].length > 0) && (
            <div className="p-4 text-right bg-card gap-4">
              <button
                type="button"
                onClick={() => {
                  setAttributes([]);
                  setVariants([]);
                }}
              >
                Varyantlari Sil
              </button>
            </div>
          )} */}
      </div>
    </div>
  );
}

export default Page;
