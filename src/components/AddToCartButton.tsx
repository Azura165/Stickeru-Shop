"use client";

import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";

export default function AddToCartButton({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useToastStore((state) => state.addToast);

  const handleAdd = () => {
    addToCart(product);
    addToast(`${product.name} masuk keranjang! 🛒`, "success");
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full font-pixel text-xl py-4 rounded-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-1 cursor-pointer"
      style={{
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
