import Image from "next/image";
import { SiteSettings } from "@/types";

interface HeroSectionProps {
  settings: SiteSettings;
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const waLink = `https://wa.me/${settings.wa_number}?text=${encodeURIComponent(
    "Halo kak! Saya mau liat-liat koleksi stiker nih 🎀"
  )}`;

  return (
    <section
      className="relative overflow-hidden pattern-dots"
      style={{ backgroundColor: "#f5f3ff", minHeight: "90vh" }}
      aria-label="Hero section"
    >
      {/* Dekorasi background */}
      <div
        aria-hidden="true"
        className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-30"
        style={{ backgroundColor: "#c4b5fd" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-20 left-10 w-20 h-20 rotate-45 opacity-20"
        style={{ backgroundColor: "#fde68a", border: "3px solid #1e1b4b" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* ——— LEFT: Content ——— */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="badge" style={{ backgroundColor: "#fde68a", color: "#1e1b4b" }}>
              ✨ CUSTOM ORDER AVAILABLE
            </span>
            <span className="badge" style={{ backgroundColor: "#ede9fe", color: "#6d28d9" }}>
              🎀 ANIME × MANHWA
            </span>
          </div>

          <h1 className="font-pixel leading-tight">
            <span className="block" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", color: "#1e1b4b" }}>
              STIKER
            </span>
            <span className="block" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", color: "#6d28d9" }}>
              FAVORITMU
            </span>
            <span className="block" style={{ fontSize: "clamp(2rem, 6vw, 4rem)", color: "#1e1b4b" }}>
              ADA DI SINI!
            </span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed" style={{ maxWidth: "28rem", color: "#4c1d95" }}>
            {settings.tagline}. Glossy, matte, hologram — semua ada!
            Order mudah langsung via WhatsApp, dikirim ke seluruh Indonesia. 📦
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a href="#koleksi" className="btn-primary" style={{ textAlign: "center" }}>
              🛍️ LIHAT KOLEKSI
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ textAlign: "center" }}
            >
              💬 ORDER SEKARANG
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-2 flex-wrap">
            {[
              { value: "500+", label: "Pelanggan Happy" },
              { value: "50+",  label: "Desain Stiker" },
              { value: "⭐ 4.9", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-pixel" style={{ fontSize: "1.5rem", color: "#6d28d9" }}>
                  {stat.value}
                </span>
                <span className="text-xs font-medium" style={{ color: "#4c1d95" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ——— RIGHT: Hero Image ——— */}
        <div className="flex justify-center lg:justify-end">
          {/* Wrapper HARUS position: relative untuk next/image fill */}
          <div
            className="neo-hover"
            style={{
              position: "relative",       /* ← FIX: required for Image fill */
              width: "min(440px, 90vw)",
              height: "min(440px, 90vw)",
              borderRadius: "1rem",
              overflow: "hidden",
              border: "4px solid #1e1b4b",
              boxShadow: "10px 10px 0px 0px #1e1b4b",
              backgroundColor: "#ede9fe",
            }}
          >
            <Image
              src="/hero_sticker_mascot_1778758303433.png"
              alt={`Maskot ${settings.store_name} — anime girl dengan stiker`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 90vw, 440px"
            />
          </div>

          {/* Floating badges */}
          <div
            aria-hidden="true"
            className="absolute font-pixel flex items-center justify-center rounded-lg"
            style={{
              top: "-1rem",
              right: "-1rem",
              width: "3rem",
              height: "3rem",
              fontSize: "1.5rem",
              backgroundColor: "#fde68a",
              border: "3px solid #1e1b4b",
              boxShadow: "3px 3px 0 #1e1b4b",
              rotate: "12deg",
            }}
          >
            ⭐
          </div>
        </div>
      </div>

      <div className="section-divider" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}
