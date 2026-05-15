"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product, ProductCategory, CategoryTab } from "@/types";
import ProductCard from "./ProductCard";
import CategoryTabs from "./CategoryTabs";

const CATEGORIES: CategoryTab[] = [
  { key: "all",      label: "Semua",    emoji: "🎨" },
  { key: "anime",    label: "Anime",    emoji: "⚔️" },
  { key: "manhwa",   label: "Manhwa",   emoji: "📖" },
  { key: "trending", label: "Trending", emoji: "🔥" },
  { key: "custom",   label: "Custom",   emoji: "✨" },
];

const ITEMS_PER_PAGE = 6;

interface ProductGridProps {
  products: Product[];
  waNumber: string;
  featuredOnly?: boolean;
  serverPagination?: boolean;
}

function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Navigasi halaman produk"
      className="flex items-center justify-center gap-2"
      style={{ marginTop: "2rem", flexWrap: "wrap" }}
    >
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="font-pixel"
        style={{
          padding: "0.4rem 0.85rem",
          fontSize: "1rem",
          border: "3px solid #1e1b4b",
          borderRadius: "8px",
          backgroundColor: currentPage === 1 ? "#ede9fe" : "#ffffff",
          color: currentPage === 1 ? "#c4b5fd" : "#1e1b4b",
          boxShadow: currentPage === 1 ? "none" : "3px 3px 0 #1e1b4b",
          cursor: currentPage === 1 ? "default" : "pointer",
          transition: "transform 0.1s ease",
        }}
        aria-label="Halaman sebelumnya"
      >
        ← PREV
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className="font-pixel"
          style={{
            width: "2.4rem",
            height: "2.4rem",
            fontSize: "1.1rem",
            border: "3px solid #1e1b4b",
            borderRadius: "8px",
            backgroundColor: page === currentPage ? "#6d28d9" : "#ffffff",
            color: page === currentPage ? "#ffffff" : "#1e1b4b",
            boxShadow: page === currentPage ? "3px 3px 0 #1e1b4b" : "2px 2px 0 #1e1b4b",
            cursor: page === currentPage ? "default" : "pointer",
            transform: page === currentPage ? "translateY(-2px) translateX(-1px)" : "none",
            transition: "transform 0.1s ease",
          }}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="font-pixel"
        style={{
          padding: "0.4rem 0.85rem",
          fontSize: "1rem",
          border: "3px solid #1e1b4b",
          borderRadius: "8px",
          backgroundColor: currentPage === totalPages ? "#ede9fe" : "#ffffff",
          color: currentPage === totalPages ? "#c4b5fd" : "#1e1b4b",
          boxShadow: currentPage === totalPages ? "none" : "3px 3px 0 #1e1b4b",
          cursor: currentPage === totalPages ? "default" : "pointer",
          transition: "transform 0.1s ease",
        }}
        aria-label="Halaman berikutnya"
      >
        NEXT →
      </button>
    </nav>
  );
}

export default function ProductGrid({ products, waNumber, featuredOnly = false, serverPagination = false }: ProductGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // If server pagination, read category from URL, else internal state
  const urlCategory = searchParams.get("category") as ProductCategory | null;
  const initialCategory = serverPagination ? (urlCategory || "all") : "all";
  
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCompact, setIsCompact] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Detect mobile viewport for compact card
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsCompact(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsCompact(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // If serverPagination is true, products are already paginated and filtered
  const filtered = featuredOnly 
    ? products.slice(0, 6) 
    : (serverPagination ? products : (activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory)));

  const totalPages = Math.ceil((serverPagination ? products.length : filtered.length) / ITEMS_PER_PAGE);
  const paginated = featuredOnly || serverPagination
    ? filtered 
    : filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCategoryChange = useCallback((key: ProductCategory) => {
    if (serverPagination) {
      router.push(`/koleksi?category=${key}&page=1`);
    } else {
      setActiveCategory(key);
      setCurrentPage(1);
    }
  }, [serverPagination, router]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll ke atas section produk
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="koleksi"
      className="py-16 px-4"
      style={{ backgroundColor: "#ede9fe" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {/* Header (Hide if serverPagination) */}
        {!serverPagination && (
          <div
            className="flex flex-col items-center text-center mb-10"
            style={{ gap: "1rem" }}
          >
            <span className="badge" style={{ backgroundColor: "#c4b5fd", color: "#1e1b4b" }}>
              🎀 KOLEKSI TERBARU
            </span>
            <h2 className="font-pixel" style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", color: "#1e1b4b" }}>
              PILIH STIKERMU
            </h2>
            <p className="text-sm" style={{ color: "#4c1d95", maxWidth: "28rem" }}>
              Semua stiker dicetak dengan tinta premium, anti-air, dan bisa dipakai di laptop, botol minum, atau mana aja!
            </p>
          </div>
        )}

        {/* Category Tabs (Hide if featuredOnly or serverPagination) */}
        {!featuredOnly && !serverPagination && (
            <div
              className="flex flex-wrap justify-center mb-8"
              style={{ gap: "0.5rem" }}
              role="tablist"
              aria-label="Filter kategori stiker"
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    role="tab"
                    aria-selected={isActive}
                    id={`tab-${cat.key}`}
                    onClick={() => handleCategoryChange(cat.key)}
                    className="font-pixel"
                    style={{
                      padding: "0.4rem 0.85rem",
                      fontSize: isCompact ? "0.9rem" : "1.1rem",
                      border: "3px solid #1e1b4b",
                      borderRadius: "8px",
                      backgroundColor: isActive ? "#6d28d9" : "#ffffff",
                      color: isActive ? "#ffffff" : "#1e1b4b",
                      boxShadow: isActive ? "4px 4px 0px 0px #1e1b4b" : "3px 3px 0px 0px #1e1b4b",
                      transform: isActive ? "translateY(-2px)" : "none",
                      cursor: "pointer",
                      transition: "transform 0.1s ease, box-shadow 0.1s ease",
                    }}
                  >
                    {cat.emoji} {cat.label.toUpperCase()}
                  </button>
                );
              })}
            </div>
        )}

        {/* Count & Page Info (Hide if featuredOnly or serverPagination) */}
        {!featuredOnly && !serverPagination && filtered.length > 0 && (
          <p
            className="text-sm text-center mb-4"
            style={{ color: "#6d28d9" }}
          >
            Menampilkan{" "}
            <strong>{(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</strong>
            {" "}dari <strong>{filtered.length}</strong> produk
            {totalPages > 1 && ` · Halaman ${currentPage}/${totalPages}`}
          </p>
        )}

        {/* Product Grid — 2 cols mobile, 3 cols desktop */}
        {paginated.length > 0 ? (
          <div
            id="product-grid-inner"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {/* Desktop override via style tag */}
            <style>{`
              @media (min-width: 1024px) {
                #product-grid-inner {
                  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
                  gap: 1.5rem !important;
                }
              }
              @media (min-width: 640px) and (max-width: 1023px) {
                #product-grid-inner {
                  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                  gap: 1rem !important;
                }
              }
            `}</style>
            {paginated.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                waNumber={waNumber}
                compact={isCompact}
              />
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col items-center"
            style={{
              padding: "5rem 0",
              border: "3px solid #1e1b4b",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              boxShadow: "6px 6px 0 #1e1b4b",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "3.5rem" }}>🎨</span>
            <p className="font-pixel" style={{ fontSize: "1.5rem", color: "#1e1b4b" }}>COMING SOON!</p>
            <p className="text-sm" style={{ color: "#6d28d9" }}>Stiker kategori ini lagi dalam persiapan</p>
          </div>
        )}

        {/* Pagination Client (Hide if serverPagination or featuredOnly) */}
        {!featuredOnly && !serverPagination && (
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* CTA "Lihat Semua Koleksi" (Tampil hanya jika featuredOnly) */}
        {featuredOnly ? (
          <div className="flex justify-center mt-12 w-full">
            <a 
              href="/koleksi" 
              className="font-pixel text-lg md:text-xl whitespace-nowrap px-12 py-4 w-fit mx-auto text-center rounded-2xl block transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#1e1b4b]"
              style={{
                backgroundColor: "#fde68a",
                color: "#1e1b4b",
                border: "4px solid #1e1b4b",
                boxShadow: "5px 5px 0px 0px #1e1b4b",
              }}
            >
              🌟 LIHAT SEMUA KOLEKSI STIKER
            </a>
          </div>
        ) : (
          <div className="text-center" style={{ marginTop: "2rem" }}>
            <p className="text-sm" style={{ color: "#4c1d95" }}>
              Nggak nemuin yang kamu mau?{" "}
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Halo kak! Saya mau request stiker custom nih 🎨")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#6d28d9", fontWeight: 600, textDecoration: "underline" }}
              >
                Request Custom Order via WA →
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
