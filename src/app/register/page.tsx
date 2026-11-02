
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  User,
  Mail,
  Image as ImageIcon,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image,setImageUrl] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

const router = useRouter();

const hasUppercase = /[A-Z]/.test(password);
const hasLowercase = /[a-z]/.test(password);
const hasMinLength = password.length >= 6;

const isPasswordValid =
  hasUppercase && hasLowercase && hasMinLength;

const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  const formData = new FormData(e.currentTarget);

  const user = Object.fromEntries(formData.entries()) as {name: string;image: string;email: string;password: string;
  };

  if (!user.name.trim() || !user.email.trim() || !user.password) {
    toast.error("Please fill in all required fields.");
    return;
  }

  if (!isPasswordValid) {
    toast.error(
      "Password must contain uppercase, lowercase letters and at least 6 characters."
    );
    return;
  }

  try {
    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    if (error) {
      toast.error(error.message || "Registration failed!");
      return;
    }

    if (data) {
      toast.success("Registration successful!");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  } catch {
    toast.error("Something went wrong. Please try again.");
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
      Join BookNook
    </h1>

    <p className="mt-4 text-base leading-7 text-white/90">
      Be part of a community that loves books.
      Discover new stories and explore your reading journey.
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
                Create Your Account
              </h2>
              <p className="mt-2 text-sm text-[#806D60]">
                Start your reading journey today.
              </p>
            </div>

     
            <form onSubmit={handleRegister} className="space-y-4">

              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#422B1F]">
                  Full Name
                </label>

                <div className="relative">
                  <User size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A18B7A]" />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-[#EAE0D5] bg-[#FAF7F2] py-3 pl-10 pr-4 text-sm text-[#422B1F] outline-none focus:border-[#B97852] focus:ring-2 focus:ring-[#B97852]/10"
                  />
                </div>
              </div>

              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#422B1F]">
                  Email Address
                </label>

                <div className="relative">
                  <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A18B7A]" />

                  <input
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-[#EAE0D5] bg-[#FAF7F2] py-3 pl-10 pr-4 text-sm text-[#422B1F] outline-none focus:border-[#B97852] focus:ring-2 focus:ring-[#B97852]/10"
                  />
                </div>
              </div>

            
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#422B1F]">
                  Image URL <span className="text-xs text-[#A18B7A]">(Optional)</span>
                </label>

                <div className="relative">
                  <ImageIcon size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A18B7A]" />

                  <input
                    type="url"
                    placeholder="Enter your Image URL"
                    name="image"
                    value={image}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full rounded-lg border border-[#EAE0D5] bg-[#FAF7F2] py-3 pl-10 pr-4 text-sm text-[#422B1F] outline-none focus:border-[#B97852] focus:ring-2 focus:ring-[#B97852]/10"
                  />
                </div>
              </div>

              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#422B1F]">
                  Password
                </label>

                <div className="relative">
                  <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A18B7A]" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
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
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

              
                <div className="mt-3 space-y-1.5 text-xs">
                  <p className={hasUppercase && password ? "text-green-700" : "text-[#806D60]"}>
                    {hasUppercase && password ? "✓" : "○"} At least one uppercase letter
                  </p>

                  <p className={hasLowercase && password ? "text-green-700" : "text-[#806D60]"}>
                    {hasLowercase && password ? "✓" : "○"} At least one lowercase letter
                  </p>

                  <p className={hasMinLength ? "text-green-700" : "text-[#806D60]"}>
                    {hasMinLength ? "✓" : "○"} Minimum 6 characters
                  </p>
                </div>
              </div>

             
              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
                  {error}
                </p>
              )}

            
              {success && (
                <p className="rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-700">
                  {success}
                </p>
              )}

         
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#B97852] py-3.5 text-sm font-semibold text-white transition hover:bg-[#965638] disabled:cursor-pointer "
              >
                Register
                <ArrowRight size={17} />
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#EAE0D5]" />
              <span className="text-xs text-[#A18B7A]">OR CONTINUE WITH</span>
              <div className="h-px flex-1 bg-[#EAE0D5]" />
            </div>

         
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#DCCFC1] bg-white py-3 text-sm font-semibold text-[#422B1F] transition hover:bg-[#FAF7F2]"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                  width={24}
                  height={24}
              />
              Continue with Google
            </button>

       
            <p className="mt-6 text-center text-sm text-[#806D60]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#B97852] hover:text-[#965638]"
              >
                Login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;

