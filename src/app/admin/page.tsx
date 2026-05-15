import Link from "next/link";
import { getAllProductsAdmin, logoutAction, toggleAvailabilityAction, deleteProductAction } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";

const CATEGORY_BADGE: Record<string, { bg: string; text: string; emoji: string }> = {
  anime:    { bg: "#ede9fe", text: "#6d28d9", emoji: "⚔️" },
  manhwa:   { bg: "#fde68a", text: "#1e1b4b", emoji: "📖" },
  trending: { bg: "#fce7f3", text: "#9d174d", emoji: "🔥" },
  custom:   { bg: "#d1fae5", text: "#065f46", emoji: "✨" },
};

export default async function AdminDashboard() {
  const products = await getAllProductsAdmin();
  const totalProducts = products.length;
  const availableProducts = products.filter((p) => p.is_available).length;
  const hiddenProducts = totalProducts - availableProducts;

  return (
    <div>
      {/* Main Content dihandle oleh AdminLayout */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Produk", value: totalProducts, emoji: "📦", bg: "#ede9fe" },
            { label: "Aktif / Tampil", value: availableProducts, emoji: "✅", bg: "#d1fae5" },
            { label: "Disembunyikan", value: hiddenProducts, emoji: "🙈", bg: "#fce7f3" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl p-5"
              style={{ backgroundColor: stat.bg, border: "3px solid #1e1b4b", boxShadow: "5px 5px 0px 0px #1e1b4b" }}>
              <p className="text-2xl mb-1">{stat.emoji}</p>
              <p className="font-pixel text-4xl" style={{ color: "#1e1b4b" }}>{stat.value}</p>
              <p className="text-sm font-medium mt-1" style={{ color: "#4c1d95" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Header + Add Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-pixel text-3xl" style={{ color: "#1e1b4b" }}>KELOLA PRODUK</h2>
          <Link href="/admin/products/new" className="btn-primary" style={{ fontSize: "1.1rem" }}>
            ➕ TAMBAH PRODUK
          </Link>
        </div>

        {/* Products Table */}
        <div className="rounded-xl overflow-hidden" style={{ border: "3px solid #1e1b4b", boxShadow: "6px 6px 0px 0px #1e1b4b" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "#1e1b4b", color: "#ffffff" }}>
                  <th className="font-pixel text-left px-4 py-3 text-sm">PRODUK</th>
                  <th className="font-pixel text-left px-4 py-3 text-sm">KATEGORI</th>
                  <th className="font-pixel text-left px-4 py-3 text-sm">HARGA</th>
                  <th className="font-pixel text-center px-4 py-3 text-sm">STATUS</th>
                  <th className="font-pixel text-center px-4 py-3 text-sm">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16" style={{ color: "#4c1d95" }}>
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl">📦</span>
                        <p className="font-pixel text-xl">BELUM ADA PRODUK</p>
                        <Link href="/admin/products/new" className="btn-primary mt-2" style={{ fontSize: "1rem" }}>
                          ➕ Tambah Produk Pertama
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((product, i) => {
                    const cat = CATEGORY_BADGE[product.category] ?? { bg: "#ede9fe", text: "#6d28d9", emoji: "🎨" };
                    return (
                      <tr key={product.id}
                        className="border-b transition-colors hover:bg-[#f5f3ff]"
                        style={{ borderColor: "#ede9fe", backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafafa" }}>
                        {/* Produk */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                              style={{ backgroundColor: "#ede9fe", border: "2px solid #1e1b4b" }}>
                              🎨
                            </div>
                            <div>
                              <p className="font-semibold text-sm" style={{ color: "#1e1b4b" }}>{product.name}</p>
                              <p className="text-xs line-clamp-1" style={{ color: "#6d28d9" }}>{product.description}</p>
                            </div>
                          </div>
                        </td>
                        {/* Kategori */}
                        <td className="px-4 py-3">
                          <span className="badge text-xs" style={{ backgroundColor: cat.bg, color: cat.text }}>
                            {cat.emoji} {product.category.toUpperCase()}
                          </span>
                        </td>
                        {/* Harga */}
                        <td className="px-4 py-3">
                          <span className="font-pixel text-lg" style={{ color: "#6d28d9" }}>
                            {formatPrice(product.price)}
                          </span>
                        </td>
                        {/* Status Toggle */}
                        <td className="px-4 py-3 text-center">
                          <form action={async () => {
                            "use server";
                            await toggleAvailabilityAction(product.id, product.is_available);
                          }}>
                            <button type="submit"
                              className="badge cursor-pointer neo-hover"
                              style={{
                                backgroundColor: product.is_available ? "#d1fae5" : "#fce7f3",
                                color: product.is_available ? "#065f46" : "#9d174d",
                              }}>
                              {product.is_available ? "✅ AKTIF" : "🙈 HIDDEN"}
                            </button>
                          </form>
                        </td>
                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <Link href={`/admin/products/${product.id}/edit`}
                              className="badge neo-hover" style={{ backgroundColor: "#ede9fe", color: "#6d28d9", cursor: "pointer" }}>
                              ✏️ EDIT
                            </Link>
                            <form action={async () => {
                              "use server";
                              await deleteProductAction(product.id);
                            }}>
                              <button type="submit"
                                className="badge neo-hover"
                                style={{ backgroundColor: "#fce7f3", color: "#9d174d", cursor: "pointer" }}>
                                🗑️ HAPUS
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
