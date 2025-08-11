/* eslint-disable @typescript-eslint/no-unused-vars */
import Gib from "../gib/Gib";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
  } catch (err) {
    console.error("Hata:", err);
  }
  return NextResponse.json({});
}
