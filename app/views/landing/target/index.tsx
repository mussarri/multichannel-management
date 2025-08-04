import React from "react";

const audiences = [
  // {
  //   title: "Pazaryeri Satıcıları",
  //   icon: "🛍️",
  //   description:
  //     "Trendyol, N11, Hepsiburada gibi platformlarda satış yapanlar için ideal.",
  // },
  // {
  //   title: "E-ticaret Sitesi Sahipleri",
  //   icon: "🛒",
  //   description:
  //     "Shopify, WooCommerce gibi sistemlerle çalışanlara özel kanal entegrasyonu.",
  // },
  // {
  //   title: "Kargo Süreci Yönetenler",
  //   icon: "📦",
  //   description: "Siparişe göre otomatik kargo fişi ve takip numarası üretimi.",
  // },
  // {
  //   title: "Muhasebe Uzmanları",
  //   icon: "🧾",
  //   description:
  //     "Siparişlerden otomatik e-fatura oluştur, cari hesap takibini kolaylaştır.",
  // },
  // {
  //   title: "Ajanslar ve Bayiler",
  //   icon: "🧑‍💻",
  //   description: "Çoklu firma ve kullanıcı yönetimi ile merkezi kontrol.",
  // },

  {
    title: "Bireysel Satıcılar & Girişimciler",
    icon: "🧑‍💻",
    description:
      "Kendi markasını oluşturan ya da hobi olarak e-ticarete atılan bireyler için sade, öğrenmesi kolay ve güçlü bir platform.",
  },

  {
    title: "Dropshipping Yapanlar",
    icon: "🛒",
    description:
      "Ürünleri farklı tedarikçilerden çekerek birçok kanalda listeleyenler için ürün eşleştirme, otomatik fiyat güncelleme ve stok senkronizasyonu özellikleri.",
  },

  {
    title: "KOBİ’ler & Fiziki Mağazalar",
    icon: "🧳",
    description:
      "Hem fiziksel mağazalarında hem de online platformlarda satış yapanlar için kanal bazlı yönetim ve raporlama.",
  },

  {
    title: "Kurumsal E-Ticaret Departmanları",
    icon: "🏢",
    description:
      "Yüksek hacimli sipariş ve ürün hacmi olan firmalar için çok kullanıcı, çok firma ve gelişmiş loglama desteği..",
  },

  {
    title: "Muhasebeciler ve Ön Muhasebe Kullananlar",
    icon: "🧾",
    description:
      "Fatura, irsaliye ve cari takibi kolaylaştıran muhasebe entegrasyonları.",
  },
  {
    title: "Ajanslar & Freelancer Yazılımcılar",
    icon: "🎯",
    description:
      "Müşterilerine çok kanallı e-ticaret çözümü sunmak isteyen hizmet sağlayıcılar için çoklu müşteri desteği ve yönetim paneli.",
  },
];

export default function AudienceSection() {
  return (
    <section className="w-full py-[120px] md:pb-[200px] bg-[#0b0f14] text-white relative flex items-center justify-center">
      <div className="absolute w-full opacity" style={{ filter: "blur(64px)" }}>
        <div
          className="w-full h-[50px] bg-primary absolute"
          style={{ clipPath: "polygon(0 0, 47% 100%, 100% 0)" }}
        />
      </div>
      <div className="max-w-6xl px-4 md:px-8 lg:px-0 mx-auto flex items-center justify-center h-full z-[1]">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-5">
          <div className="w-full flex flex-col gap-2 pr-3 mt-5 md:mt-0">
            <h1 className=" w-full text-center leading-snug !text-3xl max-w-[563px] mx-auto lg:!text-4xl">
              Tüm E-ticaret Oyuncularına Uygun{" "}
              <span className="text-primary">
                Esnek ve Ölçeklenebilir Çözüm
              </span>
            </h1>
            <p className="mx-auto text-center text-secondary-foreground brightness-110 mb-6 mt-3">
              İster küçük bir e-ticaret işletmesi olun, ister çok kanallı satış
              yapan büyük bir marka…
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-[50px]">
              {audiences.map((audience, index) => (
                <div
                  key={index}
                  className="p-6 bg-foreground rounded-lg shadow hover:shadow-md transition"
                >
                  <div className="text-4xl mb-3">{audience.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {audience.title}
                  </h3>
                  <p className="text-secondary-foreground text-[13px]">
                    {audience.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
