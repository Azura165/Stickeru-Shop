// Tipe data produk
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category: "anime" | "manhwa" | "trending" | "custom";
  is_available: boolean;
  whatsapp_text?: string;
  created_at?: string;
}

export type ProductCategory = "all" | "anime" | "manhwa" | "trending" | "custom";

export interface CategoryTab {
  key: ProductCategory;
  label: string;
  emoji: string;
}

// Site settings — dikelola dari admin panel & disimpan di Supabase
export interface SiteSettings {
  store_name: string;
  wa_number: string;
  ig_link: string;
  tiktok_link: string;
  operational_hours: string;
  announcement: string;
  tagline: string;
  terms_and_conditions: string;
}

// Testimonial
export interface Testimonial {
  id: string;
  name: string;
  avatar_emoji: string;
  text: string;
  rating: number;
  product: string;
  location: string;
}
