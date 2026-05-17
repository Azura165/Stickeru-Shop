import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import FloatingWAButton from "@/components/FloatingWAButton";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";
import { Metadata } from "next";

// ISR: cache per-produk 1 jam
export const revalidate = 3600;

async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_available", true)
    .single();
  if (error || !data) return null;
  return data as Product;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "Produk tidak ditemukan" };

  return {
    title: `${product.name} | Stickeru`,
    description: product.description || `Beli stiker ${product.name} di Stickeru. Kualitas premium, anti-air, harga terjangkau!`,
    openGraph: {
      title: `${product.name} | Stickeru`,
      description: product.description || `Stiker ${product.name} premium dari Stickeru`,
      images: product.image_url ? [{ url: product.image_url, width: 800, height: 800, alt: product.name }] : [],
    },
  };
}

const CATEGORY_LABELS: Record<string, { label: string; emoji: string; color: string }> = {
  anime:    { label: "Anime",    emoji: "⚔️", color: "#e9d5ff" },
  manhwa:   { label: "Manhwa",   emoji: "📖", color: "#fce7f3" },
  trending: { label: "Trending", emoji: "🔥", color: "#fde68a" },
  custom:   { label: "Custom",   emoji: "✨", color: "#d1fae5" },
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, settings] = await Promise.all([
    getProductById(id),
    getSiteSettings(),
  ]);

  if (!product) notFound();

  const catInfo = CATEGORY_LABELS[product.category] ?? { label: product.category, emoji: "🎨", color: "#e9d5ff" };

  const waMessage = product.whatsapp_text
    ? product.whatsapp_text
    : `Halo Stickeru! 🎀 Saya mau order:\n\n1x ${product.name} (${formatPrice(product.price)})\n\nMohon info pembayaran dan pengirimannya ya kak!`;

  const waLink = `https://wa.me/${settings.wa_number}?text=${encodeURIComponent(waMessage)}`;

  return (
    <>
      <Navbar settings={settings} />
      <main
        className="min-h-screen"
        style={{ backgroundColor: "#f5f3ff", paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-sm font-semibold flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-purple-700 transition-colors" style={{ color: "#6d28d9" }}>Beranda</Link>
            <span style={{ color: "#9ca3af" }}>→</span>
            <Link href="/koleksi" className="hover:text-purple-700 transition-colors" style={{ color: "#6d28d9" }}>Koleksi</Link>
            <span style={{ color: "#9ca3af" }}>→</span>
            <span style={{ color: "#1e1b4b" }} className="truncate max-w-[200px]">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Gambar Produk */}
            <div className="flex flex-col gap-4">
              <div
                className="w-full aspect-square bg-white rounded-3xl overflow-hidden flex items-center justify-center"
                style={{ border: "5px solid #1e1b4b", boxShadow: "10px 10px 0 0 #1e1b4b" }}
              >
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                ) : (
                  <span className="text-8xl">🎨</span>
                )}
              </div>

              {/* Share Link */}
              <p className="text-xs font-semibold text-center" style={{ color: "#9ca3af" }}>
                Suka stiker ini? Share ke temen kamu! 🎀
              </p>
            </div>

            {/* Info Produk */}
            <div className="flex flex-col gap-5">
              {/* Badge kategori */}
              <span
                className="font-pixel text-sm px-4 py-2 rounded-full self-start"
                style={{ backgroundColor: catInfo.color, border: "3px solid #1e1b4b", color: "#1e1b4b", boxShadow: "3px 3px 0 0 #1e1b4b" }}
              >
                {catInfo.emoji} {catInfo.label.toUpperCase()}
              </span>

              {/* Nama Produk */}
              <h1
                className="font-pixel leading-tight"
                style={{ fontSize: "clamp(1.6rem, 5vw, 2.5rem)", color: "#1e1b4b" }}
              >
                {product.name}
              </h1>

              {/* Harga */}
              <div
                className="inline-block px-6 py-3 rounded-2xl self-start"
                style={{ backgroundColor: "#fde68a", border: "4px solid #1e1b4b", boxShadow: "6px 6px 0 0 #1e1b4b" }}
              >
                <span className="font-pixel text-3xl" style={{ color: "#1e1b4b" }}>
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Deskripsi */}
              {product.description && (
                <div
                  className="p-5 rounded-2xl"
                  style={{ border: "3px solid #1e1b4b", backgroundColor: "#ffffff", boxShadow: "4px 4px 0 0 #1e1b4b" }}
                >
                  <h2 className="font-pixel text-base mb-2" style={{ color: "#1e1b4b" }}>📋 DESKRIPSI</h2>
                  <p className="font-medium text-sm leading-relaxed" style={{ color: "#4c1d95" }}>
                    {product.description}
                  </p>
                </div>
              )}

              {/* Keunggulan */}
              <div
                className="p-5 rounded-2xl"
                style={{ border: "3px solid #1e1b4b", backgroundColor: "#f5f3ff", boxShadow: "4px 4px 0 0 #1e1b4b" }}
              >
                <h2 className="font-pixel text-base mb-3" style={{ color: "#1e1b4b" }}>✨ KEUNGGULAN</h2>
                <ul className="flex flex-col gap-2">
                  {["💧 Anti-air & tahan lama", "🖨️ Tinta premium, warna tajam", "✂️ Bisa pilih glossy/matte", "📦 Dikemas rapi & aman"].map((item) => (
                    <li key={item} className="font-semibold text-sm flex items-center gap-2" style={{ color: "#4c1d95" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 mt-2">
                {/* Order via WA */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full font-pixel text-xl py-4 rounded-2xl text-center flex items-center justify-center gap-3 transition-all hover:-translate-y-2 cursor-pointer"
                  style={{ backgroundColor: "#10b981", color: "white", border: "4px solid #1e1b4b", boxShadow: "6px 6px 0 0 #1e1b4b" }}
                >
                  💬 ORDER VIA WHATSAPP
                </a>

                {/* Tambah ke Keranjang */}
                <AddToCartButton product={product} />
              </div>

              {/* Info pengiriman */}
              <p className="text-xs font-semibold text-center" style={{ color: "#9ca3af" }}>
                🚀 Ongkos kirim dikalkulasi oleh admin · Proses H+1 setelah pembayaran
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link
              href="/koleksi"
              className="font-pixel px-8 py-4 rounded-xl inline-block transition-all hover:-translate-y-1 cursor-pointer"
              style={{ backgroundColor: "#e9d5ff", border: "3px solid #1e1b4b", color: "#1e1b4b", boxShadow: "5px 5px 0 0 #1e1b4b" }}
            >
              ← LIHAT KOLEKSI LAINNYA
            </Link>
          </div>
        </div>
      </main>
      <Footer settings={settings} />
      <FloatingWAButton waNumber={settings.wa_number} />
      <CartSidebar />
    </>
  );
}
