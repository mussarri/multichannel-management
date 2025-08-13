export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Middleware her request'te çalışır
export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Giriş yapılmamışsa ve protected route ise -> login'e yönlendir
  if (!token && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url); // login sonrası geri dönmek için
    return NextResponse.redirect(loginUrl);
  }

  // Giriş yapılmışsa ve login sayfasına gidiyorsa -> ana sayfaya yönlendir
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected"],
};
