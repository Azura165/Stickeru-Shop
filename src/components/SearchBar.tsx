"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [isPending, startTransition] = useTransition();

  // Debounce: tunggu 400ms setelah user berhenti mengetik
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set("q", query.trim());
        params.set("page", "1");
        params.delete("category"); // reset kategori saat search
      } else {
        params.delete("q");
        params.set("page", "1");
      }
      startTransition(() => {
        router.replace(`/koleksi?${params.toString()}`, { scroll: false });
      });
    }, 400);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-xl pointer-events-none"
          aria-hidden
        >
          🔍
        </span>
        <input
          type="search"
          id="search-produk"
          placeholder="Cari stiker favoritmu..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 font-medium outline-none rounded-xl transition-all focus:-translate-y-1"
          style={{
            border: "3px solid #1e1b4b",
            backgroundColor: "#ffffff",
            color: "#1e1b4b",
            boxShadow: isPending
              ? "2px 2px 0 0 #6d28d9"
              : "4px 4px 0 0 #1e1b4b",
            fontSize: "0.95rem",
          }}
          aria-label="Cari produk stiker"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold cursor-pointer transition-all hover:scale-110"
            style={{ backgroundColor: "#e9d5ff", border: "2px solid #1e1b4b", color: "#1e1b4b" }}
            aria-label="Hapus pencarian"
          >
            ✕
          </button>
        )}
      </div>
      {isPending && (
        <p className="text-xs font-semibold mt-2 text-center" style={{ color: "#6d28d9" }}>
          Mencari...
        </p>
      )}
    </div>
  );
}
