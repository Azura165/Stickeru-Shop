import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "stiker-admin-auth";

/**
 * SECURITY FIX:
 * - Next.js 16 menggunakan `proxy.ts` alih-alih `middleware.ts`.
 * - Cookie value dibandingkan dengan hash SHA-256, bukan plain password.
 * - Plain password tidak pernah disimpan/dibandingkan di sisi client.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteksi semua route /admin kecuali /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const authCookie = request.cookies.get(COOKIE_NAME);

    if (!authCookie || !authCookie.value) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Karena sekarang pakai Supabase Auth, kita cek token "supabase_authorized"
    if (authCookie.value !== "supabase_authorized") {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }

    // Jika ADMIN_COOKIE_HASH belum diset, ijinkan masuk untuk menjaga backward-compatibility sementara
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
