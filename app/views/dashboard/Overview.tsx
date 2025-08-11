"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  Clock,
  FileText,
  RotateCcw,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { useState } from "react";
import { OrderStatus } from "@prisma/client";
import Link from "next/link";
const salesData = [
  { date: "07-01", sales: 4300 },
  { date: "07-02", sales: 5200 },
  { date: "07-03", sales: 3400 },
  { date: "07-04", sales: 6100 },
  { date: "07-05", sales: 2900 },
  { date: "07-06", sales: 4500 },
  { date: "07-07", sales: 3800 },
];

const orderData = [
  { date: "07-01", orders: 43 },
  { date: "07-02", orders: 52 },
  { date: "07-03", orders: 34 },
  { date: "07-04", orders: 61 },
  { date: "07-05", orders: 29 },
  { date: "07-06", orders: 45 },
  { date: "07-07", orders: 38 },
];

function IntegrationStatusCard({ integration }) {
  const { platform, status, lastSyncAt, lastErrorMessage } = integration;

  const formatTime = (iso: string | null) => {
    if (!iso) return "Hiç senkronize edilmedi";
    const dt = new Date(iso);
    return dt.toLocaleString("tr-TR", { hour12: false });
  };
  const statusColors: { [key: string]: string } = {
    ok: "text-green-500",
    error: "text-red-500",
    disconnected: "text-gray-500",
  };

  return (
    <div className="bg-white p-2 rounded shadow flex items-center gap-4">
      <div className="flex-shrink-0">
        {/* Placeholder logo; gerçekte platforma göre ikon koy */}
        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
          <span className="uppercase font-bold text-sm">
            {platform.slice(0, 2)}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-semibold">
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </h3>
          <div
            className={`font-medium ${statusColors[status] || "text-gray-500"}`}
          >
            {status === "ok"
              ? "Bağlı"
              : status === "error"
              ? "Hata"
              : status === "disconnected"
              ? "Bağlı Değil"
              : status}
          </div>
        </div>

        {status === "error" && lastErrorMessage && (
          <p
            className="text-xs text-red-500 mt-1 truncate"
            title={lastErrorMessage}
          >
            Hata: {lastErrorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage({ orders }) {
  const [range, setRange] = useState<{ from: Date; to: Date }>();
  const handleDateChange = (range: { from: Date; to: Date }) => {
    // API çağrısı burada yapılır
    setRange(range);
  };

  const pendingOrders = orders.filter(
    (item) => item.status === OrderStatus.PENDING
  ).length;
  const pickedButNotInvoicedOrders = orders.filter(
    (item) => item.status === OrderStatus.PICKING
  ).length;
  const iadeEdilen = orders.filter(
    (item) => item.status === OrderStatus.RETURNED
  ).length;
  const successOrders = orders.filter(
    (item) =>
      item.status === OrderStatus.DELIVERED ||
      item.status === OrderStatus.SHIPPED
  ).length;

  return (
    <div className="grid gap-4 p-4">
      {/* Notifications */}
      <div className="grid gap-2">
        <NotificationCard
          type="error"
          message="Shopify ile bağlantı kesildi. Lütfen API anahtarınızı kontrol edin."
        />
        <Link href={"/dashboard/orders"}>
          <NotificationCard
            type="warning"
            message={pendingOrders + " siparişin faturası oluşturulmamış."}
          />
        </Link>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Tamamlanan Sipariş"
          value={successOrders}
          icon={<Package />}
        />
        <StatCard
          title="Bekleyen Sipariş"
          value={pendingOrders}
          icon={<Clock />}
        />

        <StatCard title="Iade Edilen" value={iadeEdilen} icon={<FileText />} />
        <StatCard
          title="İade Oranı"
          value={(iadeEdilen / orders.length) * 100 + "%"}
          icon={<RotateCcw />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Satışlar (₺)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={salesData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#222222" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Sipariş Adedi</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={orderData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="var(--primary)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold">Entegre Edilmiş Pazaryerleri</h2>
            <div className="grid gap-4 md:grid-cols-1">
              {[
                {
                  id: 123,
                  platform: "trendyol",
                  status: "ok",
                  lastSyncAt: "22.11.2025",
                  lastErrorMessage: "key is incorrect",
                },
                {
                  id: 12313,
                  platform: "amazon",
                  status: "ok",
                  lastSyncAt: "22.11.2025",
                  lastErrorMessage: "key is incorrect",
                },
                {
                  id: 12313,
                  platform: "gittigidiyor",
                  status: "ok",
                  lastSyncAt: "22.11.2025",
                  lastErrorMessage: "key is incorrect",
                },
              ].map((i) => (
                <IntegrationStatusCard key={i.id} integration={i} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button className="w-full">Yeni Fatura Oluştur</Button>
        <Button className="w-full">
          Entegrasyonları Yeniden Senkronize Et
        </Button>
        <Button className="w-full">Ürün Eşleştir</Button>
        <Button className="w-full">Kargo Etiketi Oluştur</Button>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: any;
}) {
  return (
    <div className="flex gap-4 p-4 box items-center">
      <div className="text-blue-600 bg-blue-50 p-2 rounded-full">{icon}</div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

function NotificationCard({
  type,
  message,
}: {
  type: string;
  message: string;
}) {
  const color = type === "error" ? "text-red-600" : "text-yellow-600";
  const Icon = type === "error" ? AlertTriangle : RefreshCw;
  return (
    <div className={`flex items-center gap-2 p-3 border rounded-md ${color}`}>
      <Icon className="w-4 h-4" />
      <span className="text-sm">{message}</span>
    </div>
  );
}
