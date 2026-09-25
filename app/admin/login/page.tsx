"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { DeepamLogo } from "@/components/DeepamLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f6f0] px-4 py-12">
      <div className="w-full max-w-md border border-[#dfd6c6] bg-white p-8 md:p-10 shadow-xl rounded-sm">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex flex-col items-center">
            <DeepamLogo variant="badge" dark={false} />
          </Link>
          <p className="mt-2 font-body text-xs uppercase tracking-wider text-[#5a665d] font-medium">
            Internal Export Merchandising Portal
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 rounded bg-red-50 border border-red-200 p-3 text-xs text-red-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#19211c] mb-1.5">
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
                className="w-full border border-[#dfd6c6] bg-white pl-10 pr-4 py-2.5 text-xs text-[#19211c] focus:outline-none focus:border-[#c49a45] rounded-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#19211c] mb-1.5">
              Secure Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#857b6c]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full border border-[#dfd6c6] bg-white pl-10 pr-4 py-2.5 text-xs text-[#19211c] focus:outline-none focus:border-[#c49a45] rounded-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-solid w-full justify-center py-3 text-xs"
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[#dfd6c6] text-center">
          <Link
            href="/"
            className="text-xs text-[#857b6c] hover:text-[#19211c] font-medium"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
