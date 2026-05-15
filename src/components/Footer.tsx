import { SiteSettings } from "@/types";

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();
  const waLink = `https://wa.me/${settings.wa_number}`;

  const socialLinks = [
    {
      name: "WhatsApp",
      href: waLink,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: settings.ig_link,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: settings.tiktok_link,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
        </svg>
      ),
    },
  ];

  return (
    <footer id="tentang" style={{ backgroundColor: "#1e1b4b", borderTop: "4px solid #1e1b4b", color: "#ffffff" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎀</span>
              <span className="font-pixel text-3xl text-white">{settings.store_name.toUpperCase()}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#c4b5fd" }}>
              {settings.tagline}. Kualitas premium, harga terjangkau!
            </p>
            <div className="flex gap-3 mt-2">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                  aria-label={link.name} className="neo-hover flex items-center justify-center w-10 h-10 rounded-lg"
                  style={{ backgroundColor: "#6d28d9", border: "2px solid #ffffff", boxShadow: "3px 3px 0px 0px #ffffff", color: "#ffffff" }}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-pixel text-xl" style={{ color: "#fde68a" }}>QUICK LINKS</h3>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Koleksi Stiker",    href: "#koleksi" },
                { label: "Cara Order",        href: "#cara-order" },
                { label: "FAQ",              href: "#faq" },
                { label: "Custom Order",     href: waLink },
                { label: "Review Pelanggan", href: "/reviews" },
                { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
              ].map((link) => (
                <a key={link.label} href={link.href}
                  className="text-sm hover:text-white transition-colors hover:underline" style={{ color: "#c4b5fd" }}>
                  → {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-pixel text-xl" style={{ color: "#fde68a" }}>HUBUNGI KAMI</h3>
            <div className="flex flex-col gap-3">
              <p className="text-sm" style={{ color: "#c4b5fd" }}>
                ⏰ Jam operasional: {settings.operational_hours}
              </p>
              <p className="text-sm" style={{ color: "#c4b5fd" }}>📦 Pengiriman ke seluruh Indonesia</p>
              <a href={`${waLink}?text=${encodeURIComponent("Halo! Saya mau order stiker custom 🎨")}`}
                target="_blank" rel="noopener noreferrer" className="btn-wa mt-2" style={{ fontSize: "1.1rem" }}>
                💬 ORDER VIA WA
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "3px solid #6d28d9", backgroundColor: "#0f0e2a" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "#a78bfa" }}>
            © {year} {settings.store_name}. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="/syarat-ketentuan" className="text-xs hover:text-white transition-colors" style={{ color: "#6d28d9", textDecoration: "underline" }}>
              Syarat &amp; Ketentuan
            </a>
            <a href="/reviews" className="text-xs hover:text-white transition-colors" style={{ color: "#6d28d9", textDecoration: "underline" }}>
              Review Pelanggan
            </a>
            <p className="font-pixel text-sm" style={{ color: "#6d28d9" }}>MADE WITH ❤️ IN INDONESIA</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
