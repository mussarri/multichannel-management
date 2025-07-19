"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from "react";
import { Blocks, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Home, Package, Users, Settings } from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    icon: <Home size={18} />,
    href: "/dashboard/overview",
  },
  {
    label: "Ürünler",
    icon: <Package size={18} />,
    href: "/dashboard/products",
    submenu: [
      { label: "Ürün Listesi", href: "/dashboard/products" },
      { label: "Kategoriler", href: "/dashboard/products/categories" },
      { label: "Varyantlar", href: "/dashboard/products/variants" },
    ],
  },
  {
    label: "Müşteriler",
    icon: <Users size={18} />,
    href: "/dashboard/customers",
    submenu: [
      { label: "Müşteri Listesi", href: "/dashboard/customers" },
      { label: "Gruplar", href: "/dashboard/customers/groups" },
    ],
  },
  {
    label: "Integrations",
    icon: <Blocks size={18} />,
    href: "/dashboard/integrations",
  },
  {
    label: "Ayarlar",
    icon: <Settings size={18} />,
    href: "/dashboard/settings",
    submenu: [
      { label: "Firma Bilgileri", href: "/dashboard/settings/company" },
      {
        label: "Ödeme Yöntemleri",
        href: "/dashboard/settings/payment-methods",
      },
      { label: "Ödeme Ayarları", href: "/dashboard/settings/payment-settings" },
      { label: "Sipariş Ayarları", href: "/dashboard/settings/order-settings" },
      { label: "Mail Ayarları", href: "/dashboard/settings/mail" },
      { label: "Arama Motoru", href: "/dashboard/settings/seo" },
      { label: "Ürün Ayarları", href: "/dashboard/settings/product" },
      { label: "Site Yönetimi", href: "/dashboard/settings/site-tools" },
      { label: "Metinler", href: "/dashboard/settings/texts" },
      { label: "Sosyal Medya", href: "/dashboard/settings/social" },
      { label: "Dijital Pazarlama", href: "/dashboard/settings/marketing" },
      { label: "Tedarikçi Ayarları", href: "/dashboard/settings/supplier" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <aside className="h-full w-64 bg-sidebar border-r px-2 py-4 overflow-y-auto space-y-2">
      <div className="pb-3">
        <Link
          href="/dashboard/overview"
          className="text-lg font-bold px-2 mb-2 text-primary"
        >
          SmartHub
        </Link>
      </div>

      {menuItems.map((item) =>
        item.submenu ? (
          <div key={item.label} className="">
            <Link
              key={item.label}
              href={item.href}
              className={
                "w-full flex items-center justify-between py-3 px-4 text-sm rounded hover:bg-hover " +
                (pathname.startsWith(item.href) && " active font-semibold")
              }
            >
              <div className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </div>
              {pathname.startsWith(item.href) ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </Link>

            {pathname.startsWith(item.href) && (
              <div className="mt-1 ml-6 flex flex-col space-y-1">
                {item.submenu.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className={cn(
                      "text-sm gap-2 px-3 py-2 rounded hover:bg-hover",
                      isActive(sub.href) && " active font-semibold"
                    )}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "w-full flex items-center gap-2 px-4 py-3 rounded text-sm hover:bg-hover",
              isActive(item.href) && " active font-semibold"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        )
      )}
    </aside>
  );
}
