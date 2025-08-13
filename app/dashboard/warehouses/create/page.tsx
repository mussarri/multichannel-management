import CreateWarehouse from "@/app/views/warehouses/CreateWarehouse";
import React from "react";

const Page = () => {
  return (
    <div className="overflow-y-auto">
      <div className="pb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Yeni Depo Oluştur</h1>
      </div>
      <CreateWarehouse />
    </div>
  );
};

export default Page;
