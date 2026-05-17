
interface ComingSoonBannerProps {
  /** Pesan custom untuk ditampilkan */
  message?: string;
  /** Mode: 'full' = satu halaman penuh, 'section' = hanya section kecil */
  mode?: "full" | "section";
  /** Nomor WA dari settings */
  waNumber?: string;
  /** Link IG dari settings */
  igLink?: string;
}

export default function ComingSoonBanner({
  message = "🎨 Aldo lagi ngegambar stikernya... Sabar dulu ya bestie!",
  mode = "section",
  waNumber = "6281234567890",
  igLink = "https://instagram.com/stickeru",
}: ComingSoonBannerProps) {
  const isFullPage = mode === "full";

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${isFullPage ? "min-h-[60vh] py-20" : "py-16"}`}
    >
      <div
        className="max-w-lg w-full bg-white rounded-3xl p-10 flex flex-col items-center gap-6 mx-auto"
        style={{ border: "6px solid #1e1b4b", boxShadow: "12px 12px 0 0 #1e1b4b" }}
      >
        {/* Emoji rocket bergoyang */}
        <span className="text-8xl animate-bounce block">🚀</span>

        {/* Badge */}
        <span
          className="font-pixel text-sm px-5 py-2 rounded-full"
          style={{ backgroundColor: "#c4b5fd", border: "3px solid #1e1b4b", color: "#1e1b4b", boxShadow: "3px 3px 0 0 #1e1b4b" }}
        >
          COMING SOON
        </span>

        <h2
          className="font-pixel leading-tight"
          style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)", color: "#1e1b4b" }}
        >
          STIKER DALAM PERJALANAN!
        </h2>

        {/* Pesan */}
        <div
          className="w-full p-5 rounded-2xl"
          style={{ backgroundColor: "#fde68a", border: "4px solid #1e1b4b", boxShadow: "6px 6px 0 0 #1e1b4b" }}
        >
          <p className="font-bold text-base" style={{ color: "#92400e" }}>
            {message}
          </p>
        </div>

        {/* Info tambahan */}
        <div className="flex flex-col gap-2 w-full">
          <p className="font-semibold text-sm" style={{ color: "#4c1d95" }}>
            Sementara itu, follow kami buat update koleksi terbaru:
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href={igLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-sm px-4 py-2 rounded-xl transition-all hover:-translate-y-1 cursor-pointer"
              style={{ backgroundColor: "#f9a8d4", border: "3px solid #1e1b4b", color: "#9d174d", boxShadow: "3px 3px 0 0 #1e1b4b" }}
            >
              📸 INSTAGRAM
            </a>
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-sm px-4 py-2 rounded-xl transition-all hover:-translate-y-1 cursor-pointer"
              style={{ backgroundColor: "#d1fae5", border: "3px solid #1e1b4b", color: "#065f46", boxShadow: "3px 3px 0 0 #1e1b4b" }}
            >
              💬 WHATSAPP
            </a>
          </div>
        </div>

        {/* CTA order duluan */}
        <a
          href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Halo Stickeru! Aku mau tanya koleksi terbaru dong 🎀")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full font-pixel text-lg py-4 rounded-2xl text-center transition-all hover:-translate-y-2 cursor-pointer block"
          style={{ backgroundColor: "#10b981", color: "white", border: "4px solid #1e1b4b", boxShadow: "6px 6px 0 0 #1e1b4b" }}
        >
          💬 TANYA KOLEKSI VIA WA
        </a>
      </div>
    </div>
  );
}
