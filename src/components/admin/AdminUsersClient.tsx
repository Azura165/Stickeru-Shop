"use client";

import { useState, useTransition, useEffect } from "react";
import {
  getAdminUsersAction,
  createAdminUserAction,
  deleteAdminUserAction,
  updateAdminPasswordAction,
  type AdminUser,
} from "@/lib/admin-actions";

export default function AdminUsersClient() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // State form add user
  const [addForm, setAddForm] = useState({ name: "", email: "", password: "" });
  const [addMsg, setAddMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // State change password per-user
  const [pwModal, setPwModal] = useState<AdminUser | null>(null);
  const [newPw, setNewPw] = useState("");
  const [pwMsg, setPwMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // State delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const [deleteMsg, setDeleteMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function fetchUsers() {
    startTransition(async () => {
      const result = await getAdminUsersAction();
      if (result.error) {
        setFetchError(result.error);
      } else {
        setUsers(result.users ?? []);
      }
    });
  }

  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    setAddMsg(null);
    const fd = new FormData();
    fd.append("name", addForm.name);
    fd.append("email", addForm.email);
    fd.append("password", addForm.password);
    const res = await createAdminUserAction(fd);
    if (res.error) {
      setAddMsg({ type: "error", text: res.error });
    } else {
      setAddMsg({ type: "success", text: `Admin "${addForm.email}" berhasil ditambahkan! 🎉` });
      setAddForm({ name: "", email: "", password: "" });
      fetchUsers();
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteMsg(null);
    const res = await deleteAdminUserAction(deleteTarget.id);
    if (res.error) {
      setDeleteMsg({ type: "error", text: res.error });
    } else {
      setDeleteMsg({ type: "success", text: `Admin dihapus.` });
      setDeleteTarget(null);
      fetchUsers();
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!pwModal) return;
    setPwMsg(null);
    const fd = new FormData();
    fd.append("user_id", pwModal.id);
    fd.append("new_password", newPw);
    const res = await updateAdminPasswordAction(fd);
    if (res.error) {
      setPwMsg({ type: "error", text: res.error });
    } else {
      setPwMsg({ type: "success", text: "Password berhasil diubah! 🔐" });
      setNewPw("");
      setTimeout(() => { setPwModal(null); setPwMsg(null); }, 1500);
    }
  }

  const inputStyle = {
    border: "3px solid #1e1b4b",
    borderRadius: "10px",
    backgroundColor: "#f5f3ff",
    color: "#1e1b4b",
    boxShadow: "4px 4px 0 0 #1e1b4b",
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="font-pixel text-3xl md:text-4xl mb-2" style={{ color: "#1e1b4b" }}>👥 KELOLA ADMIN</h1>
        <p className="font-semibold" style={{ color: "#4c1d95" }}>
          Manage siapa aja yang punya akses ke Admin Panel Stickeru.
        </p>
      </div>


      {/* SECTION: Daftar Admin */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "4px solid #1e1b4b", boxShadow: "8px 8px 0 0 #1e1b4b" }}>
        <div className="p-5 border-b-4 border-[#1e1b4b]" style={{ backgroundColor: "#e9d5ff" }}>
          <h2 className="font-pixel text-xl" style={{ color: "#1e1b4b" }}>
            DAFTAR ADMIN ({isPending ? "..." : users.length})
          </h2>
        </div>
        <div className="p-5">
          {fetchError ? (
            <div className="bg-red-50 p-4 rounded-xl border-2 border-red-400 text-red-700 font-semibold">
              ❌ {fetchError}
              <br />
              <span className="text-sm font-normal">Pastikan SUPABASE_SERVICE_ROLE_KEY sudah di-set dengan benar.</span>
            </div>
          ) : isPending ? (
            <div className="text-center py-10 font-pixel text-xl" style={{ color: "#6d28d9" }}>Loading...</div>
          ) : users.length === 0 ? (
            <p className="font-semibold text-center py-8" style={{ color: "#4c1d95" }}>Belum ada admin terdaftar.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl"
                  style={{ border: "3px solid #1e1b4b", backgroundColor: "#f5f3ff" }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-pixel text-base truncate" style={{ color: "#1e1b4b" }}>
                      📧 {user.email}
                    </p>
                    <p className="text-xs font-medium mt-1" style={{ color: "#6d28d9" }}>
                      Dibuat: {new Date(user.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                      {user.last_sign_in_at && (
                        <> · Login terakhir: {new Date(user.last_sign_in_at).toLocaleDateString("id-ID")}</>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => { setPwModal(user); setPwMsg(null); setNewPw(""); }}
                      className="font-bold text-sm px-4 py-2 rounded-lg cursor-pointer transition-all hover:-translate-y-1"
                      style={{ backgroundColor: "#d1fae5", border: "2px solid #1e1b4b", color: "#065f46", boxShadow: "3px 3px 0 0 #1e1b4b" }}
                    >
                      🔑 GANTI PW
                    </button>
                    <button
                      onClick={() => { setDeleteTarget(user); setDeleteMsg(null); }}
                      className="font-bold text-sm px-4 py-2 rounded-lg cursor-pointer transition-all hover:-translate-y-1"
                      style={{ backgroundColor: "#fce7f3", border: "2px solid #1e1b4b", color: "#9d174d", boxShadow: "3px 3px 0 0 #1e1b4b" }}
                    >
                      🗑️ HAPUS
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SECTION: Tambah Admin Baru */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "4px solid #1e1b4b", boxShadow: "8px 8px 0 0 #1e1b4b" }}>
        <div className="p-5 border-b-4 border-[#1e1b4b]" style={{ backgroundColor: "#d1fae5" }}>
          <h2 className="font-pixel text-xl" style={{ color: "#1e1b4b" }}>➕ TAMBAH ADMIN BARU</h2>
        </div>
        <form onSubmit={handleAddUser} className="p-6 flex flex-col gap-4">
          {addMsg && (
            <div
              className={`p-4 rounded-xl font-semibold ${addMsg.type === "success" ? "bg-green-50 text-green-700 border-2 border-green-400" : "bg-red-50 text-red-700 border-2 border-red-400"}`}
            >
              {addMsg.type === "success" ? "✅" : "❌"} {addMsg.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm" style={{ color: "#1e1b4b" }}>Nama (Opsional)</label>
              <input
                type="text"
                placeholder="Contoh: Faris"
                value={addForm.name}
                onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
                className="px-4 py-3 rounded-xl font-medium outline-none"
                style={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm" style={{ color: "#1e1b4b" }}>Email Admin <span className="text-red-500">*</span></label>
              <input
                type="email"
                placeholder="admin@email.com"
                value={addForm.email}
                onChange={(e) => setAddForm((f) => ({ ...f, email: e.target.value }))}
                required
                className="px-4 py-3 rounded-xl font-medium outline-none"
                style={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm" style={{ color: "#1e1b4b" }}>Password <span className="text-red-500">*</span></label>
              <input
                type="password"
                placeholder="Min 6 karakter"
                value={addForm.password}
                onChange={(e) => setAddForm((f) => ({ ...f, password: e.target.value }))}
                required
                minLength={6}
                className="px-4 py-3 rounded-xl font-medium outline-none"
                style={inputStyle}
              />
            </div>
          </div>

          <button
            type="submit"
            className="font-pixel text-lg px-8 py-3 rounded-xl self-start transition-all hover:-translate-y-1 cursor-pointer"
            style={{ backgroundColor: "#6d28d9", color: "white", border: "3px solid #1e1b4b", boxShadow: "5px 5px 0 0 #1e1b4b" }}
          >
            ➕ TAMBAH ADMIN
          </button>
        </form>
      </div>

      {/* MODAL: Ganti Password */}
      {pwModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(30,27,75,0.6)" }}>
          <div className="bg-white rounded-2xl w-full max-w-md" style={{ border: "5px solid #1e1b4b", boxShadow: "10px 10px 0 0 #1e1b4b" }}>
            <div className="p-5 border-b-4 border-[#1e1b4b]" style={{ backgroundColor: "#d1fae5" }}>
              <h3 className="font-pixel text-xl" style={{ color: "#1e1b4b" }}>🔑 GANTI PASSWORD</h3>
              <p className="text-sm font-semibold mt-1" style={{ color: "#065f46" }}>{pwModal.email}</p>
            </div>
            <form onSubmit={handleChangePassword} className="p-6 flex flex-col gap-4">
              {pwMsg && (
                <div className={`p-3 rounded-xl font-semibold text-sm ${pwMsg.type === "success" ? "bg-green-50 text-green-700 border-2 border-green-400" : "bg-red-50 text-red-700 border-2 border-red-400"}`}>
                  {pwMsg.type === "success" ? "✅" : "❌"} {pwMsg.text}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm" style={{ color: "#1e1b4b" }}>Password Baru <span className="text-red-500">*</span></label>
                <input
                  type="password"
                  placeholder="Min 6 karakter"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  required
                  minLength={6}
                  className="px-4 py-3 rounded-xl font-medium outline-none"
                  style={inputStyle}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="font-pixel px-6 py-3 rounded-xl cursor-pointer transition-all hover:-translate-y-1"
                  style={{ backgroundColor: "#6d28d9", color: "white", border: "3px solid #1e1b4b", boxShadow: "4px 4px 0 0 #1e1b4b" }}
                >
                  SIMPAN
                </button>
                <button
                  type="button"
                  onClick={() => { setPwModal(null); setPwMsg(null); }}
                  className="font-pixel px-6 py-3 rounded-xl cursor-pointer transition-all hover:-translate-y-1"
                  style={{ backgroundColor: "#f5f3ff", color: "#1e1b4b", border: "3px solid #1e1b4b", boxShadow: "4px 4px 0 0 #1e1b4b" }}
                >
                  BATAL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Konfirmasi Hapus */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(30,27,75,0.6)" }}>
          <div className="bg-white rounded-2xl w-full max-w-md text-center" style={{ border: "5px solid #1e1b4b", boxShadow: "10px 10px 0 0 #1e1b4b" }}>
            <div className="p-5 border-b-4 border-[#1e1b4b]" style={{ backgroundColor: "#fce7f3" }}>
              <h3 className="font-pixel text-xl" style={{ color: "#9d174d" }}>⚠️ KONFIRMASI HAPUS</h3>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {deleteMsg && (
                <div className={`p-3 rounded-xl font-semibold text-sm ${deleteMsg.type === "success" ? "bg-green-50 text-green-700 border-2 border-green-400" : "bg-red-50 text-red-700 border-2 border-red-400"}`}>
                  {deleteMsg.text}
                </div>
              )}
              <p className="font-bold" style={{ color: "#1e1b4b" }}>
                Yakin mau hapus admin <span className="text-[#9d174d]">{deleteTarget.email}</span>? Aksi ini tidak bisa dibatalkan!
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleDelete}
                  className="font-pixel px-6 py-3 rounded-xl cursor-pointer transition-all hover:-translate-y-1"
                  style={{ backgroundColor: "#ef4444", color: "white", border: "3px solid #1e1b4b", boxShadow: "4px 4px 0 0 #1e1b4b" }}
                >
                  YA, HAPUS!
                </button>
                <button
                  onClick={() => { setDeleteTarget(null); setDeleteMsg(null); }}
                  className="font-pixel px-6 py-3 rounded-xl cursor-pointer transition-all hover:-translate-y-1"
                  style={{ backgroundColor: "#f5f3ff", color: "#1e1b4b", border: "3px solid #1e1b4b", boxShadow: "4px 4px 0 0 #1e1b4b" }}
                >
                  BATAL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
