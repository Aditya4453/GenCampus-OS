"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Cpu, Zap, Eye, Download, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const FloatingBlob = ({ color, size, top, left, delay }: { color: string, size: string, top: string, left: string, delay: number }) => (
  <motion.div
    className="absolute rounded-full mix-blend-screen filter blur-[120px] opacity-[0.05]"
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

export default function TestGeneratePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [eventName, setEventName] = useState("Tech Fest 2024");
  const [theme, setTheme] = useState("Innovation and Future Technology");
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTest = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/test-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventName, theme }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data);
        toast({
          title: "System Success",
          description: "All neural assets generated successfully.",
        });
      } else {
        setError(data.error || "Failed to generate");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#1E2025] text-[#D6E0E6] relative overflow-hidden selection:bg-[#3C5665] selection:text-white pb-20 p-8">
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#3C5665] opacity-20 blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <FloatingBlob color="#3C5665" size="500px" top="10%" left="5%" delay={0} />
        <FloatingBlob color="#5A7480" size="400px" top="70%" left="80%" delay={2} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3C5665]/20 border border-[#3C5665]/30 text-[10px] font-black text-[#92A4B1] uppercase tracking-widest mb-6 focus-glow">
            <Cpu className="w-3 h-3" />
            <span>Neural Diagnostics: Lab Mode</span>
          </div>
          <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-4">
            TEST AI <span className="text-[#92A4B1]">GEN.</span>
          </h1>
          <p className="text-[#92A4B1] font-medium opacity-60">Validate core generation logic and asset synthesis.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-[#29343D] border-white/5 shadow-2xl overflow-hidden relative mb-12">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3C5665] to-transparent opacity-50" />
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white uppercase tracking-tight">Manual Parameter Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#92A4B1]">Event Identity</Label>
                  <Input
                    className="bg-[#1E2025] border-white/5 focus:border-[#3C5665]/50 h-12 rounded-xl text-white px-4"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g. Nexus Protocol"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#92A4B1]">Neural Theme</Label>
                  <Input
                    className="bg-[#1E2025] border-white/5 focus:border-[#3C5665]/50 h-12 rounded-xl text-white px-4"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="e.g. Biomorphic Architecture"
                  />
                </div>
              </div>
              <Button
                onClick={handleTest}
                disabled={loading}
                className="w-full h-14 bg-[#3C5665] hover:bg-[#5A7480] text-white font-black rounded-xl shadow-lg glow-primary shimmer-btn transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Neural Flow...</span>
                  </div>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-3 fill-current" />
                    Engage Test Sequence
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Card className="bg-red-500/10 border-red-500/20 mb-12 overflow-hidden relative">
                <div className="absolute inset-0 bg-noise opacity-[0.05]" />
                <CardContent className="pt-6 flex items-center gap-4">
                  <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />
                  <p className="text-red-400 font-bold uppercase text-xs tracking-widest">Protocol Failure: {error}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <Card className="bg-emerald-500/10 border-emerald-500/20 shadow-xl">
                <CardContent className="pt-6 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <p className="text-emerald-400 font-black uppercase text-[10px] tracking-[0.2em]">Neural Synthesis Complete: Integrity Verified</p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-[#29343D] border-white/5 shadow-xl overflow-hidden group h-full">
                  <CardHeader className="border-b border-white/5 py-4">
                    <CardTitle className="text-xs font-black text-[#92A4B1] uppercase tracking-[0.2em]">Visual Data</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#1E2025] ring-1 ring-white/10 shadow-inner group">
                      <img
                        src={result.posterUrl}
                        alt="Poster"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <Button size="sm" className="bg-white text-black font-bold text-[10px] uppercase rounded-lg px-4 flex-grow">
                          <Download className="w-3 h-3 mr-2" /> Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-8">
                  <Card className="bg-[#29343D] border-white/5 shadow-xl overflow-hidden flex flex-col h-full">
                    <CardHeader className="border-b border-white/5 py-4 flex flex-row justify-between items-center">
                      <CardTitle className="text-xs font-black text-[#92A4B1] uppercase tracking-[0.2em]">Social Logic</CardTitle>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-[#92A4B1] hover:text-white">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="bg-[#1E2025]/50 rounded-xl p-5 border border-white/5 h-[300px] overflow-auto custom-scrollbar">
                        <p className="whitespace-pre-wrap text-[#D6E0E6] text-sm font-medium leading-relaxed opacity-80 italic">
                          {result.content.caption}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card className="bg-[#29343D] border-white/5 shadow-xl overflow-hidden">
                <CardHeader className="border-b border-white/5 py-4 flex flex-row justify-between items-center">
                  <CardTitle className="text-xs font-black text-[#92A4B1] uppercase tracking-[0.2em]">Web Node Interface</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-8 text-[#92A4B1] text-[10px] uppercase font-bold tracking-widest">
                      <Download className="w-3 h-3 mr-2" /> HTML
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="bg-[#1E2025] rounded-xl overflow-hidden border border-white/10 shadow-inner">
                    <div className="bg-[#29343D] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                      </div>
                    </div>
                    <iframe
                      srcDoc={result.content.landingPageHTML}
                      className="w-full h-96 border-0"
                      title="Landing Page"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
