import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteViewport } from "./viewport";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingContactWidget } from "@/components/FloatingContactWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = siteViewport;

export const metadata: Metadata = {
  title: "Sujet Marina Hotel Da Nang | Guest Review Hub",
  description:
    "Share your authentic experience at Sujet Marina Hotel Da Nang By Haviland on Google, Tripadvisor, Booking.com, or Agoda.",
  metadataBase: new URL("https://havilandhouse-reviews.vercel.app"),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Sujet Marina Hotel Da Nang — How Was Your Stay?",
    description:
      "Leave a verified guest review on Google, Tripadvisor, Booking.com, or Agoda.",
    url: "https://havilandhouse-reviews.vercel.app",
    siteName: "Haviland House Reviews",
    images: [
      {
        url: "/sujet-marina-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Sujet Marina Hotel Da Nang By Haviland",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getHotelConfig } = await import('@/config/hotels');
  const hotel = getHotelConfig('sujet-marina');

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="antialiased">
        <LanguageProvider>
          <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F8F7F4] text-neutral-900">
            <Navbar hotel={hotel} />
            <main className="w-full flex-1">{children}</main>
            <Footer hotel={hotel} />
          </div>
          <FloatingContactWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
