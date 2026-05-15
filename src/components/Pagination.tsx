"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentCategory = searchParams.get("category") || "all";

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    return `/koleksi?page=${pageNumber}&category=${currentCategory}`;
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-12 mb-8">
      {/* Prev Button */}
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={`font-pixel text-lg px-4 py-2 rounded-xl transition-all ${
          currentPage === 1 
            ? "opacity-50 pointer-events-none bg-gray-200" 
            : "bg-[#fce7f3] hover:-translate-y-1 hover:shadow-[3px_3px_0_0_#1e1b4b] cursor-pointer"
        }`}
        style={{ border: "3px solid #1e1b4b", color: "#9d174d" }}
        aria-disabled={currentPage === 1}
      >
        ← PREV
      </Link>

      {/* Page Indicator */}
      <div 
        className="font-bold text-lg px-4 py-2 rounded-xl bg-white" 
        style={{ border: "3px solid #1e1b4b", color: "#1e1b4b", boxShadow: "inset 2px 2px 0 0 rgba(0,0,0,0.05)" }}
      >
        {currentPage} / {totalPages}
      </div>

      {/* Next Button */}
      <Link
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={`font-pixel text-lg px-4 py-2 rounded-xl transition-all ${
          currentPage === totalPages 
            ? "opacity-50 pointer-events-none bg-gray-200" 
            : "bg-[#d1fae5] hover:-translate-y-1 hover:shadow-[3px_3px_0_0_#1e1b4b] cursor-pointer"
        }`}
        style={{ border: "3px solid #1e1b4b", color: "#065f46" }}
        aria-disabled={currentPage === totalPages}
      >
        NEXT →
      </Link>
    </div>
  );
}
