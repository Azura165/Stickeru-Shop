import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Halaman Tidak Ditemukan",
  description: "Ups! Halaman yang kamu cari tidak ada. Kembali ke toko stiker Stickeru.",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      style={{
        minHeight: "100vh",
        backgroundColor: "#1e1b4b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        gap: "1.5rem",
      }}
    >
      {/* Decorative pixel art */}
      <div
        className="font-pixel"
        style={{ fontSize: "clamp(5rem, 20vw, 10rem)", color: "#6d28d9", lineHeight: 1 }}
      >
        404
      </div>

      <div
        style={{
          backgroundColor: "#fde68a",
          border: "4px solid #ffffff",
          boxShadow: "8px 8px 0px 0px #ffffff",
          borderRadius: "12px",
          padding: "1.5rem 2rem",
          maxWidth: "28rem",
        }}
      >
        <p className="font-pixel" style={{ fontSize: "1.5rem", color: "#1e1b4b", marginBottom: "0.5rem" }}>
          🎀 HALAMAN TIDAK ADA!
        </p>
        <p className="text-sm" style={{ color: "#4c1d95", lineHeight: 1.6 }}>
          Ups! Sepertinya stiker yang kamu cari sudah terbang entah ke mana.
          Yuk kembali ke toko dan temukan koleksi keren lainnya!
        </p>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn-primary" style={{ fontSize: "1.1rem" }}>
          🏠 Ke Beranda
        </Link>
        <Link href="/#koleksi" className="btn-secondary" style={{ fontSize: "1.1rem" }}>
          🎨 Lihat Koleksi
        </Link>
      </div>
    </main>
  );
}
