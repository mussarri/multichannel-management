/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TextInput from "@/app/components/settings/text-input";
import CheckBox from "@/app/components/settings/checkbox";
import VariantTable from "@/app/components/products/variant-table";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import ProductCard from "@/app/components/products/product-card";

const index = () => {
  const [open, setOpen] = useState(false);
  const [option, setoption] = useState("");
  const [optionList, setOptionList] = useState<
    {
      name: string;
      active: boolean;
      values: string[];
      inputValue: string;
    }[]
  >([
    { name: "", active: false, values: [], inputValue: "" },
    {
      name: "renk",
      active: true,
      values: ["kirmizi", "mavi", "yesil"],
      inputValue: "",
    },
    {
      name: "numara",
      active: true,
      values: ["42", "43", "44"],
      inputValue: "",
    },
  ]);

  const [variants, setVariants] = useState<any[]>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      optionList.some(
        (item) => item.name.toLowerCase() === option.toLowerCase()
      )
    ) {
      alert("Bu isimde bir option zaten mevcut.");
      return;
    } else {
      setOptionList((prev) => [
        ...prev,
        { name: option, active: false, values: [], inputValue: "" },
      ]);
      setOptionList((prev) => prev.filter((item) => item.name !== ""));
      setoption("");
      setOpen(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setOptionList((prev) =>
      prev.map((option) =>
        option.name === name ? { ...option, inputValue: value } : option
      )
    );
  };

  const handleValues = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const name = target.id;
    setOptionList((prev) =>
      prev.map((option) =>
        option.name === name
          ? {
              ...option,
              values: [...option.values, option.inputValue.toLocaleLowerCase()],
            }
          : option
      )
    );
  };

  const handleInputDelete = (name: string, value: string) => {
    setOptionList((prev) =>
      prev.map((option) => {
        if (option.name === name) {
          return {
            ...option,
            values: option.values.filter((item) => item !== value),
          };
        }
        return option;
      })
    );
  };

  return (
    <div>
      <div className="pb-10">
        <div className="justify-between flex max-w-[700px] w-full ">
          <h2 className="text-xl font-semibold mb-4">Ürün Seçeneklerı</h2>
        </div>
        <ProductCard />
        <div className="w-full my-10 overflow-x-auto border rounded-md">
          <div className="justify-between flex w-full p-4 bg-card border min-w-[750px] ">
            <h2 className="text-lg font-semibold">Ürün Seçenek Gruplari</h2>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>Yeni Ürün Seçeneği Ekle</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Yeni Ürün Seçeneği Ekle</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                  <TextInput
                    name="option"
                    label="Ürün Seçeneği"
                    error={false}
                    type="text"
                    vertical={false}
                    required={true}
                    placeholder="Ürün Seçeneği"
                    value={option}
                    onChange={(e) => {
                      setoption(e);
                    }}
                  />

                  <div className="flex justify-end">
                    <Button type="submit">Kaydet</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full p-4 bg-card text-card-foreground min-w-[750px]">
            <h2 className="text-md font-semibold mb-4">
              Seçenek Gruplari Liste
            </h2>
            <div className="flex gap-3">
              {optionList
                .filter((i) => i.name !== "")
                .map((item, index) => (
                  <div key={index} className="">
                    <CheckBox
                      label={item.name}
                      value={false}
                      name="secenek"
                      onChange={() => {
                        setOptionList((prevOptions) =>
                          prevOptions.map((option) =>
                            option.name === item.name
                              ? { ...option, active: !option.active }
                              : option
                          )
                        );
                      }}
                      checked={item.active}
                      required
                    />
                  </div>
                ))}
            </div>
            <div className="flex gap-3 mt-3">
              {optionList
                .filter((item) => item.name !== "" && item.active === true)
                .map((item, index) => (
                  <div key={index}>
                    <form
                      onSubmit={handleValues}
                      id={item.name}
                      className="flex flex-col gap-3 p-2 bg-secondary text-card-foreground rounded shadow-sm border min-w-[200px]"
                    >
                      <h3 className="capitalize text-xs">{item.name}</h3>
                      <div className="flex gap-2 items-end">
                        <input
                          className="outline-none w-full"
                          name={item.name}
                          type="text"
                          required={true}
                          placeholder={""}
                          value={item.inputValue}
                          onChange={(e) => {
                            handleInputChange(item.name, e.target.value);
                          }}
                        />

                        <button
                          type="submit"
                          className="text-xs py-2 px-3 bg-primary rounded text-primary-foreground"
                        >
                          Ekle
                        </button>
                      </div>
                    </form>
                    <div className="max-h-[200px] overflow-y-auto">
                      {item.values.length > 0 && (
                        <table className="text-xs font-light w-full my-2 ">
                          <thead>
                            <tr className="">
                              <th className="text-left py-1">Seçenek</th>
                              <th className="">Sil</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.values.map((value, index) => (
                              <tr key={index} className="mt-4">
                                <th className="text-left font-light capitalize py-1">
                                  {value}
                                </th>
                                <th>
                                  <button
                                    className="text-xs rounded text-red-500"
                                    onClick={() =>
                                      handleInputDelete(item.name, value)
                                    }
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

          <div className="p-4 text-right bg-card gap-4">
            <Button onClick={() => setVariants(optionList)}>Oluştur</Button>
          </div>
        </div>

        {variants && variants.length > 0 && (
          <VariantTable optionList={variants} />
        )}
      </div>
    </div>
  );
};

export default index;
