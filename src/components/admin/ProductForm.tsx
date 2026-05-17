"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProductAction, updateProductAction } from "@/lib/actions";
import { Product } from "@/types";

const CATEGORIES = [
  { value: "anime",    label: "⚔️ Anime" },
  { value: "manhwa",   label: "📖 Manhwa" },
  { value: "trending", label: "🔥 Trending" },
  { value: "custom",   label: "✨ Custom" },
];

interface ProductFormProps {
  product?: Product; // Jika ada, mode edit. Jika tidak, mode tambah.
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image_url || null);
  const isEdit = !!product;

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
      setImagePreview(product?.image_url || null);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = isEdit
        ? await updateProductAction(product.id, formData)
        : await createProductAction(formData);

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/admin");
        router.refresh();
      }
    });
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6" style={{ backgroundColor: "#f5f3ff" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => router.back()} className="text-sm font-semibold mb-4 flex items-center gap-1 hover:text-[#6d28d9] transition-colors" style={{ color: "#4c1d95" }}>
            ← Kembali ke Dashboard
          </button>
          <h1 className="font-pixel text-4xl" style={{ color: "#1e1b4b" }}>
            {isEdit ? "✏️ EDIT PRODUK" : "➕ TAMBAH PRODUK"}
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl p-6 sm:p-8"
          style={{ border: "3px solid #1e1b4b", boxShadow: "6px 6px 0px 0px #1e1b4b" }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Nama */}
            <div className="flex flex-col gap-1">
              <label className="font-pixel text-lg" style={{ color: "#1e1b4b" }} htmlFor="name">NAMA STIKER *</label>
              <input id="name" name="name" type="text" required defaultValue={product?.name}
                placeholder="cth: Solo Leveling Pack"
                className="input-neo" style={{ border: "3px solid #1e1b4b", boxShadow: "3px 3px 0 #1e1b4b", padding: "0.65rem 1rem", borderRadius: "8px", backgroundColor: "#f5f3ff", color: "#1e1b4b", width: "100%", outline: "none", fontSize: "0.9rem" }} />
            </div>

            {/* Deskripsi */}
            <div className="flex flex-col gap-1">
              <label className="font-pixel text-lg" style={{ color: "#1e1b4b" }} htmlFor="description">DESKRIPSI</label>
              <textarea id="description" name="description" rows={3} defaultValue={product?.description}
                placeholder="cth: Set stiker Sung Jinwoo edisi limited, glossy premium"
                style={{ border: "3px solid #1e1b4b", boxShadow: "3px 3px 0 #1e1b4b", padding: "0.65rem 1rem", borderRadius: "8px", backgroundColor: "#f5f3ff", color: "#1e1b4b", width: "100%", outline: "none", fontSize: "0.9rem", resize: "vertical" }} />
            </div>

            {/* Harga + Kategori (2 kolom) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-pixel text-lg" style={{ color: "#1e1b4b" }} htmlFor="price">HARGA (Rp) *</label>
                <input id="price" name="price" type="number" required min={0} defaultValue={product?.price}
                  placeholder="15000"
                  style={{ border: "3px solid #1e1b4b", boxShadow: "3px 3px 0 #1e1b4b", padding: "0.65rem 1rem", borderRadius: "8px", backgroundColor: "#f5f3ff", color: "#1e1b4b", width: "100%", outline: "none", fontSize: "0.9rem" }} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-pixel text-lg" style={{ color: "#1e1b4b" }} htmlFor="category">KATEGORI *</label>
                <select id="category" name="category" defaultValue={product?.category ?? "anime"}
                  style={{ border: "3px solid #1e1b4b", boxShadow: "3px 3px 0 #1e1b4b", padding: "0.65rem 1rem", borderRadius: "8px", backgroundColor: "#f5f3ff", color: "#1e1b4b", width: "100%", outline: "none", fontSize: "0.9rem" }}>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Upload Gambar */}
            <div className="flex flex-col gap-2">
              <label className="font-pixel text-lg" style={{ color: "#1e1b4b" }}>FOTO STIKER</label>
              
              <div className="flex items-start gap-4">
                {/* Image Preview Box */}
                <div 
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl flex-shrink-0 flex flex-col items-center justify-center overflow-hidden"
                  style={{ backgroundColor: "#ede9fe", border: "3px solid #1e1b4b", boxShadow: "4px 4px 0px 0px #1e1b4b" }}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <span className="text-3xl">🖼️</span>
                      <span className="font-pixel text-xs mt-1" style={{ color: "#4c1d95" }}>NO IMAGE</span>
                    </>
                  )}
                </div>

                {/* File Input */}
                <div className="flex-1 flex flex-col gap-2">
                  <input 
                    type="file" 
                    id="image_file" 
                    name="image_file" 
                    accept="image/png, image/jpeg, image/webp" 
                    onChange={handleImageChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-[2px] file:border-[#1e1b4b] file:text-sm file:font-semibold file:bg-[#fde68a] file:text-[#1e1b4b] hover:file:bg-[#fcd34d] file:cursor-pointer file:shadow-[2px_2px_0px_0px_#1e1b4b] file:transition-all w-full text-sm"
                    style={{ color: "#4c1d95", cursor: "pointer" }}
                  />
                  <p className="text-xs font-semibold" style={{ color: "#6d28d9" }}>
                    💡 Max size: 2MB. Format: PNG, JPG, WEBP.
                  </p>
                  
                  {/* Fallback URL Input (Hidden tapi value lama tersimpan) */}
                  <input type="hidden" name="existing_image_url" value={product?.image_url || ""} />
                </div>
              </div>
            </div>

            {/* Custom WA Text */}
            <div className="flex flex-col gap-1">
              <label className="font-pixel text-lg" style={{ color: "#1e1b4b" }} htmlFor="whatsapp_text">
                PESAN WA CUSTOM <span className="text-sm font-sans font-normal">(optional)</span>
              </label>
              <textarea id="whatsapp_text" name="whatsapp_text" rows={2} defaultValue={product?.whatsapp_text ?? ""}
                placeholder="Kosongkan untuk pakai pesan default..."
                style={{ border: "3px solid #1e1b4b", boxShadow: "3px 3px 0 #1e1b4b", padding: "0.65rem 1rem", borderRadius: "8px", backgroundColor: "#f5f3ff", color: "#1e1b4b", width: "100%", outline: "none", fontSize: "0.9rem", resize: "vertical" }} />
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: "#ede9fe", border: "2px solid #c4b5fd" }}>
              {/* Pakai satu checkbox saja, tanpa hidden input — server baca dari formData.getAll() */}
              <input
                id="is_available"
                name="is_available"
                type="checkbox"
                value="true"
                defaultChecked={product?.is_available ?? true}
                className="w-5 h-5 accent-violet-700"
              />
              <label htmlFor="is_available" className="font-semibold text-sm cursor-pointer" style={{ color: "#1e1b4b" }}>
                ✅ Tampilkan di halaman toko (is_available)
              </label>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm font-semibold px-3 py-2 rounded-lg"
                style={{ backgroundColor: "#fce7f3", color: "#9d174d", border: "2px solid #9d174d" }}>
                ❌ {error}
              </p>
            )}

            {/* Submit */}
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={isPending} className="btn-primary flex-1 justify-center"
                style={{ opacity: isPending ? 0.7 : 1, fontSize: "1.2rem" }}>
                {isPending ? "⏳ MENYIMPAN..." : isEdit ? "💾 SIMPAN PERUBAHAN" : "➕ TAMBAH PRODUK"}
              </button>
              <button type="button" onClick={() => router.back()} className="btn-secondary" style={{ fontSize: "1.2rem" }}>
                BATAL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
