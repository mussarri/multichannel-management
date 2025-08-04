/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import React from "react";
import trendyol from "@/public/logo/trendyol.png";
import n11 from "@/public/logo/n11-landing.png";
import hepsiburada from "@/public/logo/hepsiburada-logo-landing.png";
import ebay from "@/public/logo/ebay.png";
import amazon from "@/public/logo/amazon-Logo-landing.png";
import integration from "@/public/integration.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

const index = () => {
  return (
    <div
      className="w-full py-[50px] md:py-[130px]"
      style={{
        background:
          "linear-gradient(178deg,rgba(249, 250, 251, 1) 0%, rgba(255, 255, 255, 1) 48%, rgba(255, 255, 255, 1) 100%)",
      }}
    >
      <div className="max-w-6xl px-8 lg:px-0 mx-auto py-10">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col gap-2 pr-3">
            <p className="text-primary font-semibold">Pazaryeri Entegrasyonu</p>
            <h1 className="mb-6 w-full  leading-snug !text-2xl lg:max-w-3xl lg:!text-5xl">
              Tüm sipariş, ürün ve stok yönetimi tek panelde.{" "}
            </h1>
            <p className="text-sm text-secondary-foreground my-1">
              Farklı pazaryerlerinde satış yapıyorsanız, tüm yönetimi{" "}
              <span className="font-semibold">tek panelden</span> yapmanin
              kolaylığını yaşayın.{" "}
              <Link
                href={"/integrations/trendyol"}
                className="text-primary hover:brightness-125"
              >
                Trendyol
              </Link>{" "}
              ,{" "}
              <Link
                href={"/integrations/hepsiburada"}
                className="text-primary hover:brightness-125"
              >
                Hepsiburada
              </Link>
              ,{" "}
              <Link
                href={"/integrations/n11"}
                className="text-primary hover:brightness-125"
              >
                N11
              </Link>{" "}
              ,{" "}
              <Link
                href={"/integrations/amazon"}
                className="text-primary hover:brightness-125"
              >
                Amazon
              </Link>{" "}
              ,{" "}
              <Link
                href={"/integrations/ebay"}
                className="text-primary hover:brightness-125"
              >
                eBay
              </Link>{" "}
              gibi önde gelen pazaryerleriyle tam entegre çalışan altyapımız
              sayesinde:
            </p>
            <ul className="text-[14px] text-secondary-foreground my-2 list-disc market">
              <li>
                <Check size={14} />
                Ürünlerinizi kolayca aktarabilir
              </li>
              <li>
                {" "}
                <Check size={14} /> Fiyat ve stokları anlık olarak senkronize
                edebilir
              </li>
              <li>
                <Check size={14} /> Siparişleri otomatik olarak sisteminize
                alabilir
              </li>
              <li>
                <Check size={14} />
                Fatura ve kargo süreçlerini hızlandırabilirsiniz
              </li>
            </ul>

            <Button variant="default" className="mt-4 max-w-[200px]">
              Daha Fazlasini Ogrenin
            </Button>
          </div>
          <div
            className="w-full relative rounded-lg overflow-hidden "
            style={{ aspectRatio: 1.5 }}
          >
            <Image src={integration.src} fill alt="integration" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-6 py-10 market-logos">
          <div className="w-full flex justify-center items-center">
            <div className="h-[40px] rounded-lg relative image-wrapper ">
              <Image
                src={trendyol.src}
                alt=""
                width={300}
                height={50}
                objectFit="contain"
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="h-[40px] rounded-lg relative image-wrapper ">
              <Image
                src={trendyol.src}
                alt=""
                width={300}
                height={50}
                objectFit="contain"
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="h-[40px] rounded-lg relative image-wrapper ">
              <Image
                src={n11.src}
                alt=""
                width={300}
                height={50}
                objectFit="contain"
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="h-[40px] rounded-lg relative image-wrapper ">
              <Image
                src={hepsiburada.src}
                alt=""
                width={300}
                height={50}
                objectFit="contain"
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="h-[35px] rounded-lg relative image-wrapper ">
              <Image
                src={amazon.src}
                alt=""
                width={2000}
                height={30}
                objectFit="contain"
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center ">
            <div className="h-[35px] rounded-lg relative image-wrapper ">
              <Image
                src={ebay.src}
                alt=""
                width={300}
                height={50}
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
