/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Bell,
  ChartLine,
  Combine,
  FolderSync,
  ReceiptText,
  Users,
} from "lucide-react";
import RotatingGradientMask from "./rotating-angle";

const features = [
  {
    icon: "📦",
    title: "Kargo Entegrasyonu",
    link: "/entegrations/",
    description:
      "Sipariş geldiği anda otomatik etiket oluşturun, kargo sürecini panelden yönetin.Yurtiçi Kargo, Aras Kargo, MNG, Sürat gibi firmalarla doğrudan bağlantı kurarak fatura yazdırmadan etiket oluşturabilir, takip numaralarını müşteriye otomatik iletebilirsiniz.",
  },
  {
    icon: <Bell size={30} color="var(--primary)" />,
    title: "Muhasebe Entegrasyonu",
    link: "/entegrations/",
    description:
      "Faturalama süreçleri otomatikleşsin, hiçbir işlem faturasız kalmasın.Logo, Mikro, Paraşüt, Nebim gibi sistemlerle entegre çalışarak siparişlerden otomatik e-fatura kesimi sağlayın. Gelir-gider takibini de doğrudan muhasebe sisteminize aktarın",
  },
  {
    icon: "🛒",
    title: "Pazaryeri Entegrasyonu",
    link: "/entegrations/",
    description:
      "Trendyol, N11, Hepsiburada ve daha fazlası ile doğrudan bağlantı.Ürünlerinizi tüm pazaryerlerine kolayca aktarın, siparişleri tek panelden yönetin, anlık stok ve fiyat senkronizasyonuyla satış kaybını önleyin",
  },
  {
    icon: "🏪",
    title: "E-Ticaret Sitesi Entegrasyonu",
    link: "/entegrations/",
    description:
      "Shopify, WooCommerce, OpenCart gibi altyapılarla uyum içinde çalışın.Kendi sitenizdeki ürünleri diğer platformlara aktarabilir, siparişleri merkeze toplayabilirsiniz. Otomatik stok ve sipariş senkronizasyonu ile müşteri memnuniyetini artırın",
  },
  {
    icon: "💳",
    title: "Ödeme Entegrasyonu",
    link: "/entegrations/",
    description:
      "İyzico, PayTR, Stripe gibi altyapılarla sorunsuz ödeme akışı.Tek panelden tüm ödeme bildirimlerinizi yönetin, ödeme durumlarını sipariş ekranınıza yansıtın.",
  },

  {
    icon: "📣",
    title: "Sosyal Medya Entegrasyonları",
    link: "/entegrations/",
    description:
      "Meta Shop, TikTok Shop gibi yeni nesil satış kanallarına hazır olun.Ürünlerinizi sosyal medya platformlarına aktararak erişiminizi artırın. Sipariş takibini ise sisteminizde yapın",
  },
];

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div
      className="rounded-lg p-6  mt-5 flex w-fit max-w-[950px] items-center gap-[50px] "
      style={{
        background: "transparent",
      }}
    >
      <div
        className="text-3xl text-indigo-600 mb-4 min-w-[300px] flex justify-center items-center rounded min-h-[200px] relative"
        style={{
          background:
            "linear-gradient(90deg, rgba(239, 161, 85, 1) 0%, rgba(249, 250, 251, 0) 100%)",
        }}
      >
        <div className="z-10 flex justify-center items-center">{icon}</div>
      </div>
      <div className="w-fit h-full flex flex-col justify-around z-[1] relative">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-secondary-foreground text-sm text-light">
          {description}
        </p>

        <div className="pt-5 text-right">
          <Button
            variant="default"
            className="text-[13px] bg-[#9498b3] text-foreground"
          >
            Daha Fazla...
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Highlights() {
  return (
    <section
      className="w-full py-[50px] md:py-[90px] relative z-0"
      style={{
        background: "linear-gradient(180deg, #222233 0%, #0b0f14 100%)",
        // "linear-gradient(180deg,rgb(249, 250, 251) 0%, rgba(70, 95, 255, 0.23) 68%, #0b0f14 100%)",
      }}
    >
      <div
        className="absolute"
        style={{
          filter: "blur(64px)",
          transform: "translate(100px, -50px)",
          zIndex: 1,
          opacity: 0.25,
          right: 0,
        }}
      >
        <div
          className="bg-primary z-0"
          style={{
            aspectRatio: 2,
            height: "auto",
            zIndex: -1,
            width: 700,
            clipPath:
              "polygon(48.66% 22.83%, 379px -2px, 98.87% -21.85%, 100% 46.4%, 76.83% 63.27%, 54.84% 85.36%, 22.33% 99.03%, 34.5% 45.03%)",
          }}
        />
      </div>
      <div
        className="absolute w-full"
        style={{
          filter: "blur(64px)",
          transform: "translate(-400px, 0px)",
          zIndex: -1,
          opacity: 0.15,
          top: "50%",
        }}
      >
        <div
          className="w-[800px] bg-primary absolute z-0"
          style={{
            aspectRatio: 2,
            height: "auto",
            zIndex: -1,
          }}
        />
      </div>
      <div
        className="absolute w-full opacity-10"
        style={{
          filter: "blur(64px)",
          transform: "translate(-50%, 50%)",
          zIndex: 0,
        }}
      >
        <div
          className="w-[1000px] bg-primary absolute z-0 "
          style={{
            aspectRatio: 2,
            height: "auto",
            transform: "translateY(100px)",
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>

      <div className="max-w-6xl px-4 md:px-8 lg:px-0 mx-auto py-10" style={{}}>
        <div className="flex flex-col-reverse md:flex-row justify-between gap-5 bg-[#2f344a] rounded-lg relative">
          <div
            className="absolute bottom-0 opacity-20"
            style={{
              filter: "blur(64px)",
              zIndex: -1,
            }}
          >
            <div
              className="w-[800px] bg-primary z-0"
              style={{
                aspectRatio: 2,
                height: "auto",
                transform: "translate(-150px,150px)",

                clipPath:
                  "polygon(24.47% -15.55%, 91.7% 11.8%, 100% 46.4%, 91% 68.4%, 62.45% 74.5%, 29.55% 76.75%, 0.63% 45.65%)",
              }}
            />
          </div>
          <div className="w-full flex flex-col gap-2 p-3 mt-5 md:mt-0 entegration-otel z-[1]">
            <h1
              className="my-6 pt-4 w-full text-center leading-snug !text-2xl px-4 lg:px-0 max-w-[540px] mx-auto lg:!text-4xl"
              style={{
                padding: "padding: 40px 20px;",
              }}
            >
              Tüm Sistemlerinizle Tam Uyumlu{" "}
              <span className="text-primary">Entegrasyon Altyapısı</span>
            </h1>
            <p className="w-full text-center mx-auto lg:max-w-2xl text-secondary-foreground">
              İş süreçlerinizi hızlandırmak, veri girişini minimize etmek ve
              operasyonel verimliliği artırmak için onlarca entegrasyon hazır
            </p>
            <div className="entegrations z-[1] flex flex-col gap-3 md:block md:gap-0">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
