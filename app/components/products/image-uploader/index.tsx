/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState, DragEvent, ChangeEvent } from "react";

export default function MultiImageUploader({
  setForm,
  setErrors,
  preview = true,
}: {
  setForm: (value: any) => void;
  setErrors: (value: any) => void;
  preview: boolean;
}) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
      setErrors((prev) => {
        return { ...prev, images: "" };
      });
      setForm((prev) => {
        return { ...prev, images: e.target.files };
      });
    }
  };

  const handleRemove = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          id="multi-upload"
          hidden
          onChange={handleFileChange}
        />
        <label
          htmlFor="multi-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <ImageIcon
            size={120}
            color="#000"
            className="hover:scale-110 transition-all duration-300"
          />
          <p className="mb-2 text-gray-600">
            Resimleri seçin veya buraya sürükleyin
          </p>
        </label>
      </div>

      {preview && previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
          {previews.map((src, index) => (
            <div
              key={index}
              className="relative group shadow-sm"
              style={{ aspectRatio: 1 }}
            >
              <Image
                src={src}
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
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
