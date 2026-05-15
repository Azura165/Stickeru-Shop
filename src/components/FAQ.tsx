"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Stiker-nya tahan air nggak?",
    a: "100% tahan air! Semua stiker kami dicetak dengan lapisan laminasi khusus yang anti-air dan tahan goresan. Aman dipasang di botol minum, helm, atau bahkan dicuci.",
  },
  {
    q: "Berapa lama proses pembuatan custom order?",
    a: "Untuk custom order, estimasi 3-5 hari kerja tergantung antrian. Kami akan konfirmasi waktu estimasi saat kamu chat via WA. Ready stock biasanya langsung diproses hari yang sama.",
  },
  {
    q: "Apa saja pilihan finishing stiker?",
    a: "Kami menyediakan 3 pilihan finishing: Glossy (mengkilap, warna vivid), Matte (doff, elegan), dan Hologram (berkilau rainbow). Harga mungkin berbeda tergantung finishing.",
  },
  {
    q: "Bisa request desain karakter yang belum ada di katalog?",
    a: "Bisa banget! Itu salah satu keunggulan kami. Chat via WA, kirimkan referensi gambar atau nama karakter yang kamu mau, dan kami akan buat desainnya untukmu.",
  },
  {
    q: "Berapa minimum order?",
    a: "Untuk produk yang sudah ada di katalog, tidak ada minimum order. Untuk custom order, minimum 5 lembar stiker dengan desain yang sama. Makin banyak, makin hemat!",
  },
  {
    q: "Pembayaran via apa saja?",
    a: "Kami menerima transfer bank (BCA, Mandiri, BNI), GoPay, OVO, Dana, dan QRIS. Pembayaran dilakukan setelah konfirmasi pesanan via WA.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 sm:px-6 bg-white" id="faq">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-12 text-center">
          <span className="badge" style={{ backgroundColor: "#fde68a", color: "#1e1b4b" }}>
            ❓ PERTANYAAN UMUM
          </span>
          <h2 className="font-pixel text-5xl sm:text-6xl" style={{ color: "#1e1b4b" }}>
            FAQ
          </h2>
          <p className="text-sm" style={{ color: "#4c1d95" }}>
            Masih ada pertanyaan lain? Chat aja langsung via WA!
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{
                  border: "3px solid #1e1b4b",
                  boxShadow: isOpen ? "6px 6px 0px 0px #6d28d9" : "4px 4px 0px 0px #1e1b4b",
                  transition: "box-shadow 0.2s ease",
                }}
              >
                {/* Question (toggle) */}
                <button
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                  style={{
                    backgroundColor: isOpen ? "#ede9fe" : "#ffffff",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  id={`faq-${i}`}
                >
                  <span className="font-semibold text-sm sm:text-base" style={{ color: "#1e1b4b" }}>
                    {item.q}
                  </span>
                  <span
                    className="font-pixel text-2xl flex-shrink-0 transition-transform duration-200"
                    style={{
                      color: "#6d28d9",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <div
                  style={{
                    maxHeight: isOpen ? "300px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <p
                    className="px-5 py-4 text-sm leading-relaxed"
                    style={{
                      color: "#4c1d95",
                      borderTop: "2px solid #ede9fe",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
