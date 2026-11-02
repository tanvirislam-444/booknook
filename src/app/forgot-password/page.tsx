"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message || "Something went wrong");
        return;
      }

      toast.success("If an account exists, a reset link has been sent to your email.");
    } catch {
      toast.error("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2e7d9] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-[#2b1e17]">
          Forgot Password?
        </h1>

        <p className="text-sm text-gray-600">
          Enter your email address and we&apos;ll send you a password reset link.
        </p>

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-md border p-3 outline-none focus:border-amber-800"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#2b1e17] py-3 text-white hover:bg-[#4b362a] disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="w-full text-sm text-amber-800 hover:underline"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}