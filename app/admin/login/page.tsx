"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";
import { DeepamLogo } from "@/components/DeepamLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@deepamtextile.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f6f0] px-4 py-12">
      <div className="w-full max-w-md border border-[#dfd6c6] bg-white p-8 md:p-10 shadow-2xl rounded-sm">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex flex-col items-center group">
            <DeepamLogo variant="badge" dark={false} />
          </Link>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d2818]/5 border border-[#0d2818]/10 text-[10.5px] font-semibold uppercase tracking-wider text-[#0d2818]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#c49a45]" />
            <span>Internal Export Merchandising Portal</span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 rounded-sm bg-red-50 border border-red-200 p-3.5 text-xs text-red-800 flex items-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
            <p className="flex-1 font-medium">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#19211c] mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#857b6c]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@deepamtextile.com"
                className="w-full border border-[#dfd6c6] bg-white pl-10 pr-4 py-2.5 text-xs text-[#19211c] focus:outline-none focus:border-[#c49a45] rounded-sm transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#19211c] mb-1.5">
              Secure Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#857b6c]" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full border border-[#dfd6c6] bg-white pl-10 pr-10 py-2.5 text-xs text-[#19211c] focus:outline-none focus:border-[#c49a45] rounded-sm transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#857b6c] hover:text-[#19211c] p-0.5 cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full flex items-center justify-center gap-2.5 py-3.5 px-6 text-xs uppercase tracking-widest font-semibold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[#dfd6c6] text-center">
          <Link
            href="/"
            className="text-xs text-[#857b6c] hover:text-[#0d2818] font-medium transition-colors inline-flex items-center gap-1"
          >
            <span>← Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
