/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Check, MoveRight } from "lucide-react";

import ideasoft from "@/public/logo/ideasoft.webp";
import shopify from "@/public/logo/shopify.png";
import opencart from "@/public/logo/opencart-3.1.jpg";
import woocommerce from "@/public/logo/woocommerce.svg";
import wix from "@/public/logo/wix-logo.png";
import ikas from "@/public/logo/ikas-logo.png";
import shopier from "@/public/logo/shopier-logo.png";
import ticimax from "@/public/logo/ticimax.jpg";

import Image from "next/image";
import React from "react";

const index = () => {
  return (
    <div
      className="w-full py-[50px] md:py-[110px]"
      style={{
        background:
          "linear-gradient(178deg,rgba(249, 250, 251, 1) 0%, rgba(255, 255, 255, 1) 48%, rgba(255, 255, 255, 1) 100%)",
      }}
    >
      <div
        className="w-full bg-red-300 "
        style={{
          aspectRatio: 2,
          height: "auto",
          clipPath:
            "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
        }}
      />

      <div className="max-w-6xl px-4 md:px-8 lg:px-0 mx-auto py-10">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col gap-2 pr-3 mt-5 md:mt-0">
            <p className="font-semibold text-primary">Ticaret Altyapıları</p>
            <h1 className="mb-6 w-full leading-snug !text-2xl lg:max-w-3xl lg:!text-4xl">
              Web sitenizden gelen siparişleri merkezden yönetebilirsiniz.
            </h1>
            <p className="text-sm text-secondary-foreground my-1">
              Kendi web siteniz mi var? Shopify, WooCommerce, OpenCart, Ticimax
              ve Ideasoft gibi popüler altyapılarla tam uyumlu çalışıyoruz.
            </p>
            <div className="flex gap-2 mt-auto">
              <Button variant="default" className="mt-4 max-w-[200px]">
                Başlayın..
              </Button>
              <Button
                variant="link"
                className="mt-4 max-w-[200px] flex items-center"
              >
                Tüm Entegrasyonlar <MoveRight size={14} />
              </Button>
            </div>
          </div>
          <div className="w-full justify-center flex fade-box  relative">
            <div className="w-fit gap-5 flex items-center justify-center relative ">
              <div className="flex flex-col gap-3 mt-[80px]">
                <div className="e-commerce-box">
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={wix.src}
                    objectFit="contain"
                    className="-translate-x-2"
                  />
                </div>
                <div className="e-commerce-box">
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={woocommerce.src}
                    objectFit="contain"
                    className="-translate-x-2"
                  />
                </div>
                <div className="e-commerce-box">
                  {" "}
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={ticimax.src}
                    objectFit="contain"
                  />
                </div>
                <div className="e-commerce-box"></div>
              </div>
              <div className="flex flex-col gap-3 mt-[0px]">
                <div className="e-commerce-box ">
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={shopier.src}
                    objectFit="contain"
                    className="translate-y-2"
                  />
                </div>
                <div className="e-commerce-box">
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={ikas.src}
                    objectFit="contain"
                  />
                </div>
                <div className="e-commerce-box">
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={shopify.src}
                    objectFit="contain"
                  />
                </div>
                <div className="e-commerce-box">
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={ideasoft.src}
                    objectFit="contain"
                    className="-translate-y-3"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-[80px]">
                <div className="e-commerce-box">
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={woocommerce.src}
                    objectFit="contain"
                  />
                </div>
                <div className="e-commerce-box">
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={opencart.src}
                    objectFit="contain"
                  />
                </div>
                <div className="e-commerce-box">
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={wix.src}
                    objectFit="contain"
                  />
                </div>
                <div className="e-commerce-box">
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={woocommerce.src}
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-[0px]">
                <div className="e-commerce-box">
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={shopify.src}
                    objectFit="contain"
                    className="-translate-y-2"
                  />
                </div>
                <div className="e-commerce-box">
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={ticimax.src}
                    objectFit="contain"
                  />
                </div>
                <div className="e-commerce-box">
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={ideasoft.src}
                    objectFit="contain"
                    className="translate-x-2"
                  />
                </div>
                <div className="e-commerce-box">
                  <Image
                    width={100}
                    height={100}
                    alt=""
                    src={shopier.src}
                    objectFit="contain"
                    className="translate-x-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full text-sm text-secondary-foreground grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 mt-4 py-10">
          <div className="p-3 rounded-lg flex gap-2">
            <div className="min-w-[30px]">
              {" "}
              <Check color="var(--primary)" size={30} />
            </div>
            Web sitenizden gelen siparişleri merkezden yönetebilir
          </div>

          <div className="p-3 rounded-lg flex gap-2">
            <div className="min-w-[30px]">
              {" "}
              <Check color="var(--primary)" size={30} />
            </div>
            Ürünleri hem sitenizde hem pazaryerlerinde aynı anda listeleyebilir
          </div>
          <div className="p-3 rounded-lg flex gap-2">
            <div className="min-w-[30px]">
              {" "}
              <Check color="var(--primary)" size={30} />
            </div>
            Çoklu mağaza yönetimini tek noktadan kolayca yapabilirsiniz.
          </div>
          <div className="p-3 rounded-lg flex gap-2">
            <div className="min-w-[30px]">
              {" "}
              <Check color="var(--primary)" size={30} />
            </div>
            Tüm satış kanallarınız entegre ve senkronize çalışır.
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
