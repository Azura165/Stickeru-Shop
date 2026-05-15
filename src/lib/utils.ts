import { Product, Testimonial } from "@/types";

export const WA_NUMBER = "6281234567890"; // fallback default

export function generateWALink(product: Product, waNumber?: string): string {
  const number = waNumber ?? WA_NUMBER;
  const customText = product.whatsapp_text;

  const defaultText =
    `Halo kak! Saya mau order stiker nih 🎀\n\n` +
    `🎨 *${product.name}*\n` +
    `💰 Harga: Rp ${product.price.toLocaleString("id-ID")}\n` +
    `📦 Kategori: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}\n\n` +
    `Apakah masih tersedia? Terima kasih! 😊`;

  const message = encodeURIComponent(customText ?? defaultText);
  return `https://wa.me/${number}?text=${message}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Solo Leveling Pack",
    description: "Set stiker Sung Jinwoo edisi limited, glossy premium",
    price: 15000,
    image_url: null,
    category: "manhwa",
    is_available: true,
  },
  {
    id: "2",
    name: "Jujutsu Kaisen Vol.1",
    description: "Gojo, Yuji, Megumi dalam satu pack stiker anti-air",
    price: 18000,
    image_url: null,
    category: "anime",
    is_available: true,
  },
  {
    id: "3",
    name: "Demon Slayer Hashira",
    description: "9 karakter Hashira dalam satu sheet stiker hologram",
    price: 25000,
    image_url: null,
    category: "anime",
    is_available: true,
  },
  {
    id: "4",
    name: "Omniscient Reader",
    description: "Stiker karakter webtoon ORV berkualitas tinggi, matte finish",
    price: 20000,
    image_url: null,
    category: "manhwa",
    is_available: true,
  },
  {
    id: "5",
    name: "Trending Aesthetic Pack",
    description: "Mix stiker estetik yang lagi viral di TikTok & Pinterest",
    price: 12000,
    image_url: null,
    category: "trending",
    is_available: true,
  },
  {
    id: "6",
    name: "Blue Lock: Isagi",
    description: "Stiker Yoichi Isagi edisi ego awakening, glossy",
    price: 15000,
    image_url: null,
    category: "anime",
    is_available: true,
  },
];

export const DEFAULT_SETTINGS = {
  store_name: "Stickeru",
  wa_number: "6281234567890",
  ig_link: "https://instagram.com/stickeru",
  tiktok_link: "https://tiktok.com/@stickeru",
  operational_hours: "08.00 – 21.00 WIB",
  announcement: "FREE ONGKIR SEKOTA 🎀  ·  STIKER ANTI-AIR & TAHAN LAMA ✨  ·  CUSTOM ORDER OPEN 🔥  ·  KUALITAS PREMIUM HARGA TERJANGKAU 💜",
  tagline: "Stiker custom anime & manhwa berkualitas premium",
  terms_and_conditions: "1. Pemesanan dilakukan via WhatsApp.\n2. Pengiriman diproses H+1 setelah pembayaran.\n3. Custom order memerlukan waktu 3-5 hari.\n4. Barang yang sudah dibeli tidak dapat ditukar kecuali cacat pabrik.\n5. Harap lampirkan video unboxing jika ingin melakukan retur.\n6. Dengan membeli, Anda setuju dengan ketentuan ini.",
};

export const STATIC_REVIEWS: Testimonial[] = [
  {
    id: "1",
    name: "Aira R.",
    avatar_emoji: "🌸",
    text: "Stiker-nya bagus banget! Udah nempel di tumblr gue sebulan lebih, gak luntur sama sekali.",
    rating: 5,
    product: "Jujutsu Kaisen Vol.1",
    location: "Jakarta",
  },
  {
    id: "2",
    name: "Dimas F.",
    avatar_emoji: "⚡",
    text: "Kualitas glossy-nya premium, warnanya vivid banget. Respon admin cepet, nggak nyesel beli di sini!",
    rating: 5,
    product: "Solo Leveling Pack",
    location: "Bandung",
  },
  {
    id: "3",
    name: "Syifa A.",
    avatar_emoji: "🎀",
    text: "Custom order-nya memuaskan! Minta desain karakter spesifik dan hasilnya persis ekspektasi.",
    rating: 5,
    product: "Custom Order",
    location: "Surabaya",
  },
  {
    id: "4",
    name: "Kevin M.",
    avatar_emoji: "🔥",
    text: "Packaging rapi, stiker aman sampai. Udah order 3x dan selalu puas. Worth it banget!",
    rating: 5,
    product: "Demon Slayer Hashira",
    location: "Yogyakarta",
  },
  {
    id: "5",
    name: "Nadia K.",
    avatar_emoji: "🌟",
    text: "Warnanya gak pudar meski kena hujan! Stiker hologram-nya kece abis, temen-temen pada minta juga.",
    rating: 5,
    product: "Omniscient Reader",
    location: "Medan",
  },
  {
    id: "6",
    name: "Rizal P.",
    avatar_emoji: "🎮",
    text: "Harga terjangkau tapi kualitasnya nggak murahan. Stiker Blue Lock-nya detail banget!",
    rating: 5,
    product: "Blue Lock: Isagi",
    location: "Semarang",
  },
];
