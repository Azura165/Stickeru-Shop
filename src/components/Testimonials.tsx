"use client";

import Link from "next/link";
import { Testimonial } from "@/types";
import { STATIC_REVIEWS } from "@/lib/utils";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < rating ? "#f59e0b" : "#e5e7eb", fontSize: "1rem" }}>
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <Link
      href="/reviews"
      aria-label={`Baca review dari ${t.name}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        className="bg-white rounded-xl flex flex-col review-card"
        style={{
          border: "3px solid #1e1b4b",
          boxShadow: "4px 4px 0px 0px #1e1b4b",
          padding: "0.85rem",
          gap: "0.5rem",
          cursor: "pointer",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          height: "100%",
        }}
      >
        {/* Rating */}
        <StarRating rating={t.rating} />

        {/* Quote */}
        <p
          className="text-sm"
          style={{
            color: "#1e1b4b",
            lineHeight: 1.5,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          } as React.CSSProperties}
        >
          &ldquo;{t.text}&rdquo;
        </p>

        {/* Product badge */}
        <span
          className="badge"
          style={{
            backgroundColor: "#ede9fe",
            color: "#6d28d9",
            fontSize: "0.65rem",
            alignSelf: "flex-start",
            padding: "0.1rem 0.4rem",
          }}
        >
          🎨 {t.product.length > 12 ? t.product.slice(0, 12) + "…" : t.product}
        </span>

        {/* Author */}
        <div
          className="flex items-center"
          style={{ gap: "0.5rem", borderTop: "2px solid #ede9fe", paddingTop: "0.5rem" }}
        >
          <div
            className="flex items-center justify-center rounded-lg flex-shrink-0"
            style={{
              width: "2rem",
              height: "2rem",
              fontSize: "1rem",
              backgroundColor: "#ede9fe",
              border: "2px solid #1e1b4b",
            }}
          >
            {t.avatar_emoji}
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: "#1e1b4b", fontSize: "0.8rem" }}>
              {t.name}
            </p>
            <p style={{ color: "#6d28d9", fontSize: "0.65rem" }}>📍 {t.location}</p>
          </div>
        </div>

        {/* "Lihat semua" hint — visible on mobile tap */}
        <p
          className="text-xs"
          style={{ color: "#a78bfa", textAlign: "center", marginTop: "0.25rem", fontSize: "0.65rem" }}
        >
          Tap untuk lihat semua review →
        </p>
      </div>
    </Link>
  );
}

export default function Testimonials() {
  // Only show first 4 on homepage
  const previewReviews = STATIC_REVIEWS.slice(0, 4);

  return (
    <section className="py-16 px-4" style={{ backgroundColor: "#f5f3ff" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10" style={{ gap: "1rem" }}>
          <span className="badge" style={{ backgroundColor: "#c4b5fd", color: "#1e1b4b" }}>
            💬 KATA MEREKA
          </span>
          <h2 className="font-pixel" style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", color: "#1e1b4b" }}>
            REVIEW PELANGGAN
          </h2>
          <div className="flex items-center" style={{ gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <div className="flex" style={{ gap: "2px" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: "#f59e0b", fontSize: "1.3rem" }}>★</span>
              ))}
            </div>
            <span className="font-pixel" style={{ fontSize: "1.5rem", color: "#6d28d9" }}>4.9 / 5.0</span>
            <span className="text-sm" style={{ color: "#4c1d95" }}>dari 200+ review</span>
          </div>
        </div>

        {/* Testimonial Grid — 2 cols mobile, 4 cols desktop */}
        <div
          id="testimonials-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "0.75rem",
          }}
        >
          {previewReviews.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>

        {/* CTA: Lihat Semua Review */}
        <div className="text-center mt-8">
          <Link
            href="/reviews"
            className="btn-secondary"
            style={{ fontSize: "1.1rem" }}
          >
            📋 LIHAT SEMUA REVIEW →
          </Link>
        </div>
      </div>

      {/* Responsive grid + hover CSS */}
      <style>{`
        @media (min-width: 1024px) {
          #testimonials-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 1.25rem !important;
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          #testimonials-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 1rem !important;
          }
        }
        .review-card:hover {
          transform: translateY(-4px) translateX(-2px);
          box-shadow: 8px 8px 0px 0px #1e1b4b !important;
        }
        .review-card:active {
          transform: translateY(2px) translateX(2px);
          box-shadow: 1px 1px 0px 0px #1e1b4b !important;
        }
      `}</style>
    </section>
  );
}
