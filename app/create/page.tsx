"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, ArrowLeft, Loader2, Cpu, Zap, Target, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const FloatingBlob = ({ color, size, top, left, delay }: { color: string, size: string, top: string, left: string, delay: number }) => (
  <motion.div
    className="absolute rounded-full mix-blend-screen filter blur-[100px] opacity-10"
    animate={{
      x: [0, 40, -30, 0],
      y: [0, -20, 40, 0],
      scale: [1, 1.15, 0.85, 1],
    }}
    transition={{
      duration: 18,
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

export default function CreatePage() {
  const { status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    theme: "",
    audience: "",
    tone: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        toast({
          title: "Synthesis Complete!",
          description: "Your AI-powered campaign elements are ready.",
        });
        router.push(`/project/${data.projectId}`);
      } else {
        const data = await res.json();
        toast({
          title: "System Error",
          description: data.error || "Failed to generate campaign assets.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Failure",
        description: "Communication with the AI core failed. Please re-try.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#1E2025] text-[#D6E0E6] relative overflow-hidden selection:bg-[#3C5665] selection:text-white pb-20">
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#3C5665] opacity-20 blur-[140px] -translate-y-1/2 translate-x-1/2" />
        <FloatingBlob color="#3C5665" size="450px" top="15%" left="5%" delay={0} />
        <FloatingBlob color="#5A7480" size="350px" top="65%" left="75%" delay={3} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center py-8 mb-12 border-b border-white/5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-[#29343D] border border-white/5 flex items-center justify-center transition-colors group-hover:border-[#3C5665]/50 group-hover:bg-[#3C5665]/20">
                <ArrowLeft className="w-5 h-5 text-[#92A4B1] group-hover:text-white" />
              </div>
              <span className="text-sm font-bold text-[#92A4B1] uppercase tracking-widest hidden sm:inline">Portal Return</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3"
          >
            <Cpu className="w-6 h-6 text-[#3C5665]" />
            <span className="text-xl font-bold tracking-tight text-white uppercase">GEN<span className="text-[#92A4B1]">CAMPUS</span></span>
          </motion.div>

          <div className="w-10 sm:w-24" /> {/* Spacer */}
        </nav>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3C5665]/20 border border-[#3C5665]/30 text-[10px] font-bold text-[#92A4B1] uppercase tracking-widest mb-6 focus-glow">
              <Sparkles className="w-3 h-3" />
              <span>Asset Generation Module</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
              LAUNCH <br />
              <span className="text-[#92A4B1]">CAMPAIGN.</span>
            </h1>
            <p className="text-[#92A4B1] text-lg font-medium opacity-80 max-w-lg mx-auto leading-relaxed">
              Program the AI with your event parameters to synthesize a complete marketing kit.
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-[#29343D] border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#3C5665] to-transparent" />
              <CardHeader className="pt-8 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#3C5665]/20 flex items-center justify-center text-[#3C5665]">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">Project Parameters</CardTitle>
                </div>
                <p className="text-[#92A4B1] text-sm font-medium opacity-60">Specify the core identity of your campus event.</p>
              </CardHeader>
              <CardContent className="pb-10 pt-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="eventName" className="text-[10px] font-black uppercase tracking-widest text-[#92A4B1]">
                        Event Title <span className="text-red-400 opacity-50">*</span>
                      </Label>
                      <Input
                        id="eventName"
                        placeholder="e.g. Galactic Hackathon"
                        value={formData.eventName}
                        onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                        required
                        className="bg-[#1E2025] border-white/5 focus:border-[#3C5665]/50 h-14 px-5 rounded-2xl text-white placeholder:text-[#92A4B1]/30 transition-all"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="theme" className="text-[10px] font-black uppercase tracking-widest text-[#92A4B1]">
                        Core Theme <span className="text-red-400 opacity-50">*</span>
                      </Label>
                      <Input
                        id="theme"
                        placeholder="e.g. Futuristic Innovation"
                        value={formData.theme}
                        onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                        required
                        className="bg-[#1E2025] border-white/5 focus:border-[#3C5665]/50 h-14 px-5 rounded-2xl text-white placeholder:text-[#92A4B1]/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="audience" className="text-[10px] font-black uppercase tracking-widest text-[#92A4B1]">
                      <div className="flex items-center gap-2">
                        <Target className="w-3 h-3" />
                        Target Demographic
                      </div>
                    </Label>
                    <Input
                      id="audience"
                      placeholder="e.g. Computer Science Majors, Freshmen"
                      value={formData.audience}
                      onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                      className="bg-[#1E2025] border-white/5 focus:border-[#3C5665]/50 h-14 px-5 rounded-2xl text-white placeholder:text-[#92A4B1]/30 transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="tone" className="text-[10px] font-black uppercase tracking-widest text-[#92A4B1]">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-3 h-3" />
                        Communication Tone
                      </div>
                    </Label>
                    <Input
                      id="tone"
                      placeholder="e.g. Professional yet Hype"
                      value={formData.tone}
                      onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                      className="bg-[#1E2025] border-white/5 focus:border-[#3C5665]/50 h-14 px-5 rounded-2xl text-white placeholder:text-[#92A4B1]/30 transition-all"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-16 text-lg bg-[#3C5665] hover:bg-[#5A7480] text-white font-black rounded-2xl shadow-xl glow-primary shimmer-btn mt-4 transition-all active:scale-[0.98]"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Synthesizing Assets...</span>
                      </div>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-3" />
                        Initiate Generation Flow
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-[#29343D]/50 border border-white/5 rounded-3xl p-8 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
            <div className="flex justify-center gap-4 mb-4">
              {[Zap, Sparkles, Target].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-[#1E2025] border border-white/5 flex items-center justify-center text-[#3C5665]">
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>
            <p className="text-white text-sm font-bold mb-2">Multimodal Synthesis Engine</p>
            <p className="text-[#92A4B1] text-xs font-medium opacity-70 mb-4">
              AI will generate: Instagram poster, captions, email protocol,
              instant message templates, and registration landing page.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E2025] border border-white/5 text-[10px] font-black text-[#5A7480] uppercase">
              Est. Complexity: High | Processing Time: ~7sec
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
