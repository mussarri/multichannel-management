/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ImageEditUploader from "@/app/components/products/image-uploader";
import { XIcon } from "lucide-react";

const Page = ({
  form,
  setForm,
  setErrors,
}: {
  form: any;
  setForm: (value: any) => void;
  setErrors: (value: any) => void;
}) => {
  const [existingImages, setExistingImages] = useState(form.firstImages);

  const handleRemove = (id: string) => {
    setForm((prev) => {
      return { ...prev, deletedIds: [...prev.deletedIds, id] };
    });
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleDeleteNewImage = (index: number) => {
    setForm((prev) => {
      return { images: prev.images.filter((_, i) => i !== index) };
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
      <div className="grid grid-cols-6 gap-3">
        {existingImages.length > 0 &&
          existingImages.map((item: any, index) => {
            return (
              <div
                key={index}
                className="relative group shadow-sm flex items-center justify-center"
                style={{ aspectRatio: 1 }}
              >
                <Image
                  src={"/uploads/" + item.url}
                  alt={`Preview ${index}`}
                  width={200}
                  height={200}
                  objectFit="contain"
                  style={{
                    objectFit: "contain",
                  }}
                />
                <button
                  onClick={() => handleRemove(item.id)}
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <XIcon size={15} color="white" />
                </button>
              </div>
            );
          })}
        {form.images.length > 0 &&
          form.images?.map((item: File, index) => {
            return (
              <div
                key={index}
                className="relative group shadow-sm"
                style={{ aspectRatio: 1 }}
              >
                <Image
                  src={URL.createObjectURL(item)}
                  alt={`Preview ${index}`}
                  width={200}
                  height={200}
                  objectFit="contain"
                />
                <button
                  onClick={() => handleDeleteNewImage(index)}
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <XIcon size={15} color="white" />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Page;
