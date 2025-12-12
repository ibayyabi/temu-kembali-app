import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="mobile-container flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-6xl font-black text-primary/20">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Halaman Tidak Ditemukan</h2>
          <p className="text-muted-foreground">
            Maaf, halaman yang Anda cari tidak tersedia.
          </p>
        </div>
        <a 
          href="/" 
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
};

export default NotFound;
