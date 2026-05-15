const STEPS = [
  {
    number: "01",
    emoji: "🛍️",
    title: "Pilih Stiker",
    desc: "Browse koleksi stiker anime, manhwa, dan trending yang kamu suka. Klik tombol 'Beli via WA'.",
    color: "#ede9fe",
    accent: "#6d28d9",
  },
  {
    number: "02",
    emoji: "💬",
    title: "Chat via WA",
    desc: "Kamu langsung ke-redirect ke WhatsApp kami dengan pesan yang udah otomatis ter-isi. Tinggal kirim!",
    color: "#fde68a",
    accent: "#1e1b4b",
  },
  {
    number: "03",
    emoji: "📦",
    title: "Konfirmasi & Bayar",
    desc: "Kami konfirmasi ketersediaan, kasih info rekening, lalu proses pesanan. Estimasi 2-4 hari kerja.",
    color: "#d1fae5",
    accent: "#065f46",
  },
  {
    number: "04",
    emoji: "🚀",
    title: "Terima Stiker!",
    desc: "Stiker dikirim pakai ekspedisi pilihan lo. Tracking nomor resi langsung via WA. Selamat menikmati!",
    color: "#fce7f3",
    accent: "#9d174d",
  },
];

export default function HowToOrder() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-white" id="cara-order">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-12 text-center">
          <span className="badge" style={{ backgroundColor: "#fde68a", color: "#1e1b4b" }}>
            📋 PANDUAN ORDER
          </span>
          <h2 className="font-pixel text-5xl sm:text-6xl" style={{ color: "#1e1b4b" }}>
            CARA ORDER
          </h2>
          <p className="max-w-md text-sm sm:text-base leading-relaxed" style={{ color: "#4c1d95" }}>
            Gampang banget, cuma 4 langkah — dijamin sat-set!
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="relative rounded-xl p-6 flex flex-col gap-3 neo-hover"
              style={{
                backgroundColor: step.color,
                border: "3px solid #1e1b4b",
                boxShadow: "6px 6px 0px 0px #1e1b4b",
              }}
            >
              {/* Step Number — Big background */}
              <span
                className="font-pixel text-6xl opacity-10 absolute top-2 right-3 select-none pointer-events-none"
                style={{ color: step.accent }}
              >
                {step.number}
              </span>

              {/* Emoji */}
              <span className="text-4xl">{step.emoji}</span>

              {/* Step indicator */}
              <div className="flex items-center gap-2">
                <span
                  className="font-pixel text-sm px-2 py-0.5 rounded"
                  style={{ backgroundColor: step.accent, color: "#ffffff" }}
                >
                  STEP {step.number}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="font-pixel text-lg" style={{ color: step.accent }}>→</span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-pixel text-2xl leading-tight" style={{ color: "#1e1b4b" }}>
                {step.title.toUpperCase()}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: "#4c1d95" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          className="mt-10 rounded-xl p-4 flex items-start gap-3"
          style={{ backgroundColor: "#ede9fe", border: "2px solid #c4b5fd" }}
        >
          <span className="text-2xl flex-shrink-0">💡</span>
          <p className="text-sm" style={{ color: "#4c1d95" }}>
            <strong>Tips:</strong> Siapkan referensi gambar atau nama karakter yang jelas biar proses custom order makin cepat!
            Kami respon WA dalam <strong>waktu kurang dari 1 jam</strong> selama jam operasional.
          </p>
        </div>
      </div>
    </section>
  );
}
