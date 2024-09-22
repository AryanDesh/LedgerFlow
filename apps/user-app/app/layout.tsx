import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../provider";
import { AppbarClient } from "../components/Appbar";
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LedgerFlow",
  description: "Wallet Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <AppbarClient />
        <body className={inter.className}>
          {children}
        </body>
      </Providers>
    </html>
  );
}
