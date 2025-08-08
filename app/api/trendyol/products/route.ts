// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const { searchParams } = req.nextUrl;
//   const supplierId = searchParams.get("supplierId");
//   const apiKey = searchParams.get("apiKey");
//   const secret = searchParams.get("secret");

//   const url = `https://api.trendyol.com/sapigw/suppliers/${supplierId}/products`;

//   const res = await fetch(url, {
//     headers: {
//       Authorization: `Basic ${btoa(apiKey + ":" + secret)}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     return NextResponse.json({ error: "API hatası" }, { status: 500 });
//   }

//   const data = await res.json();
//   return NextResponse.json(data);
// }
