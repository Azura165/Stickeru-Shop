import { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/supabase";
import { getApprovedReviews } from "@/lib/supabase";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Review Pelanggan",
  description:
    "Baca ulasan asli dari pelanggan Stickeru. Ribuan pelanggan puas dengan kualitas stiker anime & manhwa premium kami.",
};

function StarRating({ rating, size = "1rem" }: { rating: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < rating ? "#f59e0b" : "#d1d5db", fontSize: size }}>
          ★
        </span>
      ))}
    </div>
  );
}

const RATING_DIST = [
  { stars: 5, pct: 87, count: "174" },
  { stars: 4, pct: 9,  count: "18" },
  { stars: 3, pct: 3,  count: "6" },
  { stars: 2, pct: 1,  count: "2" },
  { stars: 1, pct: 0,  count: "0" },
];

export default async function ReviewsPage() {
  const [settings, reviews] = await Promise.all([
    getSiteSettings(),
    getApprovedReviews(),
  ]);

  const waLink = `https://wa.me/${settings.wa_number}`;

  return (
    <>
      {/* Sticky back nav */}
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
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: "1rem", padding: "0.4rem 1rem" }}
          >
            💬 Order WA
          </a>
        </div>
      </header>

      <main id="main-content" style={{ backgroundColor: "#f5f3ff", minHeight: "100vh" }}>
        {/* Hero Section */}
        <section
          className="py-12 px-4 text-center"
          style={{ backgroundColor: "#1e1b4b", borderBottom: "4px solid #6d28d9" }}
        >
          <div className="max-w-3xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <span
              className="badge"
              style={{ backgroundColor: "#6d28d9", color: "#fde68a", alignSelf: "center" }}
            >
              💬 KATA PELANGGAN KAMI
            </span>
            <h1
              className="font-pixel"
              style={{ fontSize: "clamp(2rem, 8vw, 4rem)", color: "#ffffff", lineHeight: 1.1 }}
            >
              REVIEW PELANGGAN
            </h1>
            <p className="text-sm" style={{ color: "#c4b5fd" }}>
              Semua review asli dari pelanggan yang sudah beli & puas dengan produk Stickeru 🎀
            </p>

            {/* Summary stats */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "0.5rem",
              }}
            >
              <div style={{ display: "flex", gap: "3px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: "#f59e0b", fontSize: "1.5rem" }}>★</span>
                ))}
              </div>
              <span className="font-pixel" style={{ fontSize: "2rem", color: "#fde68a" }}>
                4.9 / 5.0
              </span>
              <span style={{ color: "#c4b5fd", fontSize: "0.9rem" }}>dari 200+ ulasan</span>
            </div>
          </div>
        </section>

        {/* Rating breakdown + Reviews grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "2rem",
              }}
              id="reviews-layout"
            >
              {/* Rating Distribution sidebar */}
              <div
                className="bg-white rounded-xl p-6"
                style={{
                  border: "3px solid #1e1b4b",
                  boxShadow: "6px 6px 0px 0px #1e1b4b",
                  alignSelf: "start",
                }}
                id="rating-sidebar"
              >
                <h2 className="font-pixel text-xl mb-4" style={{ color: "#1e1b4b" }}>
                  📊 DISTRIBUSI RATING
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {RATING_DIST.map((r) => (
                    <div key={r.stars} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1e1b4b", minWidth: "1.2rem" }}>
                        {r.stars}★
                      </span>
                      <div
                        style={{
                          flex: 1,
                          height: "10px",
                          backgroundColor: "#ede9fe",
                          borderRadius: "5px",
                          border: "2px solid #1e1b4b",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${r.pct}%`,
                            backgroundColor: r.stars >= 4 ? "#6d28d9" : r.stars === 3 ? "#a78bfa" : "#fca5a5",
                            borderRadius: "3px",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "#6d28d9", minWidth: "2rem", textAlign: "right" }}>
                        {r.count}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Info CTA */}
                <div
                  className="rounded-xl p-4 mt-6"
                  style={{ backgroundColor: "#ede9fe", border: "2px solid #6d28d9" }}
                >
                  <p
                    className="text-sm font-bold mb-2"
                    style={{ color: "#1e1b4b" }}
                  >
                    ✅ Ingin menitipkan review?
                  </p>
                  <p className="text-xs" style={{ color: "#4c1d95", lineHeight: 1.5 }}>
                    Kirim foto produk + ulasan kamu via WhatsApp. Admin kami akan verifikasi
                    dan menampilkannya di sini.
                  </p>
                  <a
                    href={`${waLink}?text=${encodeURIComponent("Halo! Saya mau kirim review produk Stickeru 🎀")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-wa"
                    style={{ fontSize: "1rem", marginTop: "0.75rem" }}
                  >
                    📸 Kirim Review
                  </a>
                </div>
              </div>

              {/* Reviews Grid */}
              <div id="reviews-list">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                    gap: "1rem",
                  }}
                  id="reviews-cards"
                >
                  {reviews.map((r) => (
                    <div
                      key={r.id}
                      className="bg-white rounded-xl"
                      style={{
                        border: "3px solid #1e1b4b",
                        boxShadow: "5px 5px 0px 0px #1e1b4b",
                        padding: "1.25rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      }}
                    >
                      {/* Top row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div
                            className="flex items-center justify-center rounded-lg flex-shrink-0"
                            style={{
                              width: "2.5rem",
                              height: "2.5rem",
                              fontSize: "1.25rem",
                              backgroundColor: "#ede9fe",
                              border: "2px solid #1e1b4b",
                            }}
                          >
                            {r.avatar_emoji}
                          </div>
                          <div>
                            <p className="font-bold text-sm" style={{ color: "#1e1b4b" }}>{r.name}</p>
                            <p style={{ fontSize: "0.7rem", color: "#6d28d9" }}>📍 {r.location}</p>
                          </div>
                        </div>
                        <StarRating rating={r.rating} size="1.1rem" />
                      </div>

                      {/* Quote */}
                      <p
                        className="text-sm"
                        style={{ color: "#1e1b4b", lineHeight: 1.6 }}
                      >
                        &ldquo;{r.text}&rdquo;
                      </p>

                      {/* Photo Evidence */}
                      {r.image_url && (
                        <div style={{ marginTop: "0.25rem", border: "2px solid #1e1b4b", borderRadius: "8px", overflow: "hidden" }}>
                          <img 
                            src={r.image_url} 
                            alt={`Review ${r.name}`} 
                            style={{ width: "100%", height: "auto", maxHeight: "300px", objectFit: "cover" }} 
                          />
                        </div>
                      )}

                      {/* Product badge */}
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "#ede9fe",
                          color: "#6d28d9",
                          fontSize: "0.7rem",
                          alignSelf: "flex-start",
                        }}
                      >
                        🎨 {r.product}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to store CTA */}
        <section
          className="py-10 px-4 text-center"
          style={{ backgroundColor: "#1e1b4b", borderTop: "4px solid #6d28d9" }}
        >
          <div className="max-w-2xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", alignItems: "center" }}>
            <p className="font-pixel" style={{ fontSize: "1.5rem", color: "#fde68a" }}>
              SIAP JADI PELANGGAN PUAS BERIKUTNYA?
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/#koleksi" className="btn-secondary" style={{ fontSize: "1.1rem" }}>
                🎨 Lihat Koleksi
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
                style={{ fontSize: "1.1rem", width: "auto" }}
              >
                💬 Order Sekarang
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Responsive grid CSS */}
      <style>{`
        @media (min-width: 768px) {
          #reviews-layout {
            grid-template-columns: 280px 1fr !important;
          }
          #reviews-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (min-width: 1024px) {
          #reviews-cards {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </>
  );
}
