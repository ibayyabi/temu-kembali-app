
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { mockUsers } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        toast({
          title: "Login Berhasil",
          description: `Selamat datang kembali, ${user.name}!`,
        });
        // In a real app, we would store the token/user state here
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "Username atau password salah. Silakan coba lagi.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="mobile-container flex flex-col justify-center px-6">
      <div className="w-full max-w-sm mx-auto space-y-8 animate-fade-in-up">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-elevated">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Selamat Datang
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Masuk ke TemuKembali App
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username / NIM</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="Masukkan username atau NIM"
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-xs text-primary hover:underline font-medium"
                  onClick={(e) => e.preventDefault()}
                >
                  Lupa password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ingat saya
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-base shadow-soft hover:shadow-elevated transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              "Memproses..."
            ) : (
              <span className="flex items-center justify-center gap-2">
                Masuk <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Atau masuk dengan
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" type="button" disabled={isLoading} className="text-xs">
            SSO ITB
          </Button>
          <Button variant="outline" type="button" disabled={isLoading} className="text-xs">
            Google
          </Button>
        </div>
        
         <p className="text-center text-xs text-muted-foreground">
          Belum punya akun?{" "}
          <a href="#" className="font-semibold text-primary hover:underline">
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
