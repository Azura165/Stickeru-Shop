import Navbar from "@/components/Navbar";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import HowToOrder from "@/components/HowToOrder";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingWAButton from "@/components/FloatingWAButton";
import CartSidebar from "@/components/CartSidebar";
import { getSiteSettings, getProductsPaginated } from "@/lib/supabase";
import { DUMMY_PRODUCTS } from "@/lib/utils";

/**
 * ISR — Halaman di-cache dan di-revalidate setiap 60 detik.
 * Jadi perubahan produk/settings di admin akan tampil max 60 detik kemudian.
 * Ini jauh lebih cepat daripada SSR murni.
 */
export const revalidate = 3600; // Cache for 1 hour

export default async function HomePage() {
  // Fetch settings & products secara parallel dari Supabase
  const [settings, supabaseProducts] = await Promise.all([
    getSiteSettings(),
    getProductsPaginated({ page: 1, limit: 6 }),
  ]);

  // Fallback ke dummy data kalau Supabase belum ada isinya
  const products = supabaseProducts.products.length > 0 ? supabaseProducts.products : DUMMY_PRODUCTS;

  return (
    <>
      <AnnouncementBanner text={settings.announcement} />
      <Navbar settings={settings} />
      <main id="main-content">
        <HeroSection settings={settings} />
        <ProductGrid products={products} waNumber={settings.wa_number} featuredOnly={true} />
        <HowToOrder />
        <Testimonials />
        <FAQ />
      </main>
      <Footer settings={settings} />
      <FloatingWAButton waNumber={settings.wa_number} />
      <CartSidebar />
    </>
  );
}
