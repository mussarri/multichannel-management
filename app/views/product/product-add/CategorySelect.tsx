/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CategoryAdd from "@/app/components/categories/CategoryAdd";
import SelectInput from "@/app/components/settings/select-input";

import React, { useState } from "react";

const CategorySelect = ({
  categories,
  formValues,
  setFormValues,
  errors,
  setErrors,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex-1 flex gap-4 items-end">
      <SelectInput
        label={"Ürün Kategorisi"}
        name={"categoryId"}
        options={categories}
        required={true}
        onChange={(value: any) => {
          setErrors((prev) => {
            return { ...prev, categoryId: "" };
          });
          setFormValues((prev) => {
            return { ...prev, categoryId: value };
          });
        }}
        vertical={true}
        value={formValues.categoryId}
        error={errors.categoryId}
      />
      <CategoryAdd categories={categories} open={open} setOpen={setOpen} />
    </div>
  );
};

export default CategorySelect;
