"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";

const CATEGORY_EMOJI: Record<string, string> = {
  anime: "⚔️", manhwa: "📖", trending: "🔥", custom: "✨",
};
const CATEGORY_COLOR: Record<string, { bg: string; text: string }> = {
  anime:    { bg: "#ede9fe", text: "#6d28d9" },
  manhwa:   { bg: "#fde68a", text: "#1e1b4b" },
  trending: { bg: "#fce7f3", text: "#9d174d" },
  custom:   { bg: "#d1fae5", text: "#065f46" },
};

interface ProductCardProps {
  product: Product;
  waNumber: string;
  compact?: boolean; // mobile compact mode
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useToastStore((state) => state.addToast);

  const handleAddToCart = () => {
    addToCart(product);
    addToast(`${product.name} masuk keranjang!`, "success");
  };
  
  const emoji = CATEGORY_EMOJI[product.category] ?? "🎨";
  const color = CATEGORY_COLOR[product.category] ?? { bg: "#ede9fe", text: "#6d28d9" };

  return (
    <article
      className="product-card"
      id={`product-${product.id}`}
      style={compact ? { boxShadow: "4px 4px 0px 0px #1e1b4b" } : undefined}
    >
      {/* Image Area */}
      <Link
        href={`/produk/${product.id}`}
        style={{
          position: "relative",
          display: "block",
          width: "100%",
          aspectRatio: "1/1",
          backgroundColor: "#f5f3ff",
          borderBottom: "3px solid #1e1b4b",
          overflow: "hidden",
        }}
        aria-label={`Lihat detail ${product.name}`}
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={`Stiker ${product.name}`}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes={compact
              ? "(max-width: 768px) 50vw, 33vw"
              : "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            }
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center"
            style={{ width: "100%", height: "100%", gap: "0.25rem" }}
          >
            <span style={{ fontSize: compact ? "2rem" : "3rem" }}>🎨</span>
            {!compact && (
              <span
                className="font-pixel text-center"
                style={{ fontSize: "0.85rem", color: "#6d28d9", padding: "0 0.5rem" }}
              >
                {product.name.toUpperCase()}
              </span>
            )}
          </div>
        )}

        {/* Category badge */}
        <div style={{ position: "absolute", top: "0.4rem", left: "0.4rem" }}>
          <span
            className="badge"
            style={{
              backgroundColor: color.bg,
              color: color.text,
              fontSize: compact ? "0.65rem" : "0.9rem",
              padding: compact ? "0.1rem 0.35rem" : "0.2rem 0.75rem",
            }}
          >
            {emoji} {compact ? product.category.slice(0,3).toUpperCase() : product.category.toUpperCase()}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div
        className="flex flex-col"
        style={{
          padding: compact ? "0.5rem" : "1rem",
          gap: compact ? "0.25rem" : "0.75rem",
          flex: 1,
        }}
      >
        <h3
          className="font-pixel"
          style={{
            fontSize: compact ? "0.95rem" : "1.25rem",
            color: "#1e1b4b",
            lineHeight: 1.2,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name.toUpperCase()}
        </h3>

        {/* Description — hidden on compact mobile */}
        {!compact && (
          <p className="text-sm" style={{ color: "#4c1d95", lineHeight: 1.5, flex: 1 }}>
            {product.description}
          </p>
        )}

        {/* Price */}
        <div>
          <p style={{ fontSize: "0.65rem", fontWeight: 500, color: "#4c1d95" }}>Harga</p>
          <p
            className="font-pixel"
            style={{ fontSize: compact ? "1rem" : "1.4rem", color: "#6d28d9" }}
          >
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="btn-primary"
          aria-label={`Tambah ${product.name} ke keranjang`}
          id={`add-to-cart-${product.id}`}
          style={compact ? {
            fontSize: "0.85rem",
            padding: "0.4rem 0.5rem",
            gap: "0.25rem",
            width: "100%",
            cursor: "pointer",
          } : {
            width: "100%",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <span className="text-lg">🛒</span>
          {compact ? "TAMBAH" : "TAMBAH KE KERANJANG"}
        </button>
      </div>
    </article>
  );
}
