"use client";

import { useState } from "react";

interface ShareButtonProps {
  name: string;
  compact?: boolean;
}

export default function ShareButton({ name, compact = false }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `Cek stiker keren ini di Stickeru! 🎀\n${name}\n${url}`;

    // Gunakan Web Share API kalau ada (mobile), fallback ke clipboard
    if (navigator.share) {
      try {
        await navigator.share({ title: `Stickeru — ${name}`, text, url });
      } catch {
        // user cancel share, ignore
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // ignore
      }
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleShare}
        className="font-pixel text-sm py-3 px-3 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
        style={{
          backgroundColor: "#e9d5ff",
          border: "3px solid #1e1b4b",
          color: "#1e1b4b",
          boxShadow: "3px 3px 0 0 #1e1b4b",
          minWidth: "3rem",
        }}
        aria-label="Share produk ini"
        title="Share"
      >
        {copied ? "✅" : "🔗"}
      </button>
    );
  }

  return (
    <button
      onClick={handleShare}
      className="w-full font-pixel text-sm py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
      style={{
        backgroundColor: "#e9d5ff",
        border: "3px solid #1e1b4b",
        color: "#1e1b4b",
        boxShadow: "4px 4px 0 0 #1e1b4b",
      }}
      aria-label="Share produk ini"
    >
      {copied ? "✅ LINK DISALIN!" : "🔗 SHARE PRODUK INI"}
    </button>
  );
}
