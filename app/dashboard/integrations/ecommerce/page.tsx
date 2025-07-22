import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="">
      <h2 className="font-semibold text-xl mb-4">
        Pazaryeri Entegrasyon Ayarlari
      </h2>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 2fr))",
        }}
      >
        <Link
          href={"/dashboard/integrations/ecommerce/ideasoft"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px]"
          style={{ aspectRatio: 0.9 }}
        >
          <div
            className="w-full relative h-auto"
            style={{ aspectRatio: 12 / 10 }}
          >
            <Image src="/logo/trendyol.com.png" alt="" fill />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Ideasoft Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/ecommerce/opencart"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px]"
          style={{ aspectRatio: 0.9 }}
        >
          <div
            className="w-full relative h-auto"
            style={{ aspectRatio: 12 / 10 }}
          >
            <Image src="/logo/trendyol.com.png" alt="" fill />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Opencart Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/ecommerce/woocommerce"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px]"
          style={{ aspectRatio: 0.9 }}
        >
          <div
            className="w-full relative h-auto"
            style={{ aspectRatio: 12 / 10 }}
          >
            <Image src="/logo/trendyol.com.png" alt="" fill />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Woocommerce Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/ecommerce/shopify"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px]"
          style={{ aspectRatio: 0.9 }}
        >
          <div
            className="w-full relative h-auto"
            style={{ aspectRatio: 12 / 10 }}
          >
            <Image src="/logo/trendyol.com.png" alt="" fill />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Shopify Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/ecommerce/ankaeticaret"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px]"
          style={{ aspectRatio: 0.9 }}
        >
          <div
            className="w-full relative h-auto"
            style={{ aspectRatio: 12 / 10 }}
          >
            <Image src="/logo/trendyol.com.png" alt="" fill />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            AnkaEticaret Ayarlari
          </div>
        </Link>
      </div>
    </div>
  );
};

export default page;
