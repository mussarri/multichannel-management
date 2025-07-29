/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import ImageEditUploader from "@/app/components/products/image-uploader";

const Page = ({
  form,
  setForm,
  setErrors,
}: {
  form: any;
  setForm: (value: any) => void;
  setErrors: (value: any) => void;
}) => {
  const uploadImage = () => {};
  const deleteImage = () => {};
  console.log(form.images);

  const handleRemove = (index: number) => {
    setForm((prev) => {
      return {
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      };
    });
  };

  return (
    <div
      key={2}
      className="box p-4 max-w-[750px] w-full flex flex-col gap-5 relative"
    >
      <ImageEditUploader
        preview={false}
        setForm={setForm}
        setErrors={setErrors}
      />
      {form.images.length > 0 && (
        <div className="grid grid-cols-6 gap-3">
          {form.images.map((item: any, index) => {
            console.log(item);

            return (
              <div
                key={index}
                className="relative group shadow-sm flex items-center justify-center"
                style={{ aspectRatio: 1 }}
              >
                <Image
                  src={typeof item === "string" ? item : "/uploads/" + item.url}
                  alt={`Preview ${index}`}
                  width={200}
                  height={200}
                  objectFit="contain"
                  style={{
                    objectFit: "contain",
                  }}
                />
                <button
                  onClick={() => handleRemove(index)}
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  &times;
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;
