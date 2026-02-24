"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, ArrowLeft, Copy, Download, Loader2, Cpu, Eye, CheckCircle2, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  _id: string;
  eventName: string;
  theme: string;
  generatedAssets: {
    posterUrl?: string;
    posterPrompt?: string;
    caption?: string;
    emailInvite?: string;
    whatsappMessage?: string;
    landingPageHTML?: string;
  };
}

const FloatingBlob = ({ color, size, top, left, delay }: { color: string, size: string, top: string, left: string, delay: number }) => (
  <motion.div
    className="absolute rounded-full mix-blend-screen filter blur-[120px] opacity-[0.07]"
    animate={{
      x: [0, 50, -20, 0],
      y: [0, -30, 50, 0],
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{
      duration: 25,
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

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchProject();
    }
  }, [status]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data.project);
      } else {
        toast({
          title: "Access Denied",
          description: "This campaign node does not exist or you lack authorization.",
          variant: "destructive",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Failed to fetch project:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Buffer Updated",
      description: `${label} content copied to local clipboard.`,
    });
  };

  const downloadPoster = async () => {
    if (!project?.generatedAssets?.posterUrl) return;
    try {
      const response = await fetch(project.generatedAssets.posterUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${project.eventName.replace(/\s+/g, "-")}-poster.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(project.generatedAssets.posterUrl, "_blank");
    }
  };

  const downloadHTML = () => {
    if (!project?.generatedAssets?.landingPageHTML) return;
    const blob = new Blob([project.generatedAssets.landingPageHTML], {
      type: "text/html",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.eventName.replace(/\s+/g, "-")}-landing.html`;
    a.click();
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#1E2025] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[#3C5665]" />
          <p className="text-[#92A4B1] font-medium animate-pulse uppercase tracking-widest text-xs">Accessing Data Node...</p>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#1E2025] text-[#D6E0E6] relative overflow-hidden selection:bg-[#3C5665] selection:text-white pb-20">
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-[#3C5665] opacity-20 blur-[180px] -translate-y-1/2 translate-x-1/2" />
        <FloatingBlob color="#3C5665" size="500px" top="5%" left="5%" delay={0} />
        <FloatingBlob color="#5A7480" size="400px" top="55%" left="80%" delay={1} />
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
              <span className="text-sm font-bold text-[#92A4B1] uppercase tracking-widest">Back to Hub</span>
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

          <div className="w-10 sm:w-24" />
        </nav>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3C5665]/20 border border-[#3C5665]/30 text-[10px] font-bold text-[#92A4B1] uppercase tracking-widest mb-6 focus-glow">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Compilation Successful</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4 tracking-tight uppercase">
              {project.eventName}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-[#92A4B1]">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#29343D] rounded-lg border border-white/5 text-xs font-bold uppercase tracking-tighter">
                <Sparkles className="w-3 h-3 text-[#3C5665]" />
                {project.theme}
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#3C5665] opacity-50 hidden sm:block" />
              <span className="text-sm font-medium opacity-60">ID: {params.id.slice(0, 8)}...</span>
            </div>
          </motion.div>

          {/* Check if assets are generated */}
          {!project.generatedAssets || Object.keys(project.generatedAssets).length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="bg-[#29343D] border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
                <CardContent className="py-24 text-center relative z-10">
                  <Loader2 className="w-16 h-16 mx-auto mb-8 animate-spin text-[#3C5665]" />
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">Synthesizing Assets...</h3>
                  <p className="text-[#92A4B1] font-medium max-w-md mx-auto leading-relaxed">
                    The AI core is currently generating your high-fidelity marketing materials. Interface will update momentarily.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="space-y-12">
              {/* Poster Section */}
              {project.generatedAssets?.posterUrl && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-[#29343D] border border-white/5 rounded-[28px] p-8 shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#3C5665] opacity-[0.05] blur-[100px] pointer-events-none group-hover:opacity-10 transition-opacity" />

                  <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-2/5 aspect-square relative rounded-2xl overflow-hidden bg-[#1E2025] ring-1 ring-white/10 shadow-inner">
                      <Image
                        src={project.generatedAssets.posterUrl}
                        alt="Event Poster"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="w-full md:w-3/5 space-y-8 text-center md:text-left">
                      <div className="space-y-4">
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">VIRTUAL ASSET: <span className="text-[#92A4B1]">POSTER</span></h2>
                        <p className="text-[#92A4B1] text-lg font-medium opacity-80 leading-relaxed">
                          A high-resolution visual entity optimized for Instagram feeds and campus displays.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                          className="bg-[#3C5665] hover:bg-[#5A7480] text-white rounded-xl h-14 px-8 font-black uppercase text-xs tracking-widest shadow-lg glow-primary shimmer-btn transition-all"
                          onClick={downloadPoster}
                        >
                          <Download className="w-4 h-4 mr-3" />
                          Secure Download
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-[#1E2025]/50 border-white/5 hover:bg-[#1E2025] text-[#92A4B1] rounded-xl h-14 px-8 font-black uppercase text-xs tracking-widest transition-all"
                          onClick={() => window.open(project.generatedAssets?.posterUrl, "_blank")}
                        >
                          <Eye className="w-4 h-4 mr-3" />
                          Full Preview
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Text Content Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Caption */}
                {project.generatedAssets?.caption && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#29343D] border border-white/5 rounded-3xl p-8 relative overflow-hidden flex flex-col h-full group"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#3C5665]/20 flex items-center justify-center text-[#3C5665]">
                          <Share2 className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Protocol: Social Caption</h3>
                      </div>
                      <Button
                        size="icon"
                        className="bg-[#1E2025] hover:bg-[#3C5665] text-[#92A4B1] hover:text-white rounded-xl h-10 w-10 border border-white/5 transition-all"
                        onClick={() => copyToClipboard(project.generatedAssets.caption!, "Social Caption")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex-grow bg-[#1E2025]/50 rounded-2xl p-6 border border-white/5">
                      <p className="whitespace-pre-wrap text-[#D6E0E6] text-sm font-medium leading-relaxed opacity-80 italic italic">
                        {project.generatedAssets.caption}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* WhatsApp Message */}
                {project.generatedAssets?.whatsappMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#29343D] border border-white/5 rounded-3xl p-8 relative overflow-hidden flex flex-col h-full group"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#3C5665]/20 flex items-center justify-center text-[#3C5665]">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Protocol: AI Broadcast</h3>
                      </div>
                      <Button
                        size="icon"
                        className="bg-[#1E2025] hover:bg-[#3C5665] text-[#92A4B1] hover:text-white rounded-xl h-10 w-10 border border-white/5 transition-all"
                        onClick={() => copyToClipboard(project.generatedAssets.whatsappMessage!, "Instant Message")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex-grow bg-[#1E2025]/50 rounded-2xl p-6 border border-white/5">
                      <p className="whitespace-pre-wrap text-[#D6E0E6] text-sm font-medium leading-relaxed opacity-80">
                        {project.generatedAssets.whatsappMessage}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Email Invite */}
              {project.generatedAssets?.emailInvite && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-[#29343D] border border-white/5 rounded-[32px] p-8 relative overflow-hidden shadow-2xl"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight">EMAIL <span className="text-[#92A4B1]">PROTOCOL</span></h2>
                      <p className="text-[#92A4B1] text-xs font-bold uppercase tracking-widest opacity-60">High-conversion layout synthesized.</p>
                    </div>
                    <Button
                      className="bg-white/5 hover:bg-white/10 text-white rounded-xl px-6 h-12 font-black uppercase text-[10px] tracking-widest border border-white/10 transition-all active:scale-[0.98]"
                      onClick={() => copyToClipboard(project.generatedAssets.emailInvite!, "Email HTML")}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Raw Logic
                    </Button>
                  </div>

                  <div className="bg-white rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-8 ring-[#1E2025]">
                    <div
                      className="prose prose-sm max-w-none"
                      style={{
                        padding: '0',
                        background: 'white',
                        color: '#000'
                      }}
                      dangerouslySetInnerHTML={{
                        __html: project.generatedAssets.emailInvite,
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Landing Page */}
              {project.generatedAssets?.landingPageHTML && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-[#29343D] border border-white/5 rounded-[32px] p-8 relative overflow-hidden shadow-2xl"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight">LANDING <span className="text-[#92A4B1]">INTERFACE</span></h2>
                      <p className="text-[#92A4B1] text-xs font-bold uppercase tracking-widest opacity-60">Standalone registration portal node.</p>
                    </div>
                    <Button
                      className="bg-[#3C5665] hover:bg-[#5A7480] text-white rounded-xl px-8 h-12 font-black uppercase text-[10px] tracking-widest shadow-lg glow-primary shimmer-btn transition-all active:scale-[0.98]"
                      onClick={downloadHTML}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Deploy (Download)
                    </Button>
                  </div>

                  <div className="bg-[#1E2025] rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                    <div className="bg-[#29343D] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-400 opacity-50" />
                        <div className="w-2 h-2 rounded-full bg-amber-400 opacity-50" />
                        <div className="w-2 h-2 rounded-full bg-emerald-400 opacity-50" />
                      </div>
                      <div className="flex-grow mx-2 h-6 bg-[#1E2025] rounded-md border border-white/5 flex items-center justify-center">
                        <span className="text-[10px] text-[#92A4B1] font-medium opacity-40">preview.synthetic-deployment.internal</span>
                      </div>
                    </div>
                    <iframe
                      srcDoc={project.generatedAssets.landingPageHTML}
                      className="w-full h-[600px] border-0"
                      title="Landing Page Preview"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
