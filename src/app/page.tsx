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
import ComingSoonBanner from "@/components/ComingSoonBanner";
import { getSiteSettings, getProductsPaginated } from "@/lib/supabase";

export const revalidate = 3600;

export default async function HomePage() {
  const [settings, supabaseProducts] = await Promise.all([
    getSiteSettings(),
    getProductsPaginated({ page: 1, limit: 8 }),
  ]);

  const products = supabaseProducts.products;
  const isComingSoon = products.length === 0;

  return (
    <>
      <AnnouncementBanner text={settings.announcement} />
      <Navbar settings={settings} />
      <main id="main-content">
        <HeroSection settings={settings} />
        {isComingSoon ? (
          <section className="px-4 py-12">
            <ComingSoonBanner
              message="🎨 Aldo lagi ngegambar stikernya... Stiker premium pertama kami segera hadir!"
              mode="section"
              waNumber={settings.wa_number}
              igLink={settings.ig_link}
            />
          </section>
        ) : (
          <ProductGrid products={products} waNumber={settings.wa_number} featuredOnly={true} />
        )}
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
