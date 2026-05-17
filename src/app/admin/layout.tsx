"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { logoutAction } from "@/lib/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Jangan render navbar di halaman login
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Tentukan background berbeda untuk tiap tombol sesuai request
  const navLinks = [
    { href: "/admin", label: "📦 PRODUK", bg: "#fde68a", text: "#1e1b4b" },
    { href: "/admin/reviews", label: "💬 REVIEWS", bg: "#e9d5ff", text: "#1e1b4b" },
    { href: "/admin/users", label: "👥 ADMIN", bg: "#bfdbfe", text: "#1e4080" },
    { href: "/admin/settings", label: "⚙️ SETTINGS", bg: "#d1fae5", text: "#065f46" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f3ff" }}>
      {/* 1. HEADER CONTAINER - Sticky, White Bg, Thick Border */}
      <header 
        className="sticky top-0 z-50 bg-white"
        style={{ borderBottom: "4px solid #1e1b4b" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <span className="text-xl">🎀</span>
            <Link href="/admin" className="font-pixel text-xl transition-colors hover:text-[#6d28d9]" style={{ color: "#1e1b4b" }}>
              ADMIN PANEL
            </Link>
          </div>

          {/* 2. DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-5">
            <Link 
              href="/" 
              target="_blank"
              className="text-sm font-semibold hover:text-[#6d28d9] transition-colors"
              style={{ color: "#4c1d95" }}
            >
              🌐 Lihat Toko →
            </Link>

            <nav className="flex items-center gap-3">
              {navLinks.map((link) => {
                const isActive = link.href === "/admin" 
                  ? pathname === "/admin" 
                  : pathname.includes(link.href);

                // Jika active route, kita paksa style-nya punya hard shadow biar ketara
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-bold px-5 py-2 rounded-full text-sm transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b4b] ${
                      isActive ? "shadow-[4px_4px_0px_0px_#1e1b4b] -translate-y-1" : ""
                    }`}
                    style={{
                      backgroundColor: isActive ? "#f9a8d4" : link.bg, // bg-pink-300 kalo active
                      color: isActive ? "#9d174d" : link.text,
                      border: "2px solid #1e1b4b",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              {/* Logout Button (Dark Purple) */}
              <form action={logoutAction}>
                <button 
                  type="submit"
                  className="font-bold px-5 py-2 rounded-full text-sm transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#1e1b4b] cursor-pointer"
                  style={{ 
                    backgroundColor: "#4c1d95", 
                    color: "#ffffff", 
                    border: "2px solid #1e1b4b" 
                  }}
                >
                  🚪 LOGOUT
                </button>
              </form>
            </nav>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="md:hidden p-2 rounded-lg font-bold text-sm transition-all cursor-pointer"
            style={{ 
              border: "2px solid #1e1b4b", 
              backgroundColor: isOpen ? "#1e1b4b" : "#fde68a",
              color: isOpen ? "#ffffff" : "#1e1b4b",
              boxShadow: isOpen ? "none" : "3px 3px 0 0 #1e1b4b" 
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖ TUTUP" : "☰ MENU"}
          </button>
        </div>

        {/* 3. MOBILE NAVIGATION FIX - Absolute Dropdown */}
        {isOpen && (
          <div 
            className="absolute top-full left-0 w-full bg-white flex flex-col gap-3 p-4 md:hidden"
            style={{ borderBottom: "4px solid #1e1b4b", boxShadow: "0px 8px 15px -3px rgba(30,27,75,0.15)" }}
          >
            {navLinks.map((link) => {
               const isActive = link.href === "/admin" 
                 ? pathname === "/admin" 
                 : pathname.includes(link.href);

               return (
                 <Link
                   key={link.href}
                   href={link.href}
                   onClick={() => setIsOpen(false)}
                   className={`font-bold px-4 py-3 rounded-lg block text-center transition-all ${
                     isActive ? "shadow-[3px_3px_0px_0px_#1e1b4b] -translate-y-[2px]" : ""
                   }`}
                   style={{
                     backgroundColor: isActive ? "#f9a8d4" : link.bg,
                     color: isActive ? "#9d174d" : link.text,
                     border: "3px solid #1e1b4b",
                   }}
                 >
                   {link.label}
                 </Link>
               );
            })}
            <form action={logoutAction} className="w-full">
              <button 
                type="submit"
                onClick={() => setIsOpen(false)}
                className="font-bold px-4 py-3 rounded-lg w-full text-center cursor-pointer shadow-[3px_3px_0px_0px_#1e1b4b]"
                style={{ 
                  backgroundColor: "#4c1d95", 
                  color: "#ffffff", 
                  border: "3px solid #1e1b4b"
                }}
              >
                🚪 LOGOUT
              </button>
            </form>
          </div>
        )}
      </header>

      {/* 4. MAIN WRAPPER - Appropriate padding, clean flow */}
      <main className="max-w-7xl mx-auto p-6 md:p-8 w-full overflow-x-auto">
        {children}
      </main>
    </div>
  );
}
