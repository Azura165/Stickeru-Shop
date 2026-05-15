"use client";

import { useState } from "react";
import { loginAction } from "@/lib/actions";
import { useToastStore } from "@/store/toastStore";

export default function AdminLoginPage() {
  const [isForgot, setIsForgot] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const addToast = useToastStore((state) => state.addToast);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("is_forgot", isForgot ? "true" : "false");

    const result = await loginAction(formData);
    
    if (result?.error) {
      setError(result.error);
      addToast(result.error, "error");
    } else if (result?.success) {
      addToast(result.message || "Berhasil!", "success");
      setIsForgot(false);
    }
    
    setIsPending(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center pattern-dots px-4"
      style={{ backgroundColor: "#f5f3ff" }}
    >
      <div
        className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-xl"
        style={{ border: "4px solid #1e1b4b", boxShadow: "8px 8px 0px 0px #1e1b4b" }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <span className="text-4xl">🎀</span>
          <h1 className="font-pixel text-3xl text-center" style={{ color: "#1e1b4b" }}>
            ADMIN PANEL
          </h1>
          <p className="text-sm text-center" style={{ color: "#4c1d95" }}>
            {isForgot ? "Reset Password" : "Login ke Dashboard"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-pixel text-lg" style={{ color: "#1e1b4b" }} htmlFor="email">
              EMAIL
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="admin@stickeru.com"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                border: "3px solid #1e1b4b",
                boxShadow: "3px 3px 0px 0px #1e1b4b",
                fontFamily: "var(--font-inter)",
                backgroundColor: "#f5f3ff",
                color: "#1e1b4b",
              }}
            />
          </div>

          {!isForgot && (
            <div className="flex flex-col gap-1">
              <label className="font-pixel text-lg flex justify-between items-center" style={{ color: "#1e1b4b" }} htmlFor="password">
                <span>PASSWORD</span>
                <button type="button" onClick={() => setIsForgot(true)} className="text-xs font-sans font-bold text-[#6d28d9] hover:underline cursor-pointer">Lupa Password?</button>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required={!isForgot}
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{
                  border: "3px solid #1e1b4b",
                  boxShadow: "3px 3px 0px 0px #1e1b4b",
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "#f5f3ff",
                  color: "#1e1b4b",
                }}
              />
            </div>
          )}

          {error && (
            <p
              className="text-sm font-semibold px-3 py-2 rounded-lg"
              style={{ backgroundColor: "#fce7f3", color: "#9d174d", border: "2px solid #9d174d" }}
            >
              ❌ {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full justify-center mt-2 cursor-pointer"
            style={{ opacity: isPending ? 0.7 : 1 }}
          >
            {isPending ? "⏳ LOADING..." : isForgot ? "✉️ RESET PASSWORD" : "🔐 MASUK"}
          </button>
        </form>

        {isForgot && (
          <div className="mt-6 text-center">
            <button onClick={() => setIsForgot(false)} className="text-sm font-bold text-[#6d28d9] hover:underline cursor-pointer">
              ← Kembali ke Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
