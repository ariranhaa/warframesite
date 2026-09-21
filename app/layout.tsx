import type { Metadata } from "next";
import { Oxanium, Rajdhani } from "next/font/google";

import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: {
    default: "Warframe Builder",
    template: "%s | Warframe Builder",
  },
  description: "Crie e organize suas builds de Warframe",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${rajdhani.variable} ${oxanium.variable} min-h-screen bg-slate-900`}
      >
        <div className="min-h-screen flex flex-col px-8">
          <Header />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
