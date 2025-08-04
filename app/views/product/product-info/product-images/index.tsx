/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const index = async ({ id, images }: { id: string; images: any }) => {
  if (!images) return;
  return (
    <div className="bg-card border rounded-lg mt-4">
      <h2 className="text-sm flex items-center justify-between p-4 pb-3 font-bold text-foreground border-b">
        Görseller
        <Link
          className="text-[12px] font-[500]"
          href={`/dashboard/products/edit/${id}`}
        >
          {" "}
          (Düzenle)
        </Link>
      </h2>
      <div className="flex p-4  gap-3 overflow-x-auto">
        {images &&
          images.length > 0 &&
          images.map((image, index) => (
            <div
              key={index}
              className="relative shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex justify-center items-center w-max min-w-[200px]"
              style={{
                aspectRatio: 4 / 3,
              }}
            >
              <Image
                src={process.env.NEXT_PUBLIC_IMAGE_URL + image.url}
                width={200}
                height={200}
                key={index}
                alt=""
                objectFit="contain"
                className="h-full object-contain"
              />
            </div>
          ))}
        {!images ||
          (images && images.length === 0 && (
            <div className="">
              <Link
                href={"/dashboard/variants/" + id}
                target={"_blank"}
                className="text-sm flex items-center gap-2"
              >
                {" "}
                <PlusCircleIcon size={17} />
                <span className=" font-[600] text-[13px]">
                  Ürün görsellerini ekleyin
                </span>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default index;
