import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["cyrillic"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "The board world",
  description: "Мир игр для ваших веселых вечеров!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <main className="min-h-screen bg-linear-to-r from-[#FDCBF1] to-[#E6DEE9]">
          {children}
        </main>
      </body>
    </html>
  );
}
