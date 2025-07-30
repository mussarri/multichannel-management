import Link from "next/link";
import React from "react";

const Page = ({ description, id }: { description: string; id }) => {
  return (
    <div className="bg-card border rounded-lg mt-4">
      <h2 className="text-sm flex items-center justify-between p-4 pb-3 font-bold text-foreground border-b">
        Aciklama
        <Link
          className="text-[12px] font-[500]"
          href={`/dashboard/products/edit/${id}`}
        >
          {" "}
          (Düzenle)
        </Link>
      </h2>
      <div className="p-3" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};

export default Page;
