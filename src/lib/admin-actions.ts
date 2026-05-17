"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase";
import { createServiceClient } from "@/lib/supabase-admin";

// ============================================
//  ADMIN USER MANAGEMENT ACTIONS
// ============================================

export type AdminUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
};

/**
 * List semua admin users dari Supabase Auth.
 * Butuh SUPABASE_SERVICE_ROLE_KEY.
 */
export async function getAdminUsersAction(): Promise<{ users?: AdminUser[]; error?: string }> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) return { error: error.message };
    
    const users: AdminUser[] = data.users.map((u) => ({
      id: u.id,
      email: u.email ?? "(no email)",
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at ?? null,
    }));
    
    return { users };
  } catch (err: any) {
    return { error: err.message ?? "Gagal mengambil data admin." };
  }
}

/**
 * Buat admin user baru lewat Supabase Auth Admin.
 */
export async function createAdminUserAction(formData: FormData): Promise<{ success?: boolean; error?: string }> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const name = (formData.get("name") as string)?.trim();

  if (!email || !password || password.length < 6) {
    return { error: "Email wajib diisi & password minimal 6 karakter." };
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto confirm tanpa perlu verifikasi email
      user_metadata: { name: name || email.split("@")[0] },
    });
    if (error) return { error: error.message };
    revalidatePath("/admin/users");
    return { success: true };
  } catch (err: any) {
    return { error: err.message ?? "Gagal membuat admin." };
  }
}

/**
 * Hapus admin user by ID.
 */
export async function deleteAdminUserAction(userId: string): Promise<{ success?: boolean; error?: string }> {
  if (!userId) return { error: "User ID tidak valid." };
  
  try {
    const supabase = createServiceClient();
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) return { error: error.message };
    revalidatePath("/admin/users");
    return { success: true };
  } catch (err: any) {
    return { error: err.message ?? "Gagal menghapus admin." };
  }
}

/**
 * Update password admin user.
 */
export async function updateAdminPasswordAction(formData: FormData): Promise<{ success?: boolean; error?: string }> {
  const userId = formData.get("user_id") as string;
  const newPassword = formData.get("new_password") as string;

  if (!userId || !newPassword || newPassword.length < 6) {
    return { error: "User ID & password baru (min 6 karakter) wajib diisi." };
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword,
    });
    if (error) return { error: error.message };
    revalidatePath("/admin/users");
    return { success: true };
  } catch (err: any) {
    return { error: err.message ?? "Gagal update password." };
  }
}

// ============================================
//  MAINTENANCE MODE ACTIONS
// ============================================

export async function toggleMaintenanceModeAction(isActive: boolean): Promise<{ success?: boolean; error?: string }> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("settings")
      .upsert(
        { key: "maintenance_mode", value: isActive ? "true" : "false", updated_at: new Date().toISOString() },
        { onConflict: "key" }
      );

    if (error) return { error: error.message };

    revalidatePath("/");
    revalidatePath("/koleksi");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

/**
 * Baca status maintenance mode langsung dari Supabase (no cache).
 */
export async function getMaintenanceModeAction(): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "maintenance_mode")
      .single();
    return data?.value === "true";
  } catch {
    return false;
  }
}
