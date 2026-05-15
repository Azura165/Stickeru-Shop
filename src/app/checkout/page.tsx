import { getSiteSettings } from "@/lib/supabase";
import CheckoutClient from "@/components/CheckoutClient";

export const dynamic = 'force-dynamic';

export default async function CheckoutPage() {
  const settings = await getSiteSettings();

  return (
    <main>
      <CheckoutClient waNumber={settings.wa_number} />
    </main>
  );
}
