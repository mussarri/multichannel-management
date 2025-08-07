"use client";
import React from "react";
import TextInput from "@/app/components/settings/text-input";

const TitleAndName = ({ formValues, setFormValues, errors, setErrors }) => {
  return (
    <div className="flex gap-4">
      <TextInput
        label={"Ürün Adi"}
        name={"name"}
        value={formValues.name}
        error={errors.name}
        required={true}
        placeholder="Ürün adi.."
        onChange={(value: string) => {
          setErrors((prev) => {
            return { ...prev, name: "" };
          });
          setFormValues({ ...formValues, name: value });
        }}
        type="text"
        vertical={true}
      />

      <div className="w-full flex-1">
        {" "}
        <TextInput
          label={"Ürün Basligi"}
          name={"title"}
          value={formValues.title}
          error={errors.title}
          required={true}
          placeholder="Ürün başlığı"
          onChange={(value: string) => {
            setErrors((prev) => {
              return { ...prev, title: "" };
            });
            setFormValues({ ...formValues, title: value });
          }}
          type="text"
          vertical={true}
        />
      </div>
    </div>
  );
};

export default TitleAndName;
