import { Blocks } from "lucide-react";
import Image from "next/image";
import React from "react";

const index = () => {
  return (
    <div>
      <div className="pb-10">
        <div className="justify-between flex max-w-[700px] w-full ">
          <h2 className="text-xl font-semibold mb-4">Entegrasyon</h2>
        </div>
        <div className="box w-full flex relative items-center">
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
                <span className="text-xs text-secondary-foreground">
                  hl-29jdm1
                </span>
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
        <div className="w-full my-10">
          <Integration />
          <Integration />
          <Integration />
        </div>
      </div>
    </div>
  );
};

export default index;

function Integration() {
  return (
    <div className="integration rounded-lg bg-card flex w-full h-[100px] mt-3 ">
      <div
        className="logo border-r min-w-[120px]  relative p-7"
        style={{
          minWidth: "100px",
          borderRadius: "10px 0px 0 10px",
        }}
      >
        <div className="not relative w-full h-full">
          <Image src={"/logo/gg.png"} fill alt="" className="w-full" />
        </div>
      </div>
      <div className="buttons flex flex-1 w-full justify-around items-center p-4 text-card-foreground">
        <button className="flex flex-col items-center text-xs gap-1">
          <Blocks size={22} /> <span>GittiGidiyor Urunune Bagla</span>
        </button>
        <button className="flex flex-col items-center text-xs gap-1">
          <Blocks size={22} />{" "}
          <span className="text-xs">GittiGidiyor uzerinden satisa cikar</span>
        </button>
      </div>
    </div>
  );
}
