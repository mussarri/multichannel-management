/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from "react";
import {
  Blocks,
  Calculator,
  ChevronDown,
  ChevronRight,
  CreditCardIcon,
  Globe2Icon,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Home, Package, Users, Settings } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

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
      { label: "Kategoriler", href: "/dashboard/categories" },
      { label: "Markalar", href: "/dashboard/brands" },
      { label: "Varyantlar", href: "/dashboard/variants" },
    ],
  },
  {
    label: "Siparişler",
    icon: <CreditCardIcon size={18} />,
    href: "/dashboard/orders",
    submenu: [
      { label: "Sipariş Listesi", href: "/dashboard/orders" },
      { label: "Sipariş Oluştur", href: "/dashboard/orders/new" },
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
    label: "Entegrasyonlar",
    icon: <Blocks size={18} />,
    href: "/dashboard/integrations",
    submenu: [
      {
        label: "Pazaryeri",
        icon: <ShoppingBag size={15} />,
        href: "/dashboard/integrations/channels",
      },
      {
        label: "E-Ticaret",
        icon: <Globe2Icon size={15} />,
        href: "/dashboard/integrations/ecommerce",
      },
      {
        label: "Muhasebe",
        icon: <Calculator size={15} />,
        href: "/dashboard/integrations/accounting",
      },
      {
        label: "Kargo",
        icon: <Truck size={15} />,
        href: "/dashboard/integrations/shipping",
      },
    ],
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
  const isActive = (href: string) =>
    pathname === href ||
    (href.startsWith("/dashboard/categories") && pathname.startsWith(href)) ||
    (href.startsWith("/dashboard/products/") && pathname.startsWith(href));

  const mobile = useMediaQuery("(max-width: 1024px)");

  if (mobile) return <Mobile menuItems={menuItems} isActive={isActive} />;
  else
    return (
      <aside
        className={
          "h-screen w-[260px] bg-sidebar border-r px-2 py-4 overflow-y-auto space-y-2"
        }
      >
        <div className="pb-3">
          <Link
            href="/dashboard/overview"
            className="text-xl font-bold px-2 mb-2 text-primary logo lowercase"
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
                  "w-full flex items-center justify-between py-3 px-4 rounded hover:bg-hover text-md " +
                  ((pathname.startsWith(item.href) ||
                    (pathname == "/dashboard/categories" &&
                      item.href.startsWith("/dashboard/products"))) &&
                    " active font-semibold")
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

              {(pathname.startsWith(item.href) ||
                (pathname == "/dashboard/categories" &&
                  item.href.startsWith("/dashboard/products"))) && (
                <div className="mt-1 ml-6 flex flex-col space-y-1">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={cn(
                        "text-sm gap-2 px-3 py-2 rounded hover:bg-hover flex items-center",
                        isActive(sub.href) && "active font-semibold"
                      )}
                    >
                      {sub.icon}
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
                "w-full flex items-center gap-2 px-4 py-3 rounded text-sm hover:bg-hover text-md",
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

function Mobile({ menuItems, isActive }: { menuItems: any; isActive: any }) {
  return (
    <aside className={"bg-sidebar mobile"}>
      {menuItems.map((item: any) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "w-full flex items-center gap-2 px-4 py-3 rounded text-sm hover:bg-hover justify-center",
            isActive(item.href) && " active font-semibold"
          )}
        >
          {item.icon}
        </Link>
      ))}
    </aside>
  );
}
