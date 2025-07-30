/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const index = ({ data }: { data: any }) => {
  return (
    <div className="bg-card border rounded-lg mt-4">
      <h2 className="text-sm flex items-center justify-between p-4 pb-3 font-bold text-foreground border-b">
        Görseller
        <Link
          className="text-[12px] font-[500]"
          href={`/dashboard/products/edit/${data.id}`}
        >
          {" "}
          (Düzenle)
        </Link>
      </h2>
      <div className="flex p-3  gap-3 overflow-x-auto">
        {data.images &&
          data.images.map((image, index) => (
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
      </div>
    </div>
  );
};

export default index;
