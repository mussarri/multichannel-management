/* eslint-disable @typescript-eslint/no-unused-vars */
import Gib from "./Gib";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const gib = new Gib("invoice", false, "VKN_TCKN", "SIFRE");

    // 1. Giriş
    await gib.login();
    console.log("Giriş başarılı, token:", gib.getToken());

    // 2. Kullanıcı bilgileri
    const userData = await gib.getUserData();
    console.log("Kullanıcı:", userData);

    // 3. Fatura listesi
    const invoices = await gib.getAll("01/01/2025", "10/08/2025");
    console.log("Taslak faturalar:", invoices);

    // 4. Taslak oluşturma
    const draft = await gib.createDraft({
      // Burada GİB API formatına göre fatura içeriği doldurulur
    });
    console.log("Taslak oluşturuldu:", draft);

    // 5. Taslak imzalama

    // 6. Çıkış
    const logoutRes = await gib.logout();
    console.log("Çıkış:", logoutRes);
  } catch (err) {
    console.error("Hata:", err);
  }
  return NextResponse.json({});
}
