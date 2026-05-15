"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutClient({ waNumber }: { waNumber: string }) {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  
  const [mounted, setMounted] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerNotes, setBuyerNotes] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleWAOrder = () => {
    if (!buyerName.trim()) {
      alert("Oops! Jangan lupa isi Nama Kamu ya 🎀");
      return;
    }

    let message = `Halo Stickeru! 🎀\nSaya *${buyerName}* mau order:\n\n`;
    
    items.forEach((item) => {
      const itemTotal = item.product.price * item.quantity;
      message += `${item.quantity}x ${item.product.name} (${formatPrice(itemTotal)})\n`;
    });

    message += `\n*Total: ${formatPrice(getTotalPrice())}*`;
    
    if (buyerNotes.trim()) {
      message += `\n\n*Catatan Tambahan:*\n${buyerNotes}`;
    }

    message += `\n\nMohon info pembayaran dan pengirimannya ya kak!`;

    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    
    window.open(waLink, "_blank");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f3ff", padding: "3rem 1rem" }}>
      <div className="max-w-6xl mx-auto">
        <Link href="/koleksi" className="inline-block mb-6 font-bold transition-all hover:-translate-x-2" style={{ color: "#6d28d9" }}>
          ← KEMBALI BELANJA
        </Link>
        
        <h1 className="font-pixel text-4xl mb-8" style={{ color: "#1e1b4b" }}>CHECKOUT BARANG</h1>

        {items.length === 0 ? (
          <div className="bg-white p-16 text-center rounded-2xl w-full max-w-2xl mx-auto" style={{ border: "4px solid #1e1b4b", boxShadow: "8px 8px 0 0 #1e1b4b" }}>
            <span className="text-6xl mb-4 block animate-bounce">🛒</span>
            <h2 className="font-pixel text-2xl mb-4" style={{ color: "#1e1b4b" }}>KERANJANGMU MASIH KOSONG!</h2>
            <p className="mb-8 font-semibold" style={{ color: "#4c1d95" }}>Yuk, cari stiker keren buat ditempel di barang-barangmu.</p>
            <Link 
              href="/koleksi" 
              className="font-pixel text-lg px-8 py-4 rounded-xl inline-block transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#1e1b4b]"
              style={{ backgroundColor: "#fde68a", border: "3px solid #1e1b4b", color: "#1e1b4b" }}
            >
              CARI STIKER SEKARANG
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Kiri: Daftar Pesanan (7/12) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "4px solid #1e1b4b", boxShadow: "8px 8px 0 0 #1e1b4b" }}>
                <div className="bg-[#fde68a] p-5 border-b-4 border-[#1e1b4b]">
                  <h2 className="font-pixel text-xl" style={{ color: "#1e1b4b" }}>DAFTAR PESANAN ({totalItems})</h2>
                </div>
                <div className="p-5 flex flex-col gap-5">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4 bg-[#f5f3ff] p-4 rounded-xl border-3 border-[#1e1b4b]" style={{ border: "3px solid #1e1b4b" }}>
                      <div className="w-24 h-24 bg-white rounded-lg border-2 border-[#1e1b4b] overflow-hidden flex items-center justify-center flex-shrink-0">
                        {item.product.image_url ? (
                          <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-4xl">🎨</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-pixel text-xl leading-tight truncate" style={{ color: "#1e1b4b" }} title={item.product.name}>{item.product.name}</h3>
                        <p className="font-bold text-base mt-1" style={{ color: "#6d28d9" }}>{formatPrice(item.product.price)}</p>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQuantity(item.product.id, -1)} disabled={item.quantity <= 1} className="w-8 h-8 rounded-lg flex items-center justify-center font-bold bg-[#fde68a] border-2 border-[#1e1b4b] disabled:opacity-50 hover:-translate-y-1 transition-transform shadow-[2px_2px_0_0_#1e1b4b]">-</button>
                            <span className="w-8 text-center font-pixel text-lg">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, 1)} className="w-8 h-8 rounded-lg flex items-center justify-center font-bold bg-[#d1fae5] border-2 border-[#1e1b4b] hover:-translate-y-1 transition-transform shadow-[2px_2px_0_0_#1e1b4b]">+</button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.product.id)} 
                            className="w-10 h-10 flex items-center justify-center bg-[#fce7f3] border-2 border-[#1e1b4b] rounded-lg shadow-[2px_2px_0_0_#1e1b4b] hover:-translate-y-1 transition-all"
                            title="Hapus item"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <div className="hidden sm:flex flex-col items-end justify-center font-pixel text-xl ml-4" style={{ color: "#1e1b4b" }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Kanan: Ringkasan & Form (5/12) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Form Data Pembeli */}
              <div className="bg-white rounded-2xl p-6" style={{ border: "4px solid #1e1b4b", boxShadow: "8px 8px 0 0 #1e1b4b" }}>
                <h2 className="font-pixel text-xl mb-6" style={{ color: "#1e1b4b" }}>INFO PEMBELI</h2>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm" style={{ color: "#1e1b4b" }}>Nama Kamu <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Masukkan nama panggilan..."
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl font-medium outline-none transition-all focus:-translate-y-1"
                      style={{ border: "3px solid #1e1b4b", backgroundColor: "#f5f3ff", color: "#1e1b4b", boxShadow: "4px 4px 0 0 #1e1b4b" }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm" style={{ color: "#1e1b4b" }}>Catatan Tambahan (Opsional)</label>
                    <textarea 
                      placeholder="Contoh: Yang Solo Leveling minta 2 ya kak..."
                      value={buyerNotes}
                      onChange={(e) => setBuyerNotes(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl font-medium outline-none resize-none transition-all focus:-translate-y-1"
                      style={{ border: "3px solid #1e1b4b", backgroundColor: "#f5f3ff", color: "#1e1b4b", boxShadow: "4px 4px 0 0 #1e1b4b" }}
                    />
                  </div>
                </div>
              </div>

              {/* Ringkasan Belanja */}
              <div className="bg-white rounded-2xl sticky top-24" style={{ border: "4px solid #1e1b4b", boxShadow: "8px 8px 0 0 #1e1b4b" }}>
                <div className="bg-[#d1fae5] p-5 border-b-4 border-[#1e1b4b]">
                  <h2 className="font-pixel text-xl" style={{ color: "#1e1b4b" }}>RINGKASAN</h2>
                </div>
                <div className="p-6 flex flex-col gap-5">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-gray-600">Total Harga Barang</span>
                    <span className="font-pixel text-2xl" style={{ color: "#1e1b4b" }}>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <hr className="border-[#1e1b4b] border-t-2" />
                  <p className="text-sm font-medium" style={{ color: "#4c1d95", lineHeight: 1.6 }}>
                    Pesanan akan diteruskan ke WhatsApp admin Stickeru. Ongkos kirim akan dikalkulasi oleh admin ya! 🚀
                  </p>
                  <button 
                    onClick={handleWAOrder}
                    className="w-full py-4 text-xl font-pixel flex items-center justify-center gap-3 rounded-xl transition-all hover:-translate-y-2 hover:shadow-[6px_6px_0_0_#1e1b4b] cursor-pointer mt-2"
                    style={{ backgroundColor: "#10b981", color: "white", border: "4px solid #1e1b4b" }}
                  >
                    <span>💬</span> PESAN VIA WA
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
