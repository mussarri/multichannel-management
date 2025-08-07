/* eslint-disable @typescript-eslint/no-explicit-any */

import { MarkaForm } from "@/app/components/products/marka-form";
import SelectInput from "@/app/components/settings/select-input";
import React from "react";

const BrandSelect = ({
  brands,
  formValues,
  errors,
  setFormValues,
  setErrors,
}) => {
  const onChange = (value, name) => {
    setErrors((prev) => {
      return { ...prev, [name]: "" };
    });
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <div className="flex gap-4 items-end ">
      <div className=" flex-1">
        <SelectInput
          label={"Ürün Markasi"}
          name={"brandId"}
          options={brands.map((item) => item)}
          required={true}
          onChange={(value: any) => {
            onChange(value, "brandId");
          }}
          vertical={true}
          value={formValues.brandId}
          error={errors.brandId}
        />
      </div>
      <MarkaForm />
    </div>
  );
};

export default BrandSelect;
