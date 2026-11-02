
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);



  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {

      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Login failed!");
        return;
      }

    if (data) {
      toast.success("Login successful!");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };


  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F5EF] p-4 sm:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-48px)] max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">

       
        <div
          className="relative hidden min-h-[700px] bg-cover bg-center lg:block"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=85&w=1200')",
          }}
        >
          <div className="absolute inset-0 bg-[#24160F]/50" />

          <div className="relative z-10 flex h-full flex-col items-center justify-start p-10 text-center">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="text-white" size={25} />
              <span className="font-serif text-xl font-bold text-white">
                BookNook
              </span>
            </Link>

            <div className="my-auto max-w-md">
              <h1 className="font-serif text-4xl font-bold text-white xl:text-5xl">
                Between the pages, discover a new world.
              </h1>

              <p className="mt-4 text-base leading-7 text-white/90">
                Join us to explore new stories and continue your reading journey.
              </p>
            </div>
          </div>
        </div>

  
        <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">

         
            <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
              <BookOpen size={25} className="text-[#B97852]" />
              <span className="font-serif text-xl font-bold text-[#422B1F]">
                BookNook
              </span>
            </Link>

         
            <div className="mb-7">
              <h2 className="font-serif text-3xl font-bold text-[#422B1F]">
                Welcome Back
              </h2>

              <p className="mt-2 text-sm text-[#806D60]">
                Log in to continue your reading journey.
              </p>
            </div>

            
            <form onSubmit={handleLogin} className="space-y-5">

            
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#422B1F]">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A18B7A]"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-[#EAE0D5] bg-[#FAF7F2] py-3 pl-10 pr-4 text-sm text-[#422B1F] outline-none focus:border-[#B97852] focus:ring-2 focus:ring-[#B97852]/10"
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-sm font-medium text-[#422B1F]">
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#B97852] hover:text-[#965638]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A18B7A]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-[#EAE0D5] bg-[#FAF7F2] py-3 pl-10 pr-11 text-sm text-[#422B1F] outline-none focus:border-[#B97852] focus:ring-2 focus:ring-[#B97852]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#806D60]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#B97852] py-3.5 text-sm font-semibold text-white transition hover:bg-[#965638] disabled:cursor-pointer "
              >
                Login
                <ArrowRight size={17} />
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#EAE0D5]" />
              <span className="text-xs text-[#A18B7A]">OR</span>
              <div className="h-px flex-1 bg-[#EAE0D5]" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#DCCFC1] bg-white py-3 text-sm font-semibold text-[#422B1F] transition hover:bg-[#FAF7F2]"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width={20}
                height={20}
              />
              Continue with Google
            </button>

         
            <p className="mt-6 text-center text-sm text-[#806D60]">
              Don&apos;t have an account?
              <Link
                href="/register"
                className="font-semibold text-[#B97852] hover:text-[#965638]"
              >
                Register
              </Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
