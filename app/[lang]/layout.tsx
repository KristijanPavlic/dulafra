import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Dulafra foto corner",
  description: "Dulafra foto corner",
  authors: { name: "Kristijan Pavlic Tumpa" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="hr">
        <body className={`${montserrat.className} bg-[#FFF6EE]`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
