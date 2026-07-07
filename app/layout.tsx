import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Shopify — Commerce Platform for Every Business",
  description:
    "Start, run, and grow your business with Shopify. The all-in-one commerce platform to start, run, and grow a business.",
  keywords: ["ecommerce", "shopify", "online store", "sell online"],
  openGraph: {
    title: "Shopify — Commerce Platform for Every Business",
    description: "Start, run, and grow your business with Shopify.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-neutral-900 font-sans antialiased">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}