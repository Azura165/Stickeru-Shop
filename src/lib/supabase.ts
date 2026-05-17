import { createClient } from "@supabase/supabase-js";
import { Product, SiteSettings, Testimonial } from "@/types";
import { DEFAULT_SETTINGS, STATIC_REVIEWS } from "@/lib/utils";
import { unstable_cache } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function createAdminClient() {
  const secretKey = process.env.SUPABASE_SECRET_KEY!;
  return createClient(supabaseUrl, secretKey, {
    auth: { persistSession: false },
  });
}

// ============================================
//  PRODUCT FUNCTIONS
// ============================================

export async function getAvailableProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, description, price, image_url, category, is_available, whatsapp_text, created_at")
    .eq("is_available", true)
    .order("created_at", { ascending: false })
    .limit(50); // guard against massive datasets

  if (error) {
    console.error("❌ Error fetching products:", error.message);
    return [];
  }
  return (data as Product[]) ?? [];
}

export const getProductsPaginated = unstable_cache(async (options: {
  page: number;
  limit: number;
  category?: string;
  search?: string;
}): Promise<{ products: Product[]; totalCount: number }> => {
  let query = supabase
    .from("products")
    .select("id, name, description, price, image_url, category, is_available, whatsapp_text, created_at", { count: "exact" })
    .eq("is_available", true);

  if (options.category && options.category !== "all" && options.category !== "semua") {
    query = query.eq("category", options.category);
  }

  // Full-text search — filter by name or description
  if (options.search && options.search.trim()) {
    query = query.or(`name.ilike.%${options.search.trim()}%,description.ilike.%${options.search.trim()}%`);
  }

  query = query.order("created_at", { ascending: false });

  const from = (options.page - 1) * options.limit;
  const to = from + options.limit - 1;
  query = query.range(from, to);

  const { data, count, error } = await query;
  if (error) {
    console.error("❌ Error fetching paginated products:", error.message);
    return { products: [], totalCount: 0 };
  }
  return { products: (data as Product[]) ?? [], totalCount: count || 0 };
}, ["products-paginated"], { revalidate: 3600 });

// ============================================
//  REVIEW / TESTIMONIAL FUNCTIONS
// ============================================

/**
 * Fetch review yang sudah di-approve admin.
 * Fallback ke STATIC_REVIEWS jika tabel belum dibuat.
 */
export async function getApprovedReviews(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, avatar_emoji, text, rating, product, location")
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error || !data || data.length === 0) {
    // Tabel belum ada atau kosong → gunakan data statis
    return STATIC_REVIEWS;
  }
  return data as Testimonial[];
}

// ============================================
//  SETTINGS FUNCTIONS
// ============================================

export const getSiteSettings = unstable_cache(async (): Promise<SiteSettings> => {
  const { data, error } = await supabase
    .from("settings")
    .select("key, value");

  if (error || !data || data.length === 0) {
    return DEFAULT_SETTINGS;
  }

  // Convert array of {key, value} ke object SiteSettings
  const settingsMap = data.reduce(
    (acc, row) => ({ ...acc, [row.key]: row.value }),
    {} as Record<string, string>
  );

  return {
    store_name: settingsMap.store_name ?? DEFAULT_SETTINGS.store_name,
    wa_number: settingsMap.wa_number ?? DEFAULT_SETTINGS.wa_number,
    ig_link: settingsMap.ig_link ?? DEFAULT_SETTINGS.ig_link,
    tiktok_link: settingsMap.tiktok_link ?? DEFAULT_SETTINGS.tiktok_link,
    operational_hours: settingsMap.operational_hours ?? DEFAULT_SETTINGS.operational_hours,
    announcement: settingsMap.announcement ?? DEFAULT_SETTINGS.announcement,
    tagline: settingsMap.tagline ?? DEFAULT_SETTINGS.tagline,
    terms_and_conditions: settingsMap.terms_and_conditions ?? DEFAULT_SETTINGS.terms_and_conditions,
  };
}, ["site-settings"], { revalidate: 3600 });
