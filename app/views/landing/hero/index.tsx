/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";

import {
  BarChart4Icon,
  CommandIcon,
  RectangleHorizontal,
  SquareIcon,
  UserCircleIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import image from "@/public/logo/bg-hero-17.svg";
import Link from "next/link";
 
function HeroSection16() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <>
      <Name />
    </>
  );
}

export default HeroSection16;

function Name() {
  return (
    <section className="bg-white p-8 pt-[70px] pb-0">
      <div
        className="grid mt-16 min-h-[82vh] w-full lg:h-[54rem] md:h-[34rem] place-items-stretch bg-contain bg-no-repeat"
        style={{
          backgroundImage: `url(${image.src})`,
          backgroundPosition: "center bottom",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="inline-flex text-xs rounded-lg border-[1.5px] border-blue-gray-50 bg-white py-1 lg:px-4 px-1 font-medium text-primary">
            Tüm Pazaryeri ve Entegrasyonlar Tek Yerde!
          </p>
          <h1
            color="blue-gray"
            className="mx-auto my-6 w-full leading-snug  !text-2xl lg:max-w-3xl lg:!text-5xl"
          >
            Tüm Satış Kanallarınızı{" "}
            <span className="text-primary leading-snug ">Tek Platformda</span>{" "}
            Birleştirin
            <span className="leading-snug text-primary"> </span>.
          </h1>
          <p className="mx-auto w-full !text-gray-500 lg:text-lg text-base">
            Amazon, Trendyol, Hepsiburada ve Kendi Sitenizdeki Sipariş, Stok ve
            Müşteri Yönetimini Otomatikleştirin.
          </p>
          <div className="mt-8 grid w-full place-items-start md:justify-center">
            <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">
              <Button variant="outline" className="w-full px-4 md:w-[12rem]">
                Demo Talebi!
              </Button>
              <Button className="w-full px-4 md:w-[12rem]">Başlayalım!</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
