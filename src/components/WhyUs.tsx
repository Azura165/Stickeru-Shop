// WhyUs.tsx — Section "Kenapa Pilih Stickeru?" dengan cards kece Neo-Brutalism

const FEATURES = [
  {
    emoji: "💧",
    title: "ANTI-AIR",
    desc: "Stiker tahan air & panas — aman di botol minum, laptop, helm, motor!",
    bg: "#dbeafe",
    accent: "#1e1b4b",
  },
  {
    emoji: "🖨️",
    title: "TINTA PREMIUM",
    desc: "Warna tajam, vivid, dan tidak mudah pudar meski kena sinar matahari.",
    bg: "#fce7f3",
    accent: "#1e1b4b",
  },
  {
    emoji: "✂️",
    title: "DIE-CUT PRESISI",
    desc: "Dipotong mengikuti bentuk karakter — rapi, clean, dan kelihatan mahal!",
    bg: "#d1fae5",
    accent: "#1e1b4b",
  },
  {
    emoji: "⚡",
    title: "ORDER CEPAT",
    desc: "Chat WA, konfirmasi, kirim. Gak ribet, gak pakai lama. Respon < 1 jam!",
    bg: "#fde68a",
    accent: "#1e1b4b",
  },
  {
    emoji: "🎨",
    title: "FULL CUSTOM",
    desc: "Bisa request karakter apapun — anime, manhwa, fanart, atau desain sendiri!",
    bg: "#ede9fe",
    accent: "#1e1b4b",
  },
  {
    emoji: "📦",
    title: "PACKING AMAN",
    desc: "Setiap stiker dikemas dengan pelindung keras supaya sampai mulus ke tanganmu.",
    bg: "#ffedd5",
    accent: "#1e1b4b",
  },
];

export default function WhyUs() {
  return (
    <section
      className="px-4 py-10 sm:py-14"
      style={{ backgroundColor: "#1e1b4b" }}
      aria-labelledby="why-us-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span
            className="inline-block font-pixel text-sm px-4 py-2 rounded-full mb-4"
            style={{
              backgroundColor: "#fde68a",
              color: "#1e1b4b",
              border: "3px solid #fde68a",
              boxShadow: "3px 3px 0 0 #6d28d9",
            }}
          >
            🏆 KENAPA STICKERU?
          </span>
          <h2
            id="why-us-heading"
            className="font-pixel"
            style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)", color: "#fde68a" }}
          >
            KUALITAS GILA,
            <br />
            HARGA WAJAR
          </h2>
          <p
            className="font-bold text-sm sm:text-base mt-3 max-w-md mx-auto"
            style={{ color: "#c4b5fd" }}
          >
            Bukan cuma stiker biasa — ini senjata buat flex di laptop, botol minum, dan helm lo 😤
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-4 sm:p-5 flex flex-col gap-2 transition-transform hover:-translate-y-1"
              style={{
                backgroundColor: f.bg,
                border: "3px solid #1e1b4b",
                boxShadow: "5px 5px 0 0 #6d28d9",
              }}
            >
              <span className="text-3xl sm:text-4xl">{f.emoji}</span>
              <h3
                className="font-pixel text-sm sm:text-base"
                style={{ color: f.accent }}
              >
                {f.title}
              </h3>
              <p
                className="text-xs sm:text-sm font-medium leading-relaxed"
                style={{ color: "#374151" }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
