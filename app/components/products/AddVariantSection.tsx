/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const AddVariantSection = ({ id }: { id: string }) => {
  return (
    <div className="bg-card border rounded-lg mt-4">
      <h2 className="text-sm flex items-center justify-between p-4 pb-3 font-bold text-foreground border-b">
        Varyantlar
        <Link
          className="text-[12px] font-[500]"
          href={`/dashboard/products/edit/${id}`}
        >
          {" "}
          (Düzenle)
        </Link>
      </h2>
      <div className="p-4">
        <Link
          href={"/dashboard/variants/" + id}
          target={"_blank"}
          className="text-sm flex items-center gap-2"
        >
          {" "}
          <PlusCircleIcon size={17} />
          <span className=" font-[600] text-[13px]">
            Boyut , Renk gibi seçenekler ekleyin
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AddVariantSection;
