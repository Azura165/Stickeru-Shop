"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createReviewAction } from "@/lib/actions";

export default function NewReviewPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Ukuran gambar maksimal 2MB!");
        e.target.value = "";
        return;
      }
      setError(null);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createReviewAction(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/admin/reviews");
        router.refresh();
      }
    });
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f3ff" }}>
      <header className="bg-white sticky top-0 z-50" style={{ borderBottom: "4px solid #1e1b4b" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/reviews" className="text-sm font-semibold hover:text-[#6d28d9] transition-colors" style={{ color: "#4c1d95" }}>
              ← Kembali
            </Link>
          </div>
          <span className="font-pixel text-xl" style={{ color: "#1e1b4b" }}>TAMBAH REVIEW</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl p-6 md:p-8" style={{ border: "3px solid #1e1b4b", boxShadow: "8px 8px 0px 0px #1e1b4b" }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Grid Layout untuk memadatkan space */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Kolom Kiri: Info Pelanggan */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-pixel text-lg" style={{ color: "#1e1b4b" }}>Nama Pelanggan *</label>
                  <input required type="text" id="name" name="name" className="p-3 rounded-lg" style={{ border: "2px solid #1e1b4b", backgroundColor: "#f5f3ff", outline: "none" }} placeholder="Contoh: Aira R." />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="avatar_emoji" className="font-pixel text-lg" style={{ color: "#1e1b4b" }}>Emoji Avatar *</label>
                  <input required type="text" id="avatar_emoji" name="avatar_emoji" defaultValue="🌸" className="p-3 rounded-lg" style={{ border: "2px solid #1e1b4b", backgroundColor: "#f5f3ff", outline: "none" }} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="product" className="font-pixel text-lg" style={{ color: "#1e1b4b" }}>Nama Produk *</label>
                  <input required type="text" id="product" name="product" className="p-3 rounded-lg" style={{ border: "2px solid #1e1b4b", backgroundColor: "#f5f3ff", outline: "none" }} placeholder="Contoh: Jujutsu Kaisen Vol.1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="location" className="font-pixel text-lg" style={{ color: "#1e1b4b" }}>Lokasi *</label>
                    <input required type="text" id="location" name="location" className="p-3 rounded-lg" style={{ border: "2px solid #1e1b4b", backgroundColor: "#f5f3ff", outline: "none" }} placeholder="Jakarta" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rating" className="font-pixel text-lg" style={{ color: "#1e1b4b" }}>Rating *</label>
                    <input required type="number" id="rating" name="rating" min="1" max="5" defaultValue="5" className="p-3 rounded-lg" style={{ border: "2px solid #1e1b4b", backgroundColor: "#f5f3ff", outline: "none" }} />
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Ulasan & Upload Bukti */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="text" className="font-pixel text-lg" style={{ color: "#1e1b4b" }}>Isi Review *</label>
                  <textarea required id="text" name="text" rows={4} className="p-3 rounded-lg resize-y" style={{ border: "2px solid #1e1b4b", backgroundColor: "#f5f3ff", outline: "none" }} placeholder="Tulis ulasan pelanggan di sini..."></textarea>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-pixel text-lg" style={{ color: "#1e1b4b" }}>Foto Bukti (Opsional)</label>
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-24 h-24 rounded-xl flex-shrink-0 flex flex-col items-center justify-center overflow-hidden"
                      style={{ backgroundColor: "#ede9fe", border: "3px solid #1e1b4b", boxShadow: "4px 4px 0px 0px #1e1b4b" }}
                    >
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl">📸</span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                      <input 
                        type="file" 
                        name="image_file" 
                        accept="image/png, image/jpeg, image/webp" 
                        onChange={handleImageChange}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-[2px] file:border-[#1e1b4b] file:text-sm file:font-semibold file:bg-[#fde68a] file:text-[#1e1b4b] hover:file:bg-[#fcd34d] file:cursor-pointer file:shadow-[2px_2px_0px_0px_#1e1b4b] file:transition-all w-full text-sm"
                        style={{ color: "#4c1d95", cursor: "pointer" }}
                      />
                      <p className="text-xs font-semibold" style={{ color: "#6d28d9" }}>
                        Screenshot WA atau foto produk asli. (Max 2MB)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {error && (
              <p className="text-sm font-semibold px-3 py-2 rounded-lg mt-2"
                style={{ backgroundColor: "#fce7f3", color: "#9d174d", border: "2px solid #9d174d" }}>
                ❌ {error}
              </p>
            )}

            <div className="flex justify-end gap-4 mt-6 pt-6" style={{ borderTop: "2px solid #ede9fe" }}>
              <Link href="/admin/reviews" className="btn-secondary" style={{ fontSize: "1rem" }}>BATAL</Link>
              <button disabled={isPending} type="submit" className="btn-primary" style={{ fontSize: "1rem", opacity: isPending ? 0.7 : 1 }}>
                {isPending ? "⏳ MENYIMPAN..." : "💾 SIMPAN REVIEW"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
