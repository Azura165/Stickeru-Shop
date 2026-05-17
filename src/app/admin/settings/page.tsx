import { getSiteSettings } from "@/lib/supabase";
import { getMaintenanceModeAction } from "@/lib/admin-actions";
import SettingsForm from "@/components/admin/SettingsForm";
import MaintenanceToggle from "@/components/admin/MaintenanceToggle";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const [settings, isMaintenanceActive] = await Promise.all([
    getSiteSettings(),
    getMaintenanceModeAction(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-pixel text-3xl md:text-4xl mb-2" style={{ color: "#1e1b4b" }}>⚙️ PENGATURAN TOKO</h1>
        <p className="font-semibold" style={{ color: "#4c1d95" }}>
          Kelola informasi toko, nomor WhatsApp, dan status operasional.
        </p>
      </div>

      {/* Maintenance Mode Toggle - Di paling atas biar keliatan */}
      <MaintenanceToggle initialValue={isMaintenanceActive} />

      {/* Settings Form */}
      <SettingsForm settings={settings} />
    </div>
  );
}
