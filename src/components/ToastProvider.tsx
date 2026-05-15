"use client";

import { useToastStore } from "@/store/toastStore";

export default function ToastProvider() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 pointer-events-none w-full max-w-sm px-4">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";
        
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-brutal animate-slide-down"
            style={{
              backgroundColor: isError ? "#fce7f3" : isSuccess ? "#d1fae5" : "#ede9fe",
              border: "3px solid #1e1b4b",
              boxShadow: "4px 4px 0px 0px #1e1b4b",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{isError ? "❌" : isSuccess ? "✅" : "💡"}</span>
              <span className="font-pixel text-base" style={{ color: "#1e1b4b" }}>
                {toast.message}
              </span>
            </div>
            <button 
              onClick={() => removeToast(toast.id)}
              className="text-lg font-bold hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: "#1e1b4b" }}
            >
              ×
            </button>
          </div>
        );
      })}
      <style jsx>{`
        @keyframes slide-down {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
