"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CategoryTab } from "@/types";

const CATEGORIES: CategoryTab[] = [
  { key: "all",      label: "Semua",    emoji: "🎨" },
  { key: "anime",    label: "Anime",    emoji: "⚔️" },
  { key: "manhwa",   label: "Manhwa",   emoji: "📖" },
  { key: "trending", label: "Trending", emoji: "🔥" },
  { key: "custom",   label: "Custom",   emoji: "✨" },
];

export default function CategoryTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get("category") || "all";

  const handleCategoryClick = (cat: string) => {
    // The user requested to use exactly router.replace('?category=${cat}&page=1', { scroll: false })
    if (cat === "all") {
      router.replace(`?page=1`, { scroll: false });
    } else {
      router.replace(`?category=${cat}&page=1`, { scroll: false });
    }
  };

  return (
    <div
      className="flex flex-wrap justify-center mb-4"
      style={{ gap: "0.5rem" }}
      role="tablist"
      aria-label="Filter kategori stiker"
    >
      {CATEGORIES.map((cat) => {
        const isActive = currentCategory === cat.key;
        return (
          <button
            key={cat.key}
            role="tab"
            aria-selected={isActive}
            id={`tab-${cat.key}`}
            onClick={() => handleCategoryClick(cat.key)}
            className="font-pixel text-[1.1rem]"
            style={{
              padding: "0.4rem 0.85rem",
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
  );
}
