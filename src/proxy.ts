import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "stiker-admin-auth";
const ADMIN_PREFIX = "/admin";

async function getMaintenanceStatus(): Promise<boolean> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const res = await fetch(
      `${supabaseUrl}/rest/v1/settings?key=eq.maintenance_mode&select=value&limit=1`,
      {
        headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
        cache: "no-store",
      }
    );
    if (!res.ok) return false;
    const data: Array<{ value: string }> = await res.json();
    return data?.[0]?.value === "true";
  } catch {
    return false; // Kalau Supabase down, jangan block user
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith(ADMIN_PREFIX);
  const isMaintenancePage = pathname === "/maintenance";
  const isLoginPage = pathname === "/admin/login";

  // 1. Proteksi admin — redirect ke login kalau belum auth
  if (isAdminRoute && !isLoginPage) {
    const authCookie = request.cookies.get(COOKIE_NAME);

    if (!authCookie?.value || authCookie.value !== "supabase_authorized") {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }

    // Admin terautentikasi — lanjut tanpa cek maintenance
    return NextResponse.next();
  }

  // 2. Maintenance check — hanya untuk public routes
  const isMaintenanceActive = await getMaintenanceStatus();

  if (isMaintenanceActive && !isMaintenancePage) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  if (!isMaintenanceActive && isMaintenancePage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons|images|og-image|api).*)",
  ],
};
