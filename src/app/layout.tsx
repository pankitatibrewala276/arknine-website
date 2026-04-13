import type { Metadata } from "next";
import { Prata, Anton } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const prata = Prata({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-prata",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Arknine Technologies — The Operating System for Textile Trade",
    template: "%s | Arknine Technologies",
  },
  description:
    "Arknine Technologies is a publicly listed, technology-driven textile solutions company transforming global textile sourcing, financing, and operations.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Arknine Technologies",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${prata.variable} ${anton.variable} h-full`}>
      <body className="min-h-full flex flex-col font-body text-charcoal bg-white-bg antialiased" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1 pt-[60px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
