import Link from "next/link";
import { getAllReviewsAdmin, toggleReviewStatusAction, deleteReviewAction } from "@/lib/actions";

export default async function AdminReviewsPage() {
  const reviews = await getAllReviewsAdmin();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f3ff" }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-pixel text-3xl" style={{ color: "#1e1b4b" }}>KELOLA REVIEWS</h2>
          <Link href="/admin/reviews/new" className="btn-primary" style={{ fontSize: "1.1rem" }}>
            ➕ TAMBAH REVIEW
          </Link>
        </div>

        <div className="rounded-xl overflow-hidden" style={{ border: "3px solid #1e1b4b", boxShadow: "6px 6px 0px 0px #1e1b4b" }}>
          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr style={{ backgroundColor: "#1e1b4b", color: "#ffffff" }}>
                  <th className="font-pixel text-left px-4 py-3 text-sm">PELANGGAN</th>
                  <th className="font-pixel text-left px-4 py-3 text-sm">REVIEW</th>
                  <th className="font-pixel text-center px-4 py-3 text-sm">RATING</th>
                  <th className="font-pixel text-center px-4 py-3 text-sm">STATUS</th>
                  <th className="font-pixel text-center px-4 py-3 text-sm">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16" style={{ color: "#4c1d95" }}>
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl">💬</span>
                        <p className="font-pixel text-xl">BELUM ADA REVIEW</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  reviews.map((r, i) => (
                    <tr key={r.id} className="border-b transition-colors hover:bg-[#f5f3ff]" style={{ borderColor: "#ede9fe", backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafafa" }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: "#ede9fe", border: "2px solid #1e1b4b" }}>
                            {r.avatar_emoji}
                          </div>
                          <div>
                            <p className="font-semibold text-sm" style={{ color: "#1e1b4b" }}>{r.name}</p>
                            <p className="text-xs" style={{ color: "#6d28d9" }}>{r.product}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs line-clamp-2 max-w-xs" style={{ color: "#1e1b4b", lineHeight: 1.5 }}>
                          "{r.text}"
                        </p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-bold" style={{ color: "#f59e0b" }}>{r.rating} ★</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <form action={async () => {
                          "use server";
                          await toggleReviewStatusAction(r.id, r.is_approved);
                        }}>
                          <button type="submit" className="badge cursor-pointer neo-hover" style={{ backgroundColor: r.is_approved ? "#d1fae5" : "#fce7f3", color: r.is_approved ? "#065f46" : "#9d174d" }}>
                            {r.is_approved ? "✅ TAMPIL" : "🙈 HIDDEN"}
                          </button>
                        </form>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <form action={async () => {
                            "use server";
                            await deleteReviewAction(r.id);
                          }}>
                            <button type="submit" className="badge neo-hover" style={{ backgroundColor: "#fce7f3", color: "#9d174d", cursor: "pointer" }}>
                              🗑️ HAPUS
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
