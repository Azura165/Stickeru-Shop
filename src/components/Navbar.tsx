"use client";

import Link from "next/link";
import { useRef, useCallback } from "react";
import { SiteSettings } from "@/types";

interface NavbarProps {
  settings: SiteSettings;
}

export default function Navbar({ settings }: NavbarProps) {
  const headerRef = useRef<HTMLElement>(null);

  // Direct DOM toggle — NO React state → NO re-render → INP jauh lebih kecil
  const handleToggle = useCallback(() => {
    const header = headerRef.current;
    if (!header) return;
    const isOpen = header.getAttribute("data-menu-open") === "true";
    header.setAttribute("data-menu-open", String(!isOpen));
  }, []);

  const handleClose = useCallback(() => {
    headerRef.current?.setAttribute("data-menu-open", "false");
  }, []);

  const waLink = `https://wa.me/${settings.wa_number}?text=${encodeURIComponent(
    "Halo kak! Saya mau tanya-tanya soal stiker nih 😊"
  )}`;

  const navLinks = [
    { href: "/",            label: "Beranda" },
    { href: "/#koleksi",    label: "Koleksi" },
    { href: "/#cara-order", label: "Cara Order" },
    { href: "/#faq",        label: "FAQ" },
  ];

  return (
    <header
      ref={headerRef}
      data-menu-open="false"
      className="sticky top-0 z-50 bg-white"
      style={{ borderBottom: "4px solid #1e1b4b" }}
    >
      <nav
        className="max-w-6xl mx-auto px-4"
        style={{
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        aria-label="Navigasi utama"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ textDecoration: "none" }}
          onClick={handleClose}
        >
          <span style={{ fontSize: "1.5rem" }}>🎀</span>
          <span
            className="font-pixel"
            style={{ fontSize: "1.4rem", color: "#1e1b4b", letterSpacing: "0.02em" }}
          >
            {settings.store_name.toUpperCase()}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div
          className="items-center gap-6"
          style={{ display: "none" }}
          id="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#1e1b4b",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: "1rem", padding: "0.45rem 1.1rem" }}
          >
            💬 Hubungi WA
          </a>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={handleToggle}
          aria-label="Toggle menu navigasi"
          aria-controls="mobile-menu"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "0.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          id="hamburger-btn"
        >
          <span
            className="hamburger-line"
            style={{ display: "block", width: "24px", height: "2px", backgroundColor: "#1e1b4b", borderRadius: "2px", transition: "transform 0.2s ease" }}
          />
          <span
            className="hamburger-line"
            style={{ display: "block", width: "24px", height: "2px", backgroundColor: "#1e1b4b", borderRadius: "2px", transition: "opacity 0.2s ease" }}
          />
          <span
            className="hamburger-line"
            style={{ display: "block", width: "24px", height: "2px", backgroundColor: "#1e1b4b", borderRadius: "2px", transition: "transform 0.2s ease" }}
          />
        </button>
      </nav>

      {/* Mobile Menu — hidden by default via CSS, toggled via data attribute */}
      <div
        id="mobile-menu"
        className="mobile-menu bg-white px-4 py-4 flex-col gap-4"
        style={{ borderTop: "3px solid #1e1b4b", display: "none" }}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={handleClose}
            style={{ fontWeight: 600, color: "#1e1b4b", textDecoration: "none" }}
          >
            {link.label}
          </a>
        ))}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ fontSize: "1.1rem", textAlign: "center" }}
          onClick={handleClose}
        >
          💬 Hubungi WA
        </a>
      </div>

      {/* CSS-driven responsive + toggle behavior */}
      <style>{`
        /* Desktop: tampilkan nav links, sembunyikan hamburger */
        @media (min-width: 768px) {
          #desktop-nav { display: flex !important; }
          #hamburger-btn { display: none !important; }
          #mobile-menu { display: none !important; }
        }

        /* Mobile toggle via data attribute — NO JS layout → better INP */
        header[data-menu-open="true"] #mobile-menu {
          display: flex !important;
        }
      `}</style>
    </header>
  );
}
