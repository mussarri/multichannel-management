import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="marketplace-settings">
      <h2 className="font-semibold text-xl mb-4">
        E-Ticaret Entegrasyon Ayarlari
      </h2>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        }}
      >
        <Link
          href={"/dashboard/integrations/ecommerce/ideasoft"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px] p-2 "
        >
          <div className="image-container">
            <Image src="/logo/ideasoft.webp" alt="" width={100} height={100} />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Ideasoft Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/ecommerce/ikas"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px] p-2"
        >
          <div className="image-container">
            <Image src="/logo/ikas-logo.png" alt="" width={100} height={100} />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Ikas Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/ecommerce/opencart"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px] p-2"
        >
          <div className="image-container">
            <Image
              src="/logo/opencart-3.1.jpg"
              alt=""
              width={100}
              height={100}
            />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Opencart Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/ecommerce/woocommerce"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px] p-2"
        >
          <div className="image-container">
            <Image
              src="/logo/woocommerce.svg"
              alt=""
              width={100}
              height={100}
            />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Woocommerce Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/ecommerce/shopify"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px] p-2"
        >
          <div className="image-container">
            <Image src="/logo/shopify.png" alt="" width={100} height={100} />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Shopify Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/ecommerce/wix"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px] p-2"
        >
          <div className="image-container">
            <Image src="/logo/wix-logo.png" alt="" width={100} height={100} />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Wix Ayarlari
          </div>
        </Link>
        <Link
          href={"/dashboard/integrations/ecommerce/ticimax"}
          className="w-full rounded-lg overflow-hidden border shadow-sm flex flex-col max-w-[160px] p-2"
        >
          <div className="image-container">
            <Image src="/logo/ticimax.jpg" alt="" width={100} height={100} />
          </div>
          <div className="text-xs font-semibold w-full text-center p-2 flex items-center justify-center h-full">
            Ticimax Ayarlari
          </div>
        </Link>
      </div>
    </div>
  );
};

export default page;
