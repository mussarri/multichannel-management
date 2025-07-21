import React from "react";

const index = () => {
  return (
    <div className="box p-4 w-full flex relative items-center">
      <div className="flex flex-1 h-full items-center">
        <div className="min-w-[150px]">
          <div className="bg-slate-500 rounded w-[30px] h-[30px]"></div>
        </div>
        <div className="flex gap-5 text-sm">
          <div>
            <p className="text-foreground">Urun Adi</p>
            <span className="text-xs text-secondary-foreground">
              Apple Macbook Pro M4 Pro 24GB RAM 512GB SSD
            </span>
          </div>
          <div>
            <p className="text-foreground">Urun Kodu</p>
            <span className="text-xs text-secondary-foreground">hl-29jdm1</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
          <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
            Aktif
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
          <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
            Aktif
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
          <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
            Aktif
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
          <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
            Aktif
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden"></div>
          <div className="px-1 rounded-sm border border-green-600 text-[10px] text-green-600">
            Aktif
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
