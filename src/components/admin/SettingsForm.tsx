"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateSettingsAction } from "@/lib/actions";
import { SiteSettings } from "@/types";
import Link from "next/link";

interface AdminSettingsPageClientProps {
  settings: SiteSettings;
}

const FIELDS: {
  key: keyof SiteSettings;
  label: string;
  placeholder: string;
  hint?: string;
  type?: string;
  maxLength?: number;
}[] = [
  {
    key: "store_name",
    label: "NAMA TOKO",
    placeholder: "Stickeru",
    hint: "Muncul di navbar, footer, tab browser, dan metadata halaman",
    maxLength: 30,
  },
  {
    key: "tagline",
    label: "TAGLINE TOKO",
    placeholder: "Stiker custom anime & manhwa berkualitas premium",
    hint: "Kalimat singkat yang mendeskripsikan tokomu — tampil di hero & footer",
    maxLength: 80,
  },
  {
    key: "wa_number",
    label: "NOMOR WHATSAPP",
    placeholder: "6281234567890",
    hint: "Tanpa + atau spasi. Format: kode negara + nomor. Contoh: 6281234567890",
    maxLength: 20,
  },
  {
    key: "ig_link",
    label: "LINK INSTAGRAM",
    placeholder: "https://instagram.com/stickeru",
    type: "url",
  },
  {
    key: "tiktok_link",
    label: "LINK TIKTOK",
    placeholder: "https://tiktok.com/@stickeru",
    type: "url",
  },
  {
    key: "operational_hours",
    label: "JAM OPERASIONAL",
    placeholder: "08.00 – 21.00 WIB",
    hint: "Tampil di footer. Contoh: 08.00 – 21.00 WIB (Senin–Minggu)",
    maxLength: 50,
  },
  {
    key: "announcement",
    label: "TEKS ANNOUNCEMENT BANNER",
    placeholder: "FREE ONGKIR SEKOTA 🎀 · STIKER ANTI-AIR ✨ · CUSTOM ORDER OPEN 🔥",
    hint: "Teks yang berjalan di banner atas halaman. Gunakan · sebagai pemisah antar info.",
    maxLength: 200,
  },
  {
    key: "terms_and_conditions",
    label: "SYARAT & KETENTUAN",
    placeholder: "1. Pemesanan via WA...\n2. Pengiriman...",
    hint: "Gunakan enter untuk membuat baris baru. Ini akan tampil di halaman Syarat & Ketentuan.",
    type: "textarea",
  },
];

const inputBaseStyle: React.CSSProperties = {
  border: "3px solid #1e1b4b",
  boxShadow: "3px 3px 0 #1e1b4b",
  padding: "0.65rem 1rem",
  borderRadius: "8px",
  backgroundColor: "#f5f3ff",
  color: "#1e1b4b",
  width: "100%",
  outline: "none",
  fontSize: "0.9rem",
  fontFamily: "var(--font-inter)",
  transition: "box-shadow 0.15s ease",
};

export default function SettingsForm({ settings }: AdminSettingsPageClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState<SiteSettings>({ ...settings });
  const formRef = useRef<HTMLFormElement>(null);

  function handleChange(key: keyof SiteSettings, value: string) {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateSettingsAction(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        router.refresh();
        setTimeout(() => setSuccess(false), 4000);
      }
    });
  }

  // Live WA preview link
  const waPreviewLink = `https://wa.me/${fieldValues.wa_number || "6281234567890"}?text=${encodeURIComponent(
    "Halo kak! Saya mau tanya-tanya soal stiker nih 😊"
  )}`;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6" style={{ backgroundColor: "#f5f3ff" }}>
      <div className="max-w-2xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="text-sm font-semibold mb-4 flex items-center gap-1 hover:text-[#6d28d9] transition-colors"
            style={{ color: "#4c1d95" }}
          >
            ← Kembali ke Dashboard
          </Link>
          <h1 className="font-pixel text-4xl" style={{ color: "#1e1b4b" }}>
            ⚙️ PENGATURAN TOKO
          </h1>
          <p className="text-sm mt-2" style={{ color: "#4c1d95" }}>
            Semua perubahan di sini akan langsung tampil di halaman depan toko secara real-time.
          </p>
        </div>

        {/* Form Card */}
        <div
          className="bg-white rounded-xl p-6 sm:p-8"
          style={{ border: "3px solid #1e1b4b", boxShadow: "6px 6px 0px 0px #1e1b4b" }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
            {FIELDS.map((field) => {
              const currentValue = fieldValues[field.key] ?? "";
              return (
                <div key={field.key} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      className="font-pixel text-lg"
                      style={{ color: "#1e1b4b" }}
                      htmlFor={field.key}
                    >
                      {field.label}
                    </label>
                    {/* Character counter */}
                    {field.maxLength && (
                      <span
                        className="text-xs font-mono"
                        style={{
                          color: currentValue.length > field.maxLength * 0.9
                            ? "#9d174d"
                            : "#a78bfa",
                        }}
                      >
                        {currentValue.length}/{field.maxLength}
                      </span>
                    )}
                  </div>

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.key}
                      name={field.key}
                      value={currentValue}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      maxLength={field.maxLength}
                      style={{ ...inputBaseStyle, minHeight: "150px", resize: "vertical" }}
                      required={false}
                    />
                  ) : (
                    <input
                      id={field.key}
                      name={field.key}
                      type={field.type ?? "text"}
                      value={currentValue}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      maxLength={field.maxLength}
                      style={inputBaseStyle}
                      required={field.key === "store_name" || field.key === "wa_number"}
                    />
                  )}

                  {field.hint && (
                    <p className="text-xs leading-relaxed" style={{ color: "#6d28d9" }}>
                      💡 {field.hint}
                    </p>
                  )}
                </div>
              );
            })}

            {/* Live WA Preview */}
            <div
              className="rounded-xl p-4 flex flex-col gap-2"
              style={{ backgroundColor: "#d1fae5", border: "2px solid #065f46" }}
            >
              <p className="font-pixel text-sm" style={{ color: "#065f46" }}>
                📱 PREVIEW LINK WHATSAPP
              </p>
              <a
                href={waPreviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono break-all hover:underline"
                style={{ color: "#065f46" }}
              >
                {waPreviewLink}
              </a>
              <p className="text-xs" style={{ color: "#065f46" }}>
                ↑ Klik untuk test langsung link WA-mu
              </p>
            </div>

            {/* Announcement Preview */}
            {fieldValues.announcement && (
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "2px solid #1e1b4b" }}
              >
                <p
                  className="font-pixel text-xs px-3 py-1"
                  style={{ backgroundColor: "#1e1b4b", color: "#fde68a" }}
                >
                  👀 PREVIEW ANNOUNCEMENT BANNER
                </p>
                <div
                  className="overflow-hidden py-2"
                  style={{ backgroundColor: "#1e1b4b" }}
                >
                  <p className="font-pixel text-base px-4 whitespace-nowrap" style={{ color: "#fde68a" }}>
                    {fieldValues.announcement}
                  </p>
                </div>
              </div>
            )}

            {/* Success Alert */}
            {success && (
              <div
                className="px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                style={{
                  backgroundColor: "#d1fae5",
                  color: "#065f46",
                  border: "2px solid #065f46",
                }}
              >
                <span className="text-lg">✅</span>
                <div>
                  <p className="font-semibold">Pengaturan berhasil disimpan!</p>
                  <p className="text-xs opacity-80">
                    Halaman toko sudah terupdate secara otomatis.
                  </p>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div
                className="px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                style={{
                  backgroundColor: "#fce7f3",
                  color: "#9d174d",
                  border: "2px solid #9d174d",
                }}
              >
                <span className="text-lg">❌</span>
                <div>
                  <p className="font-semibold">Gagal menyimpan</p>
                  <p className="text-xs">{error}</p>
                </div>
              </div>
            )}

            {/* Submit + Reset */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="btn-primary flex-1 justify-center"
                style={{ opacity: isPending ? 0.7 : 1, fontSize: "1.2rem" }}
              >
                {isPending ? "⏳ MENYIMPAN..." : "💾 SIMPAN PENGATURAN"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFieldValues({ ...settings });
                  formRef.current?.reset();
                }}
                className="btn-secondary"
                style={{ fontSize: "1.2rem" }}
                title="Reset ke nilai tersimpan terakhir"
              >
                ↺
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div
          className="mt-6 rounded-xl p-4 flex items-start gap-3"
          style={{ backgroundColor: "#ede9fe", border: "2px solid #c4b5fd" }}
        >
          <span className="text-xl flex-shrink-0">🔒</span>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-sm" style={{ color: "#1e1b4b" }}>
              Keamanan Admin
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#4c1d95" }}>
              Halaman ini hanya bisa diakses setelah login. Ganti{" "}
              <code
                className="px-1 rounded font-mono"
                style={{ backgroundColor: "#c4b5fd" }}
              >
                ADMIN_PASSWORD
              </code>{" "}
              di <code className="px-1 rounded font-mono" style={{ backgroundColor: "#c4b5fd" }}>.env.local</code>{" "}
              dengan password yang kuat sebelum deploy!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
