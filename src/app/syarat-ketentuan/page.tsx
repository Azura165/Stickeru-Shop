import { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/supabase";
import Accordion from "@/components/Accordion";

export const revalidate = 3600; // cache 1 jam

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Baca syarat dan ketentuan penggunaan layanan Stickeru sebelum melakukan pembelian stiker custom anime & manhwa.",
};

// T&C content is now dynamically loaded from Supabase settings

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-white"
        style={{ borderBottom: "4px solid #1e1b4b" }}
      >
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6"
          style={{ height: "4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <span style={{ fontSize: "1.4rem" }}>←</span>
            <span className="font-pixel" style={{ fontSize: "1.2rem", color: "#1e1b4b" }}>
              🎀 {settings.store_name.toUpperCase()}
            </span>
          </Link>
        </div>
      </header>

      <main id="main-content" style={{ backgroundColor: "#f5f3ff", minHeight: "100vh" }}>
        {/* Hero */}
        <section
          className="py-12 px-4 text-center"
          style={{ backgroundColor: "#1e1b4b", borderBottom: "4px solid #6d28d9" }}
        >
          <div className="max-w-3xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <span
              className="badge"
              style={{ backgroundColor: "#fde68a", color: "#1e1b4b", alignSelf: "center" }}
            >
              📋 LEGAL
            </span>
            <h1
              className="font-pixel"
              style={{ fontSize: "clamp(2rem, 7vw, 3.5rem)", color: "#ffffff" }}
            >
              SYARAT &amp; KETENTUAN
            </h1>
            <p className="text-sm" style={{ color: "#c4b5fd" }}>
              Terakhir diperbarui: Mei 2025 · Harap baca dengan seksama sebelum melakukan pemesanan.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Intro card */}
            <div
              className="bg-white rounded-xl p-6"
              style={{ border: "3px solid #6d28d9", boxShadow: "5px 5px 0px 0px #6d28d9" }}
            >
              <p className="text-sm" style={{ color: "#1e1b4b", lineHeight: 1.7 }}>
                Selamat datang di <strong>{settings.store_name}</strong>! Dengan melakukan pemesanan di toko
                kami, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh syarat &amp; ketentuan
                yang berlaku di bawah ini. Jika ada pertanyaan, jangan ragu untuk menghubungi kami via WhatsApp.
              </p>
            </div>

            {/* Dynamic Content Accordion */}
            <div className="w-full">
              <Accordion text={settings.terms_and_conditions} />
            </div>

            {/* Contact CTA */}
            <div
              className="rounded-xl p-6 text-center"
              style={{ backgroundColor: "#1e1b4b", border: "3px solid #6d28d9", boxShadow: "5px 5px 0px 0px #6d28d9" }}
            >
              <p className="font-pixel" style={{ fontSize: "1.3rem", color: "#fde68a", marginBottom: "0.75rem" }}>
                ADA PERTANYAAN?
              </p>
              <p className="text-sm" style={{ color: "#c4b5fd", marginBottom: "1rem" }}>
                Tim kami siap membantu kamu melalui WhatsApp setiap hari pada jam operasional.
              </p>
              <a
                href={`https://wa.me/${settings.wa_number}?text=${encodeURIComponent("Halo! Saya mau bertanya soal syarat & ketentuan Stickeru 🎀")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
                style={{ fontSize: "1.1rem", display: "inline-flex", width: "auto" }}
              >
                💬 Hubungi Kami
              </a>
            </div>

            {/* Back link */}
            <div style={{ textAlign: "center", paddingBottom: "1rem" }}>
              <Link
                href="/"
                className="text-sm"
                style={{ color: "#6d28d9", textDecoration: "underline" }}
              >
                ← Kembali ke Beranda
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
