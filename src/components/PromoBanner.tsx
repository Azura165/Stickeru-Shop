// PromoBanner.tsx — Section promo kode dengan design yang menarik
// Tampil di antara ProductGrid dan HowToOrder

export default function PromoBanner() {
  return (
    <section
      className="px-4 py-4 sm:py-6"
      aria-label="Banner Promosi"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Promo Card */}
        <div
          className="relative overflow-hidden rounded-3xl p-6 sm:p-10"
          style={{
            backgroundColor: "#fde68a",
            border: "4px solid #1e1b4b",
            boxShadow: "10px 10px 0px 0px #1e1b4b",
          }}
        >
          {/* Background decorative elements */}
          <div
            className="absolute -top-8 -right-8 w-36 h-36 sm:w-56 sm:h-56 rounded-full opacity-20"
            style={{ backgroundColor: "#6d28d9" }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-6 -left-6 w-24 h-24 sm:w-40 sm:h-40 rounded-full opacity-10"
            style={{ backgroundColor: "#1e1b4b" }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            {/* Left: Text Content */}
            <div className="flex-1 text-center sm:text-left">
              {/* Badge */}
              <span
                className="inline-block font-pixel text-xs px-3 py-1 rounded-full mb-3"
                style={{
                  backgroundColor: "#6d28d9",
                  color: "#fde68a",
                  border: "2px solid #1e1b4b",
                  boxShadow: "2px 2px 0 0 #1e1b4b",
                }}
              >
                🎉 PROMO SPESIAL
              </span>

              <h2
                className="font-pixel leading-tight mb-2"
                style={{ fontSize: "clamp(1.5rem, 5vw, 2.8rem)", color: "#1e1b4b" }}
              >
                CUSTOM ORDER
                <br />
                <span style={{ color: "#6d28d9" }}>OPEN NOW!</span>
              </h2>

              <p className="font-bold text-sm sm:text-base mb-4" style={{ color: "#4c1d95" }}>
                Request karakter anime & manhwa favoritmu! <br className="hidden sm:block" />
                Kualitas premium, anti-air, harga mulai <strong>Rp 10.000/pcs</strong>
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {["✂️ Die-Cut", "💧 Anti-Air", "🌈 Glossy/Matte/Hologram", "🚀 Kirim Cepat"].map((tag) => (
                  <span
                    key={tag}
                    className="font-semibold text-xs px-3 py-1 rounded-lg"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "2px solid #1e1b4b",
                      color: "#1e1b4b",
                      boxShadow: "2px 2px 0 0 #1e1b4b",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Sticker Emoji Stack */}
            <div className="flex-shrink-0 text-center">
              <div className="relative w-24 h-24 sm:w-36 sm:h-36 mx-auto">
                <span className="absolute top-0 right-0 text-4xl sm:text-5xl animate-bounce" style={{ animationDelay: "0s" }}>⚔️</span>
                <span className="absolute top-4 left-0 text-3xl sm:text-4xl animate-bounce" style={{ animationDelay: "0.2s" }}>📖</span>
                <span className="absolute bottom-2 right-4 text-3xl sm:text-4xl animate-bounce" style={{ animationDelay: "0.4s" }}>🔥</span>
                <span className="absolute bottom-0 left-2 text-2xl sm:text-3xl animate-bounce" style={{ animationDelay: "0.6s" }}>✨</span>
              </div>
              <p className="font-pixel text-xs mt-2" style={{ color: "#4c1d95" }}>
                400+ KARAKTER<br />TERSEDIA!
              </p>
            </div>
          </div>
        </div>

        {/* Stats bar di bawah promo card */}
        <div
          className="grid grid-cols-3 gap-0 mt-4 overflow-hidden rounded-2xl"
          style={{ border: "4px solid #1e1b4b", boxShadow: "6px 6px 0 0 #1e1b4b" }}
        >
          {[
            { num: "100+", label: "Desain Tersedia" },
            { num: "4.9★", label: "Rating Pelanggan" },
            { num: "<1jam", label: "Respon Admin" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-4 px-2"
              style={{
                backgroundColor: i === 1 ? "#6d28d9" : "#ffffff",
                borderRight: i < 2 ? "4px solid #1e1b4b" : "none",
              }}
            >
              <span
                className="font-pixel text-xl sm:text-2xl"
                style={{ color: i === 1 ? "#fde68a" : "#1e1b4b" }}
              >
                {stat.num}
              </span>
              <span
                className="font-semibold text-xs text-center mt-0.5"
                style={{ color: i === 1 ? "#e9d5ff" : "#4c1d95" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
