import type { Metadata, Viewport } from "next";
import { Inter, VT323 } from "next/font/google";
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Stickeru | Stiker Custom Anime & Manhwa Premium",
    template: "%s | Stickeru",
  },
  description:
    "Jual stiker custom anime, manhwa, dan trending berkualitas premium. Anti-air, tahan lama, glossy/matte/hologram. Order mudah via WhatsApp!",
  keywords: [
    "stiker custom", "stiker anime", "stiker manhwa", "jual stiker",
    "stiker jujutsu kaisen", "stiker solo leveling", "stiker anti-air", "stickeru",
    "stiker-shop", "stickeru shop", "stiker", "cetak stiker", "beli stiker",
    "stiker laptop", "stiker wa", "stiker murah",
  ],
  authors: [{ name: "Stickeru" }],
  creator: "Stickeru",
  openGraph: {
    title: "Stickeru | Stiker Custom Anime & Manhwa Premium",
    description: "Order stiker custom anime & manhwa favoritmu! Kualitas premium, anti-air, harga terjangkau.",
    type: "website",
    locale: "id_ID",
    siteName: "Stickeru",
    images: [
      {
        url: "/og-image.jpg", // Make sure Radithya puts an og-image.jpg in the public folder
        width: 1200,
        height: 630,
        alt: "Stickeru Banner",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#6d28d9",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${vt323.variable} antialiased`} style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        <ToastProvider />
        {/* Skip-to-content untuk aksesibilitas */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] btn-primary"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
