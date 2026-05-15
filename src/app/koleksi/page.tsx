import { getProductsPaginated, getSiteSettings } from "@/lib/supabase";
import ProductGrid from "@/components/ProductGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWAButton from "@/components/FloatingWAButton";
import CartSidebar from "@/components/CartSidebar";
import Pagination from "@/components/Pagination";
import CategoryTabs from "@/components/CategoryTabs";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default async function KoleksiPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : "all";
  const limit = 8; // 8 products per page

  const [settings, { products, totalCount }] = await Promise.all([
    getSiteSettings(),
    getProductsPaginated({ page, limit, category })
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <>
      <Navbar settings={settings} />
      <main className="min-h-screen" style={{ backgroundColor: "#f5f3ff", paddingTop: "4rem", paddingBottom: "5rem" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div 
            className="w-full bg-[#fde68a] p-8 md:p-10 rounded-3xl text-center mb-8 transition-all hover:translate-y-1 hover:shadow-[4px_4px_0_0_#1e1b4b]"
            style={{ border: "4px solid #1e1b4b", boxShadow: "8px 8px 0px 0px #1e1b4b" }}
          >
            <h1 className="font-pixel text-3xl md:text-5xl mb-4" style={{ color: "#1e1b4b" }}>
              SEMUA KOLEKSI STICKERU
            </h1>
            <p className="font-bold text-lg" style={{ color: "#4c1d95" }}>
              Temukan stiker favoritmu dari ribuan koleksi kami!
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center mb-10" style={{ gap: "1rem" }}>
            <span className="font-pixel px-4 py-2 rounded-xl text-sm md:text-base" style={{ backgroundColor: "#c4b5fd", color: "#1e1b4b", border: "3px solid #1e1b4b", boxShadow: "3px 3px 0 0 #1e1b4b" }}>
              🎀 KOLEKSI LENGKAP
            </span>
            <h2 className="font-pixel" style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", color: "#1e1b4b" }}>
              PILIH STIKERMU
            </h2>
            <p className="text-sm md:text-base mb-2" style={{ color: "#4c1d95", maxWidth: "28rem" }}>
              Semua stiker dicetak dengan tinta premium, anti-air, dan siap tempel di mana aja!
            </p>
            <CategoryTabs />
          </div>
          
          <Suspense 
            key={category + page} 
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            }
          >
            {products.length === 0 ? (
              <div className="w-full bg-white p-12 text-center rounded-2xl my-8" style={{ border: "4px solid #1e1b4b", boxShadow: "8px 8px 0px 0px #1e1b4b" }}>
                <span className="text-6xl block mb-4 animate-bounce">🥲</span>
                <h3 className="font-pixel text-2xl mb-2" style={{ color: "#1e1b4b" }}>Belum ada stiker di kategori ini</h3>
                <p className="font-bold text-lg" style={{ color: "#4c1d95" }}>Coba pilih kategori lain atau cek lagi nanti ya!</p>
              </div>
            ) : (
              <ProductGrid products={products} waNumber={settings.wa_number} featuredOnly={false} serverPagination={true} />
            )}
          </Suspense>
          
          {/* Server-Side Pagination Component */}
          <Pagination totalPages={totalPages} />
        </div>
      </main>
      <Footer settings={settings} />
      <FloatingWAButton waNumber={settings.wa_number} />
      <CartSidebar />
    </>
  );
}
