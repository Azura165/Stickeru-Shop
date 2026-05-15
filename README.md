# Stickeru - Stiker Custom Anime & Manhwa Premium 🎀

Stickeru adalah platform e-commerce / landing page untuk penjualan stiker custom, anime, dan manhwa dengan desain modern bergaya **Neo-Brutalism**. 

Proyek ini dibangun untuk mencapai performa tinggi, skor SEO maksimal, dan keamanan *production-grade*.

## 🛠️ Tech Stack & Spesifikasi

- **Framework**: Next.js 16 (App Router)
- **Engine**: Node.js >= 20.0.0
- **Library UI**: React 19, TailwindCSS v4
- **Database**: PostgreSQL (via Supabase)
- **Styling**: Vanilla CSS (globals.css) + Neo-Brutalism UI
- **Penyimpanan Gambar**: Supabase Storage (Terhubung via `next.config.ts`)
- **Font**: Inter (Sans-serif) & VT323 (Pixel Art / Gaming)
- **Platform Deploy**: Dioptimalkan untuk Vercel (Edge Middleware, Caching)

## 📁 Struktur Folder Utama

```
sticker-shop/
├── public/                 # Aset statis (robots.txt, favicon, gambar maskot)
├── src/
│   ├── app/                # Next.js App Router (Halaman Utama)
│   │   ├── admin/          # Panel Admin Tersembunyi (Login, Dashboard, Products, Settings, Reviews)
│   │   ├── reviews/        # Halaman Publik Review Pelanggan
│   │   ├── syarat-ketentuan/ # Halaman Publik T&C
│   │   ├── layout.tsx      # Root Layout (Fonts, Metadata SEO)
│   │   ├── page.tsx        # Homepage (Hero, Katalog, Testimoni)
│   │   ├── not-found.tsx   # Custom 404 Page (Neo-Brutalism)
│   │   └── sitemap.ts      # Auto-generated XML Sitemap untuk SEO
│   ├── components/         # Reusable UI Components
│   │   ├── admin/          # Komponen khusus untuk panel Admin (Forms)
│   │   ├── Navbar.tsx      # Navigasi Responsive (tanpa React State untuk speed)
│   │   ├── ProductCard.tsx # Kartu Produk (Animasi Neo-Hover)
│   │   ├── Footer.tsx      # Footer & Link Eksternal
│   │   └── ...
│   ├── lib/
│   │   ├── actions.ts      # Server Actions (Proses form, Login, CRUD Supabase)
│   │   ├── supabase.ts     # Inisialisasi Supabase Client (Anon & Admin)
│   │   └── utils.ts        # Helper Functions (Format Harga, Generator Link WA)
│   ├── types/              # Deklarasi TypeScript Interface (Product, Settings, Testimonial)
│   └── middleware.ts       # Security Middleware (Proteksi route /admin, Validasi Cookie)
├── SUPABASE_SCHEMA.sql     # Skrip inisialisasi Database (Tabel, RLS Policy, Dummy Data)
├── next.config.ts          # Konfigurasi Next.js (Headers Security CSP, Image Optimization)
└── tailwind.css            # (Jika menggunakan v4)
```

## 🔒 Fitur Keamanan (Security Hardening)

Sistem ini telah melewati audit keamanan dan dilengkapi dengan pengamanan standar industri:
1. **Middleware Protection**: Rute `/admin` diblokir dan di-redirect secara otomatis jika pengunjung tidak memiliki sesi login yang valid.
2. **SHA-256 Cookie Hashing**: Sesi login menggunakan enkripsi *hash* untuk menghindari celah pencurian cookie teks biasa (plain-text).
3. **Content-Security-Policy (CSP)**: Disetel di `next.config.ts` untuk mencegah *Cross-Site Scripting* (XSS) dan injeksi skrip jahat.
4. **Row Level Security (RLS)**: Diaktifkan pada level database Supabase (Publik hanya bisa membaca, hanya Server Backend yang bisa menulis).
5. **Rate-Limiting (Delay)**: Pencegahan *Timing Attack / Brute Force* sederhana pada fungsi Login.

## 🚀 Panduan Setup Lokal

1. **Persiapan Environtment (`.env.local`)**:
   Pastikan file ini memiliki nilai yang benar:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
   SUPABASE_SECRET_KEY=[YOUR_SERVICE_ROLE_KEY]
   ADMIN_PASSWORD=password_rahasia_kamu
   COOKIE_SECRET=string_acak_panjang_untuk_hashing
   ```

2. **Inisialisasi Database (Supabase)**:
   - Masuk ke SQL Editor di dashboard Supabase.
   - *Copy* dan jalankan semua isi file `SUPABASE_SCHEMA.sql`.

3. **Jalankan Development Server**:
   ```bash
   npm install
   npm run dev
   ```

## 🔄 Alur Fitur Utama

- **Katalog & Order**: Pengunjung melihat daftar produk yang ditarik secara dinamis dari Supabase (`getAvailableProducts`). Klik "Beli" akan otomatis merakit pesan ke WhatsApp.
- **Sistem Review**: Pengunjung mengirim teks/foto review via WA. Admin login ke Dashboard -> `Kelola Reviews` -> `Tambah Review`. Review otomatis tampil di halaman `/reviews` dan homepage.
- **Dynamic Settings**: Admin dapat mengubah Nomor WA, Jam Operasional, Teks Banner, hingga Syarat & Ketentuan dari panel Admin. Perubahan akan langsung ditarik oleh Next.js ISR (Incremental Static Regeneration).

## 💡 Optimasi Tambahan
- **Images**: Penggunaan `<Image>` bawaan Next.js dengan optimasi otomatis `webp/avif`.
- **CSS**: Penggunaan Pseudo-classes murni tanpa internal state/JS rumit (misal di Navbar Mobile) menekan angka INP (Interaction to Next Paint) agar halaman super mulus saat berinteraksi.
- **Database Limits**: Penambahan `.limit(50)` di setiap query Supabase untuk memastikan web tetap stabil meski produk/review sudah berjumlah ribuan (Mencegah Database Lag).
