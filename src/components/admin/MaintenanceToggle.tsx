"use client";

import { useState, useTransition } from "react";
import { toggleMaintenanceModeAction } from "@/lib/admin-actions";

interface MaintenanceToggleProps {
  initialValue: boolean;
}

export default function MaintenanceToggle({ initialValue }: MaintenanceToggleProps) {
  const [isActive, setIsActive] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleToggle = () => {
    const newValue = !isActive;
    setMessage(null);
    startTransition(async () => {
      const result = await toggleMaintenanceModeAction(newValue);
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setIsActive(newValue);
        setMessage({
          type: "success",
          text: newValue
            ? "🚧 Maintenance Mode AKTIF! Publik sekarang tidak bisa mengakses toko."
            : "✅ Maintenance Mode NONAKTIF! Toko kembali online.",
        });
      }
    });
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "4px solid #1e1b4b", boxShadow: "8px 8px 0 0 #1e1b4b" }}
    >
      <div
        className="p-5 border-b-4 border-[#1e1b4b]"
        style={{ backgroundColor: isActive ? "#fce7f3" : "#d1fae5" }}
      >
        <h2 className="font-pixel text-xl" style={{ color: "#1e1b4b" }}>
          {isActive ? "🚧 MAINTENANCE MODE: AKTIF" : "✅ MAINTENANCE MODE: OFF"}
        </h2>
      </div>
      <div className="bg-white p-6 flex flex-col gap-4">
        <p className="font-semibold" style={{ color: "#4c1d95" }}>
          Kalau diaktifkan, semua pengunjung (Homepage, Koleksi, Checkout) akan diarahkan ke halaman maintenance.
          Hanya halaman Admin yang tetap bisa diakses.
        </p>

        {message && (
          <div
            className={`p-4 rounded-xl font-semibold text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border-2 border-green-400"
                : "bg-red-50 text-red-700 border-2 border-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex items-center gap-4">
          {/* Toggle Switch */}
          <button
            onClick={handleToggle}
            disabled={isPending}
            aria-label="Toggle Maintenance Mode"
            className={`relative inline-flex items-center w-16 h-9 rounded-full transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
            style={{
              border: "3px solid #1e1b4b",
              backgroundColor: isActive ? "#ef4444" : "#10b981",
              boxShadow: "3px 3px 0 0 #1e1b4b",
            }}
          >
            <span
              className="inline-block w-6 h-6 bg-white rounded-full shadow-md transition-transform"
              style={{
                transform: isActive ? "translateX(28px)" : "translateX(4px)",
                border: "2px solid #1e1b4b",
              }}
            />
          </button>

          <span className="font-pixel text-lg" style={{ color: isActive ? "#ef4444" : "#10b981" }}>
            {isPending ? "Menyimpan..." : isActive ? "AKTIF" : "NON-AKTIF"}
          </span>

          <button
            onClick={handleToggle}
            disabled={isPending}
            className="ml-auto font-pixel px-6 py-3 rounded-xl cursor-pointer transition-all hover:-translate-y-1 disabled:opacity-60"
            style={{
              backgroundColor: isActive ? "#ef4444" : "#6d28d9",
              color: "white",
              border: "3px solid #1e1b4b",
              boxShadow: "4px 4px 0 0 #1e1b4b",
            }}
          >
            {isPending ? "⏳ Loading..." : isActive ? "🟢 NONAKTIFKAN" : "🚧 AKTIFKAN"}
          </button>
        </div>
      </div>
    </div>
  );
}
