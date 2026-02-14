// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SearchProvider } from "@/context/SearchContext"; // 1. Import this
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EasySub | Premium Subscriptions",
  description: "Buy Netflix, Spotify and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <CartProvider>
          <SearchProvider>
            <Navbar />
            {children}
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}