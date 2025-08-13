// app/layout.tsx
 
 import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Smarthub",
  description: "A ecommerce entegration app using Next.js and Prisma",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
