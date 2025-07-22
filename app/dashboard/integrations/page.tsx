import { Calculator, GlobeIcon, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h2 className="font-semibold text-xl mb-4">Entegrasyon Ayarlari</h2>
      <div
        className="flex gap-2"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 2fr))",
        }}
      >
        <Link
          href={"/dashboard/integrations/channels"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px]"
          style={{ aspectRatio: 0.8 }}
        >
          <div
            className="w-full relative h-auto p-10 bg-chart-1 opacity-80 hover:opacity-100"
            style={{ aspectRatio: 12 / 10 }}
          >
            <ShoppingBag size={"inherit"} color="white" />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Pazaryeri Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/ecommerce"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px]"
          style={{ aspectRatio: 0.8 }}
        >
          <div
            className="w-full relative h-auto p-10 bg-chart-2 opacity-80 hover:opacity-100"
            style={{ aspectRatio: 12 / 10 }}
          >
            <GlobeIcon size={"inherit"} color="white" />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            E-Ticaret Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/shipping"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px]"
          style={{ aspectRatio: 0.8 }}
        >
          <div
            className="w-full relative h-auto p-10 bg-chart-3 opacity-80 hover:opacity-100"
            style={{ aspectRatio: 12 / 10 }}
          >
            <Truck size={"inherit"} color="white" />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Kargo Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/accounting"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px]"
          style={{ aspectRatio: 0.8 }}
        >
          <div
            className="w-full relative h-auto p-10 bg-chart-4 opacity-80 hover:opacity-100"
            style={{ aspectRatio: 12 / 10 }}
          >
            <Calculator size={"inherit"} color="white" />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Muhasebe Ayarlari
          </div>
        </Link>
      </div>
    </div>
  );
};

export default page;
