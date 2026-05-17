import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

/**
 * Supabase Admin Client menggunakan SERVICE_ROLE_KEY.
 * ⚠️  HANYA digunakan di Server Actions / API Routes.
 * JANGAN pernah expose key ini ke client-side.
 * Key ini bisa bypass RLS dan manage Auth users.
 */
export function createServiceClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set in environment variables.");
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
