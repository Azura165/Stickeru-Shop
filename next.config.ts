import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================
  //  PERFORMANCE — Image optimization
  // ============================================
  images: {
    // Supabase Storage domain untuk gambar produk
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jymwskeshtkfcovtzyoy.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Format modern untuk performa terbaik
    formats: ["image/avif", "image/webp"],
  },

  // ============================================
  //  SECURITY HEADERS
  // ============================================
  async headers() {
    return [
      {
        // Apply ke semua route
        source: "/:path*",
        headers: [
          // Cegah clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Cegah MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer policy
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy — matikan fitur browser yang gak dipakai
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // HSTS — force HTTPS di production
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Content-Security-Policy — cegah XSS
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js dev & React tools need eval
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://jymwskeshtkfcovtzyoy.supabase.co",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\\.(png|jpg|jpeg|gif|svg|ico|webp|avif|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ============================================
  //  REDIRECTS — Pastikan trailing slash konsisten
  // ============================================
  async redirects() {
    return [
      {
        source: "/admin/",
        destination: "/admin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
