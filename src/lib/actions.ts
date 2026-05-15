"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";
import { Product } from "@/types";

const COOKIE_NAME = "stiker-admin-auth";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

// ============================================
//  AUTH ACTIONS
// ============================================
export async function loginAction(formData: FormData) {
  const isForgot = formData.get("is_forgot") === "true";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  // Pakai anon client buat Sign In (bukan admin client yang bypass RLS)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  if (isForgot) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return { error: error.message, isForgot: true };
    return { success: true, message: "Email reset password terkirim! Cek inbox kamu.", isForgot: true };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error || !data.user) {
    return { error: "Login gagal. Cek kembali email & password.", isForgot: false };
  }

  // Set cookie session buat Next.js middleware
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "supabase_authorized", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 minggu
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}

// ============================================
//  PRODUCT ACTIONS
// ============================================
export async function getAllProductsAdmin(): Promise<Product[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data as Product[]) ?? [];
}

// Helper untuk upload gambar
async function uploadProductImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  
  // Validasi ukuran di server (Max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Ukuran gambar maksimal 2MB!");
  }

  const supabase = createAdminClient();
  const fileExt = file.name.split('.').pop() || "png";
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  const { error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw new Error(`Gagal upload gambar: ${error.message}`);
  }

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function createProductAction(formData: FormData) {
  try {
    const file = formData.get("image_file") as File | null;
    const uploadedUrl = await uploadProductImage(file);
    const existingUrl = formData.get("existing_image_url") as string;

    const supabase = createAdminClient();
    const product = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      category: formData.get("category") as string,
      is_available: formData.get("is_available") === "true",
      whatsapp_text: (formData.get("whatsapp_text") as string) || null,
      image_url: uploadedUrl || existingUrl || null,
    };
    
    const { error } = await supabase.from("products").insert([product]);
    if (error) return { error: error.message };
    
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateProductAction(id: string, formData: FormData) {
  try {
    const file = formData.get("image_file") as File | null;
    const uploadedUrl = await uploadProductImage(file);
    const existingUrl = formData.get("existing_image_url") as string;

    const supabase = createAdminClient();
    const product = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      category: formData.get("category") as string,
      is_available: formData.get("is_available") === "true",
      whatsapp_text: (formData.get("whatsapp_text") as string) || null,
      // Kalau upload baru, pakai url baru. Kalau tidak, pakai yang lama.
      ...(uploadedUrl ? { image_url: uploadedUrl } : { image_url: existingUrl || null }),
    };
    
    const { error } = await supabase.from("products").update(product).eq("id", id);
    if (error) return { error: error.message };
    
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function toggleAvailabilityAction(id: string, currentState: boolean) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("products")
    .update({ is_available: !currentState })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProductAction(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

// ============================================
//  SETTINGS ACTIONS
// ============================================

/**
 * Upsert settings — insert jika belum ada, update jika sudah ada.
 * Butuh tabel settings dengan kolom: key (PK), value, updated_at
 */
export async function updateSettingsAction(formData: FormData) {
  const supabase = createAdminClient();

  const keys = [
    "store_name",
    "wa_number",
    "ig_link",
    "tiktok_link",
    "operational_hours",
    "announcement",
    "tagline",
    "terms_and_conditions",
  ];

  const upsertData = keys.map((key) => ({
    key,
    value: (formData.get(key) as string) ?? "",
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("settings")
    .upsert(upsertData, { onConflict: "key" });

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}

// ============================================
//  REVIEW ACTIONS
// ============================================

export async function getAllReviewsAdmin() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data ?? [];
}

// Helper untuk upload gambar review
async function uploadReviewImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  
  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Ukuran gambar maksimal 2MB!");
  }

  const supabase = createAdminClient();
  const fileExt = file.name.split('.').pop() || "png";
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  const { error } = await supabase.storage
    .from('review-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw new Error(`Gagal upload gambar review: ${error.message}`);
  }

  const { data } = supabase.storage
    .from('review-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function createReviewAction(formData: FormData) {
  try {
    const file = formData.get("image_file") as File | null;
    const uploadedUrl = await uploadReviewImage(file);

    const supabase = createAdminClient();
    const review = {
      name: formData.get("name") as string,
      avatar_emoji: (formData.get("avatar_emoji") as string) || "👤",
      text: formData.get("text") as string,
      rating: Number(formData.get("rating")) || 5,
      product: formData.get("product") as string,
      location: formData.get("location") as string,
      image_url: uploadedUrl,
      is_approved: true, // Auto approve jika dibuat dari admin
    };
    const { error } = await supabase.from("reviews").insert([review]);
    if (error) return { error: error.message };
    revalidatePath("/");
    revalidatePath("/reviews");
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function toggleReviewStatusAction(id: string, currentState: boolean) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("reviews")
    .update({ is_approved: !currentState })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
  return { success: true };
}

export async function deleteReviewAction(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
  return { success: true };
}
