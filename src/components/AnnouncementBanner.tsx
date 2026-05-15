interface AnnouncementBannerProps {
  text: string;
}

export default function AnnouncementBanner({ text }: AnnouncementBannerProps) {
  return (
    <div
      className="overflow-hidden py-2.5 select-none"
      style={{ backgroundColor: "#1e1b4b", borderBottom: "3px solid #6d28d9" }}
      aria-label="Pengumuman toko"
    >
      {/* 3x copy teks biar marquee loop mulus */}
      <div className="flex whitespace-nowrap" style={{ animation: "marquee 35s linear infinite" }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="font-pixel text-lg tracking-wide px-16 flex-shrink-0"
            style={{ color: "#fde68a" }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
