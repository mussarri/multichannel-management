/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Bell,
  ChartLine,
  Combine,
  FolderSync,
  ReceiptText,
  Users,
} from "lucide-react";

const features = [
  {
    icon: <ChartLine size={30} color="var(--primary)" />,
    title: "Tek panelden tüm siparişleri yönet",
    description:
      "Tüm pazaryerlerinden gelen siparişleri tek bir ekrandan takip edin, yönetin ve kargolayın.",
  },
  {
    icon: <Bell size={30} color="var(--primary)" />,
    title: "Gelişmiş loglama ve bildirim sistemi",
    description:
      "Tüm operasyon adımlarını takip edin, hata ve gelişmelerden anlık haberdar olun.",
  },
  {
    icon: <Users size={30} color="var(--primary)" />,
    title: "Çoklu kullanıcı, çoklu firma desteği",
    description:
      "Birden fazla firma yönetin, kullanıcı rollerini belirleyerek yetkilendirin.",
  },
  {
    icon: <Combine size={30} color="var(--primary)" />,
    title: "Gerçek zamanlı stok ve fiyat senkronizasyonu",
    description:
      "Stok ve fiyat bilgileri tüm satış kanallarınızda anlık olarak güncellenir.",
  },
  {
    icon: <ReceiptText size={30} color="var(--primary)" />,
    title: "Muhasebe entegrasyonu ile faturasız işlem kalmasın",
    description:
      "Siparişlerden otomatik fatura oluşturun, muhasebe sisteminize anında yansıtın.",
  },

  {
    icon: <FolderSync size={30} color="var(--primary)" />,
    title: "Platformlar Arası Ürün Senkronizasyonu",
    description:
      " Her platformda güncel ve tutarlı ürün bilgileriyle satış yaparsınız.",
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
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition z-[1]">
      <div className="text-3xl text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default function Highlights() {
  return (
    <section
      className="w-full py-[50px] md:py-[130px] "
      style={{ background: "linear-gradient(189deg, white 0%, #f9f9f8 100%);" }}
    >
      <div
        className="absolute w-full opacity-20"
        style={{
          filter: "blur(64px)",
          transform: "translate(50%, -50%)",
          zIndex: 0,
        }}
      >
        <div
          className="w-[800px] bg-primary absolute z-0"
          style={{
            aspectRatio: 2,
            height: "auto",
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
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
          className="w-[1000px] bg-primary absolute z-0"
          style={{
            aspectRatio: 2,
            height: "auto",
            transform: "translateY(100px)",
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>

      <div className="max-w-6xl px-4 md:px-8 lg:px-0 mx-auto py-10">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col gap-2 pr-3 mt-5 md:mt-0">
            <h1 className="my-6 w-full text-center leading-snug !text-2xl lg:max-w-2xl mx-auto lg:!text-4xl">
              Satışa Uyumlu, Geleceğe Hazır{" "}
              <span className="text-primary">Entegrasyon Çözümü</span>
            </h1>
            <div className="grid gap-6 mt-3 grid-cols-2 features">
              {features.slice(0, 2).map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
            <div className="grid gap-6 mt-3 grid-cols-3 features">
              {features.slice(2, 5).map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
