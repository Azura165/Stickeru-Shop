"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#f5f3ff" }}>
      <div 
        className="bg-white p-8 md:p-12 text-center rounded-3xl max-w-xl w-full"
        style={{ border: "5px solid #1e1b4b", boxShadow: "10px 10px 0 0 #1e1b4b" }}
      >
        <span className="text-6xl md:text-8xl block mb-6 animate-bounce">😵‍💫</span>
        
        <h1 className="font-pixel text-3xl md:text-4xl mb-4" style={{ color: "#1e1b4b", lineHeight: 1.2 }}>
          Waduh! Stikernya nyangkut di dimensi lain...
        </h1>
        
        <p className="font-bold text-lg mb-8" style={{ color: "#4c1d95" }}>
          Ada sedikit gangguan teknis nih. Nggak usah panik, servernya cuma lagi bersin dikit!
        </p>

        <button
          onClick={() => reset()}
          className="font-pixel text-xl px-8 py-4 rounded-xl transition-all hover:-translate-y-2 hover:shadow-[6px_6px_0_0_#1e1b4b] cursor-pointer"
          style={{ 
            backgroundColor: "#fde68a", 
            border: "4px solid #1e1b4b", 
            color: "#1e1b4b" 
          }}
        >
          🔄 COBA MUAT ULANG
        </button>
      </div>
    </div>
  );
}
