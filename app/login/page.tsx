"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, Loader2, Cpu, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingBlob = ({ color, size, top, left, delay }: { color: string, size: string, top: string, left: string, delay: number }) => (
  <motion.div
    className="absolute rounded-full mix-blend-screen filter blur-[80px] opacity-10"
    animate={{
      x: [0, 20, -10, 0],
      y: [0, -30, 10, 0],
      scale: [1, 1.05, 0.95, 1],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      top,
      left,
    }}
  />
);

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          toast({
            title: "Auth Error",
            description: "Invalid credentials. Please check your email and password.",
            variant: "destructive",
          });
        } else {
          router.push("/dashboard");
        }
      } else {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          toast({
            title: "Success",
            description: "Account created! You can now sign in.",
          });
          setIsLogin(true);
        } else {
          const data = await res.json();
          toast({
            title: "Error",
            description: data.error || "Registration failed",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "System Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#1E2025] text-[#D6E0E6] relative overflow-hidden flex items-center justify-center p-6 selection:bg-[#3C5665] selection:text-white">
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3C5665] opacity-20 blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <FloatingBlob color="#3C5665" size="400px" top="10%" left="5%" delay={0} />
        <FloatingBlob color="#5A7480" size="300px" top="70%" left="80%" delay={2} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#92A4B1] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#3C5665] flex items-center justify-center glow-primary mb-4">
            <Cpu className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white uppercase">
            Gen<span className="text-[#92A4B1]">Campus</span>
          </h2>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="bg-[#29343D] border-white/5 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3C5665] to-transparent opacity-50" />

            <CardHeader className="space-y-1 pt-8">
              <CardTitle className="text-2xl font-bold tracking-tight text-white text-center">
                {isLogin ? "Welcome Back" : "Join the Future"}
              </CardTitle>
              <p className="text-sm text-[#92A4B1] text-center opacity-80">
                {isLogin ? "Resume your creative journey" : "Sign up for next-gen campus tools"}
              </p>
            </CardHeader>

            <CardContent className="pb-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      key="nameField"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-[#92A4B1]">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="e.g. Alex Rivera"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required={!isLogin}
                        className="bg-[#1E2025] border-white/5 focus:border-[#3C5665]/50 h-12 px-4 rounded-xl text-white placeholder:text-[#92A4B1]/40"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#92A4B1]">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@campus.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-[#1E2025] border-white/5 focus:border-[#3C5665]/50 h-12 px-4 rounded-xl text-white placeholder:text-[#92A4B1]/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-[#92A4B1]">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="bg-[#1E2025] border-white/5 focus:border-[#3C5665]/50 h-12 px-4 rounded-xl text-white placeholder:text-[#92A4B1]/40"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#3C5665] hover:bg-[#5A7480] text-white font-bold rounded-xl glow-primary shimmer-btn mt-6 transition-all active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {isLogin ? "Sign In" : "Register"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-[#92A4B1] hover:text-white transition-colors"
                >
                  {isLogin
                    ? "New here? Create an account"
                    : "Already registered? Sign in instead"}
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer info */}
        <p className="mt-12 text-center text-xs text-[#92A4B1] opacity-40">
          GenCampus OS security. All rights reserved.
        </p>
      </div>
    </div>
  );
}
