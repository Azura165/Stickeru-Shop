"use client";

import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";

interface AddToCartButtonProps {
  product: Product;
  compact?: boolean;
}

export default function AddToCartButton({ product, compact = false }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useToastStore((state) => state.addToast);

  const handleAdd = () => {
    addToCart(product);
    addToast(`${product.name} masuk keranjang! 🛒`, "success");
  };

  if (compact) {
    return (
      <button
        onClick={handleAdd}
        className="flex-1 font-pixel text-sm py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
        style={{
          backgroundColor: "#fde68a",
          color: "#1e1b4b",
          border: "3px solid #1e1b4b",
          boxShadow: "3px 3px 0 0 #1e1b4b",
        }}
        aria-label={`Tambah ${product.name} ke keranjang`}
      >
        🛒 KERANJANG
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full font-pixel py-4 rounded-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-1 cursor-pointer"
      style={{
        fontSize: "clamp(0.9rem, 3vw, 1.1rem)",
        backgroundColor: "#fde68a",
        color: "#1e1b4b",
        border: "4px solid #1e1b4b",
        boxShadow: "6px 6px 0 0 #1e1b4b",
      }}
      aria-label={`Tambah ${product.name} ke keranjang`}
    >
      <span>🛒</span> TAMBAH KE KERANJANG
    </button>
  );
}
