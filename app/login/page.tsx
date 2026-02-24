"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Cpu, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isActive, setIsActive] = useState(false); // false = Sign In, true = Sign Up
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { toast } = useToast();

  useEffect(() => { setMounted(true); }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (!result) {
        toast({ title: "Auth Error", description: "Server did not respond. Check your connection.", variant: "destructive" });
      } else if (result.error) {
        toast({ title: "Invalid credentials", description: "Wrong email or password. Try again.", variant: "destructive" });
      } else if (result.ok) {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      toast({ title: "System Error", description: "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast({ title: "Account created!", description: "Now sign in with your credentials." });
        setIsActive(false);
        setFormData({ name: "", email: formData.email, password: "" });
      } else {
        const data = await res.json();
        toast({ title: "Error", description: data.error || "Registration failed", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#1E2025] flex items-center justify-center relative overflow-hidden selection:bg-[#3C5665] selection:text-white">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3C5665] opacity-20 blur-[130px] -translate-y-1/2 translate-x-1/2 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5A7480] opacity-15 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full" />
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="absolute top-8 left-8 inline-flex items-center gap-2 text-sm text-[#92A4B1] hover:text-white transition-colors z-50"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      {/* Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
        <div className="w-8 h-8 rounded-lg bg-[#3C5665] flex items-center justify-center">
          <Cpu className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-black tracking-tight text-white uppercase">
          Gen<span className="text-[#92A4B1]">Campus</span>
        </span>
      </div>

      {/* ─── Sliding Container ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[768px] max-w-[95vw] min-h-[520px] rounded-[30px] overflow-hidden shadow-2xl border border-white/5"
        style={{ background: "#23292F" }}
      >

        {/* ── Sign-Up panel (left side) ── */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-10 transition-all duration-700"
          style={{
            zIndex: isActive ? 5 : 1,
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateX(100%)" : "translateX(0)",
          }}
        >
          <h1 className="text-2xl font-black text-white mb-1">Create Account</h1>
          <p className="text-xs text-[#92A4B1] mb-6">Join the next-gen campus platform</p>
          <form onSubmit={handleSignUp} className="w-full flex flex-col gap-3">
            <div className="space-y-1">
              <Label htmlFor="su-name" className="text-[10px] font-bold uppercase tracking-widest text-[#92A4B1]">Full Name</Label>
              <Input
                id="su-name"
                type="text"
                placeholder="e.g. Alex Rivera"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-[#1E2025] border-white/5 focus:border-[#3C5665]/60 h-11 rounded-xl text-white placeholder:text-[#92A4B1]/40 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="su-email" className="text-[10px] font-bold uppercase tracking-widest text-[#92A4B1]">Email</Label>
              <Input
                id="su-email"
                type="email"
                placeholder="you@campus.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-[#1E2025] border-white/5 focus:border-[#3C5665]/60 h-11 rounded-xl text-white placeholder:text-[#92A4B1]/40 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="su-password" className="text-[10px] font-bold uppercase tracking-widest text-[#92A4B1]">Password</Label>
              <Input
                id="su-password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-[#1E2025] border-white/5 focus:border-[#3C5665]/60 h-11 rounded-xl text-white placeholder:text-[#92A4B1]/40 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-11 w-full rounded-xl bg-[#3C5665] hover:bg-[#5A7480] text-white font-bold text-sm tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up"}
            </button>
          </form>
        </div>

        {/* ── Sign-In panel (right side) ── */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-10 transition-all duration-700"
          style={{
            zIndex: isActive ? 1 : 5,
            opacity: isActive ? 0 : 1,
            transform: isActive ? "translateX(100%)" : "translateX(0)",
          }}
        >
          <h1 className="text-2xl font-black text-white mb-1">Welcome Back</h1>
          <p className="text-xs text-[#92A4B1] mb-6">Resume your creative journey</p>
          <form onSubmit={handleSignIn} className="w-full flex flex-col gap-3">
            <div className="space-y-1">
              <Label htmlFor="si-email" className="text-[10px] font-bold uppercase tracking-widest text-[#92A4B1]">Email</Label>
              <Input
                id="si-email"
                type="email"
                placeholder="you@campus.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-[#1E2025] border-white/5 focus:border-[#3C5665]/60 h-11 rounded-xl text-white placeholder:text-[#92A4B1]/40 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="si-password" className="text-[10px] font-bold uppercase tracking-widest text-[#92A4B1]">Password</Label>
              <Input
                id="si-password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-[#1E2025] border-white/5 focus:border-[#3C5665]/60 h-11 rounded-xl text-white placeholder:text-[#92A4B1]/40 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-11 w-full rounded-xl bg-[#3C5665] hover:bg-[#5A7480] text-white font-bold text-sm tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
            </button>
          </form>
        </div>

        {/* ── Toggle Overlay Panel ── */}
        <div
          className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden rounded-[30px] z-[100] transition-all duration-700"
          style={{ transform: isActive ? "translateX(-100%)" : "translateX(0)" }}
        >
          {/* The wide gradient strip that slides */}
          <div
            className="relative h-full w-[200%] -left-full transition-all duration-700 flex"
            style={{
              transform: isActive ? "translateX(50%)" : "translateX(0)",
              background: "linear-gradient(135deg, #2E4A5A 0%, #3C5665 40%, #1a3344 100%)",
            }}
          >
            {/* Left toggle panel: "Already have an account? Sign In" */}
            <div className="w-1/2 h-full flex flex-col items-center justify-center text-center px-10 gap-4"
              style={{ transform: isActive ? "translateX(0)" : "translateX(-200%)", transition: "all 0.7s ease-in-out" }}>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-2">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white">Welcome Back!</h2>
              <p className="text-sm text-white/70 leading-relaxed">Already part of the GenCampus OS community? Sign in to continue.</p>
              <button
                onClick={() => setIsActive(false)}
                className="mt-2 px-8 py-2.5 rounded-full border-2 border-white/50 text-white text-sm font-bold hover:bg-white/10 transition-all tracking-wide"
              >
                Sign In
              </button>
            </div>

            {/* Right toggle panel: "New here? Sign Up" */}
            <div className="w-1/2 h-full flex flex-col items-center justify-center text-center px-10 gap-4"
              style={{ transform: isActive ? "translateX(200%)" : "translateX(0)", transition: "all 0.7s ease-in-out" }}>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-2">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white">Hello, Creator!</h2>
              <p className="text-sm text-white/70 leading-relaxed">New to GenCampus OS? Join the next generation of campus creators.</p>
              <button
                onClick={() => setIsActive(true)}
                className="mt-2 px-8 py-2.5 rounded-full border-2 border-white/50 text-white text-sm font-bold hover:bg-white/10 transition-all tracking-wide"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

      </motion.div>

      {/* Footer */}
      <p className="absolute bottom-6 text-xs text-[#92A4B1] opacity-30">
        © {new Date().getFullYear()} GenCampus OS. All rights reserved.
      </p>
    </div>
  );
}
