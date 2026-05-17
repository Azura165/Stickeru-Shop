import { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Maintenance | Stickeru",
  description: "Website sedang dalam perbaikan. Harap tunggu sebentar!",
  robots: { index: false, follow: false },
};

export default async function MaintenancePage() {
  // Ambil settings supaya nomor WA & IG tidak hardcoded
  const settings = await getSiteSettings();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      style={{ backgroundColor: "#f5f3ff", fontFamily: "var(--font-inter), sans-serif" }}
    >
      <div
        className="max-w-xl w-full bg-white rounded-3xl p-10 flex flex-col items-center gap-6"
        style={{ border: "6px solid #1e1b4b", boxShadow: "12px 12px 0 0 #1e1b4b" }}
      >
        {/* Emoji bergoyang */}
        <span className="text-8xl animate-bounce block">🚧</span>

        {/* Badge */}
        <span
          className="font-pixel text-sm px-4 py-2 rounded-full"
          style={{ backgroundColor: "#fde68a", border: "3px solid #1e1b4b", color: "#92400e" }}
        >
          UNDER MAINTENANCE
        </span>

        <h1
          className="font-pixel leading-tight"
          style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", color: "#1e1b4b" }}
        >
          SEDANG ADA PERBAIKAN!
        </h1>

        <div
          className="bg-[#fde68a] w-full p-5 rounded-2xl"
          style={{ border: "4px solid #1e1b4b", boxShadow: "6px 6px 0 0 #1e1b4b" }}
        >
          <p className="font-bold text-lg" style={{ color: "#92400e" }}>
            🛠️ Kami lagi upgrade biar Stickeru makin kece!
          </p>
          <p className="text-base mt-2 font-medium" style={{ color: "#78350f" }}>
            Tunggu bentar ya, kami balik segera dengan tampilan yang lebih fresh dan stiker yang lebih banyak!
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div
            className="p-4 rounded-xl text-left"
            style={{ border: "3px solid #1e1b4b", backgroundColor: "#f5f3ff" }}
          >
            <p className="font-bold text-sm mb-2" style={{ color: "#1e1b4b" }}>📱 Sementara bisa hubungi kami di:</p>
            <div className="flex flex-col gap-1">
              <span className="font-medium text-sm" style={{ color: "#4c1d95" }}>
                💬 WhatsApp:{" "}
                <a
                  href={`https://wa.me/${settings.wa_number}`}
                  className="underline hover:text-purple-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat Sekarang
                </a>
              </span>
              <span className="font-medium text-sm" style={{ color: "#4c1d95" }}>
                📸 Instagram:{" "}
                <a
                  href={settings.ig_link}
                  className="underline hover:text-purple-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {settings.ig_link.replace("https://instagram.com/", "@")}
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar animasi */}
        <div className="w-full bg-gray-200 rounded-full overflow-hidden" style={{ border: "2px solid #1e1b4b", height: "14px" }}>
          <div
            className="h-full rounded-full animate-pulse"
            style={{
              width: "75%",
              backgroundColor: "#6d28d9",
              backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 8px, transparent 8px, transparent 16px)"
            }}
          />
        </div>
        <p className="text-xs font-semibold" style={{ color: "#6d28d9" }}>Progress perbaikan: 75%</p>

        {/* Tombol ke Admin — subtle, biar user biasa gak ngeh */}
        <Link
          href="/admin/login"
          className="text-xs font-semibold transition-colors hover:text-purple-700"
          style={{ color: "#9ca3af" }}
        >
          Admin? Masuk dari sini →
        </Link>
      </div>
    </div>
  );
}
