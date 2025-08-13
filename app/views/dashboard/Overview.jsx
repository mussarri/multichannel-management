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
  CartesianChartProps,
} from "recharts";
import { useState } from "react";
import { OrderStatus } from "@prisma/client";
import Link from "next/link";
import { PieChart } from "@mui/x-charts/PieChart";
import { dataset, valueFormatter } from "./data";
import ReactApexChart from "react-apexcharts";
console.log(dataset);

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

  const formatTime = (is) => {
    if (!iso) return "Hiç senkronize edilmedi";
    const dt = new Date(iso);
    return dt.toLocaleString("tr-TR", { hour12: false });
  };
  const statusColors = {
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

const chartSetting = {
  yAxis: [
    {
      label: "rainfall (mm)",
      width: 60,
    },
  ],
  height: 300,
};

export default function DashboardPage({ orders }) {
  const [range, setRange] = useState();
  const handleDateChange = (range) => {
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
          message="Trendyol ile bağlantı kesildi. Lütfen API anahtarınızı kontrol edin."
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
          title="Kargolanmayi Bekleyen"
          value={pendingOrders}
          icon={<Clock />}
        />

        <StatCard title="Iade Edilen" value={iadeEdilen} icon={<FileText />} />
        <StatCard
          title="İade Oranı"
          value={((iadeEdilen / orders.length) * 100 || 0) + "%"}
          icon={<RotateCcw />}
        />
      </div>

      <div className="flex gap-4">
        <div className="box p-4 col-span-2 flex-1">
          <h2 className="font-semibold mb-2">Satış Grafiği</h2>
          <ApexChart />
        </div>

        <div className="box h-fit">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Pazaryeri Dagilimi (%)</h2>
            <PieChart
              colors={["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"]} // Use palette
              series={[
                {
                  data: [
                    { id: 0, value: 25, label: "Trendyol" },
                    { id: 1, value: 35, label: "Hepsiburada" },
                    { id: 2, value: 40, label: "GittiGidiyor" },
                  ],
                },
              ]}
              width={200}
              height={200}
            />
          </CardContent>
        </div>
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

function StatCard({ title, value, icon }) {
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

function NotificationCard({ type, message }) {
  const color = type === "error" ? "text-red-600" : "text-yellow-600";
  const Icon = type === "error" ? AlertTriangle : RefreshCw;
  return (
    <div className={`flex items-center gap-2 p-3 border rounded-md ${color}`}>
      <Icon className="w-4 h-4" />
      <span className="text-sm">{message}</span>
    </div>
  );
}

function ApexChart() {
  const [state, setState] = useState({
    series: [
      {
        name: "Inflation",
        data: [24, 31, 40, 61, 40, 36, 32, 23, 14, 9, 15, 20],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,

        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          },
        },
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
