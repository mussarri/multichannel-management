"use client";
import { useEffect, useState } from "react";

export default function RotatingGradientMask() {
  const [angle, setAngle] = useState(90); // Başlangıç açısı

  useEffect(() => {
    let startTime = null;
    const duration = 20000; // 5 saniyede bir tam tur

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;

      // Geçen zamana göre açıyı hesapla ve 0-359 arasında tut
      const newAngle = (90 + (elapsedTime / duration) * 360) % 360;
      setAngle(newAngle);

      requestAnimationFrame(animate); // Sonraki frame'i iste
    };

    const animationFrameId = requestAnimationFrame(animate);

    // Komponent unmount edildiğinde animasyonu temizle
    return () => cancelAnimationFrame(animationFrameId);
  }, []); // Boş bağımlılık dizisi, sadece bir kere çalışmasını sağlar

  return (
    <div
      className="w-full h-full min-h-[200px] absolute bg-white max-w-full max-h-full"
      style={{
        maskImage: `linear-gradient(${angle}deg, black, transparent)`,
      }}
    />
  );
}
