"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const router = useRouter();
  // PERFORMANCE: Use atomic selectors to prevent unnecessary re-renders
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // PERFORMANCE & UX: Disable body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    toggleCart(); // Close sidebar
    router.push("/checkout");
  };

  return (
    <>
      {/* Floating Cart Button (Visible on all screens) */}
      <button
        onClick={toggleCart}
        className="fixed bottom-24 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center neo-hover"
        style={{
          backgroundColor: "#fde68a",
          border: "4px solid #1e1b4b",
          boxShadow: "4px 4px 0px 0px #1e1b4b",
          cursor: "pointer",
        }}
        aria-label="Buka Keranjang"
      >
        <span className="text-2xl">🛒</span>
        {totalItems > 0 && (
          <span
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center font-pixel text-sm"
            style={{ backgroundColor: "#9d174d", color: "#fff", border: "2px solid #1e1b4b" }}
          >
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay - PERFORMANCE: Removed backdrop-blur-sm to fix scroll lag */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleCart}
      />

      {/* Sidebar Modal - PERFORMANCE: Use hardware-accelerated transform classes */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          borderLeft: "5px solid #1e1b4b",
          boxShadow: isOpen ? "-10px 0px 0px 0px rgba(30,27,75,0.1)" : "none",
        }}
      >
        <div className="flex items-center justify-between p-5 border-b-[4px] border-[#1e1b4b] bg-[#ede9fe]">
          <h2 className="font-pixel text-2xl" style={{ color: "#1e1b4b" }}>KERANJANG ( {totalItems} )</h2>
          <button
            onClick={toggleCart}
            className="w-8 h-8 flex items-center justify-center font-bold text-xl neo-hover"
            style={{ backgroundColor: "#fce7f3", border: "2px solid #1e1b4b", color: "#9d174d", cursor: "pointer" }}
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-[#f5f3ff]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 opacity-70">
              <span className="text-6xl">🛒</span>
              <p className="font-pixel text-xl text-center" style={{ color: "#4c1d95" }}>Keranjang kamu<br/>masih kosong!</p>
              <button 
                onClick={toggleCart}
                className="btn-secondary mt-2 text-sm"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white p-4 rounded-xl flex items-center justify-between gap-4"
                style={{ border: "3px solid #1e1b4b", boxShadow: "4px 4px 0px 0px #1e1b4b" }}
              >
                {/* Image */}
                <div
                  className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: "#ede9fe", border: "2px solid #1e1b4b" }}
                >
                  {item.product.image_url ? (
                    <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover rounded-md" />
                  ) : (
                    <span className="text-2xl">🎨</span>
                  )}
                </div>
                
                {/* Details & Controls */}
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <h3 className="font-pixel text-base truncate" style={{ color: "#1e1b4b" }} title={item.product.name}>
                    {item.product.name}
                  </h3>
                  
                  <span className="font-pixel text-sm" style={{ color: "#6d28d9" }}>
                    {formatPrice(item.product.price)}
                  </span>

                  {/* Qty + Delete Row */}
                  <div className="flex items-center justify-between mt-2">
                    {/* Qty Controls */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.product.id, -1)} 
                        className="w-8 h-8 flex items-center justify-center font-bold cursor-pointer transition-all hover:-translate-y-[2px]" 
                        style={{ backgroundColor: "#fde68a", border: "2px solid #1e1b4b", borderRadius: "6px", boxShadow: "2px 2px 0 0 #1e1b4b" }}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="font-pixel text-base w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, 1)} 
                        className="w-8 h-8 flex items-center justify-center font-bold cursor-pointer transition-all hover:-translate-y-[2px]" 
                        style={{ backgroundColor: "#d1fae5", border: "2px solid #1e1b4b", borderRadius: "6px", boxShadow: "2px 2px 0 0 #1e1b4b" }}
                      >
                        +
                      </button>
                    </div>

                    {/* Delete Button — terpisah dengan gap yang cukup */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg cursor-pointer transition-all hover:-translate-y-0.5 text-xs font-semibold"
                      style={{ backgroundColor: "#fce7f3", border: "2px solid #1e1b4b", color: "#9d174d", boxShadow: "2px 2px 0 0 #1e1b4b" }}
                      aria-label="Hapus item"
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t-[4px] border-[#1e1b4b] bg-white flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-lg" style={{ color: "#4c1d95" }}>TOTAL</span>
              <span className="font-pixel text-2xl" style={{ color: "#1e1b4b" }}>{formatPrice(getTotalPrice())}</span>
            </div>
            
            <button
              onClick={handleCheckout}
              className="btn-primary w-full py-4 text-center justify-center cursor-pointer"
              style={{ fontSize: "1.2rem", boxShadow: "5px 5px 0px 0px #1e1b4b" }}
            >
              🚀 KE HALAMAN CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
}
