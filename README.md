# TemuKembali App

TemuKembali adalah platform "Lost & Found" terintegrasi yang dirancang khusus untuk lingkungan kampus Institut Teknologi Bandung (ITB). Aplikasi ini memudahkan civitas akademika dalam melaporkan dan menemukan barang yang hilang.

## Fitur Utama

- **Pencarian Barang**: Cari barang hilang berdasarkan kategori, lokasi, dan deskripsi.
- **Pelaporan**: Laporkan barang hilang atau barang temuan dengan mudah.
- **Sistem Match**: Fitur pencocokan otomatis antara laporan kehilangan dan barang temuan (mock implementation).
- **Notifikasi**: Dapatkan pemberitahuan status laporan (mock implementation).
- **Mobile-First Design**: Antarmuka responsif yang dioptimalkan untuk tampilan mobile, memberikan pengalaman pengguna seperti aplikasi native.

## Teknologi yang Digunakan

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI, Radix UI
- **Icons**: Lucide React
- **State Management**: React Query, Zustand

## Prasyarat

Sebelum menjalankan aplikasi, pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru)
- npm (biasanya terinstall bersama Node.js)

## Cara Menjalankan Aplikasi

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di lingkungan lokal Anda:

1.  **Clone Repository** (jika belum):

    ```bash
    git clone <repository-url>
    cd temu-kembali-app
    ```

2.  **Instal Dependensi**:
    Jalankan perintah berikut di terminal untuk menginstal semua library yang dibutuhkan.

    ```bash
    npm install
    ```

3.  **Jalankan Development Server**:
    Mulai server lokal untuk melihat aplikasi.

    ```bash
    npm run dev
    ```

    Aplikasi biasanya akan berjalan di `http://localhost:8080/`.

4.  **Build untuk Produksi** (Opsional):
    Untuk membuat versi produksi yang dioptimalkan.
    ```bash
    npm run build
    ```

## Akun Login (Dummy)

Aplikasi ini menggunakan data mock untuk simulasi login. Anda dapat menggunakan kredensial berikut untuk masuk:

| Role      | Username / NIM | Password      | Nama Pengguna |
| :-------- | :------------- | :------------ | :------------ |
| **Admin** | `admin`        | `password123` | Admin User    |
| **User**  | `user`         | `user123`     | Regular User  |
| **User**  | `182232323`    | `password`    | Ibay Anjay    |

**Catatan**: Data login ini bersifat statis dan didefinisikan dalam `src/data/mockData.ts`.

## Struktur Project

- `src/components`: Komponen UI reusable.
- `src/pages`: Halaman utama aplikasi (Index, Login, NotFound).
- `src/screens`: Layar/Screen spesifik untuk fitur (Home, Report, Activity, Profile).
- `src/data`: Data mock untuk item, laporan, dan user.

## Lisensi

Private project for TemuKembali.
