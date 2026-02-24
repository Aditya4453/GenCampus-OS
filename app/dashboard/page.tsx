"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Sparkles, LogOut, Loader2, Cpu, Calendar, CheckCircle2, Clock } from "lucide-react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

interface Project {
  _id: string;
  eventName: string;
  theme: string;
  status: string;
  createdAt: string;
}

const FloatingBlob = ({ color, size, top, left, delay }: { color: string, size: string, top: string, left: string, delay: number }) => (
  <motion.div
    className="absolute rounded-full mix-blend-screen filter blur-[100px] opacity-10"
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.1, 0.9, 1],
    }}
    transition={{
      duration: 20,
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

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchProjects();
    }
  }, [status]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#1E2025] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[#3C5665]" />
          <p className="text-[#92A4B1] font-medium tracking-wide animate-pulse">Initializing Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E2025] text-[#D6E0E6] relative overflow-hidden selection:bg-[#3C5665] selection:text-white pb-20">
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#3C5665] opacity-20 blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <FloatingBlob color="#3C5665" size="500px" top="10%" left="10%" delay={0} />
        <FloatingBlob color="#5A7480" size="400px" top="60%" left="70%" delay={2} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center py-8 mb-12 border-b border-white/5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-[#3C5665] flex items-center justify-center glow-primary group-hover:scale-105 transition-transform">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase">GEN<span className="text-[#92A4B1]">CAMPUS</span></span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-[#92A4B1] uppercase tracking-tighter">Authorized as</span>
              <span className="text-sm font-medium text-white">{session?.user?.email}</span>
            </div>
            <Button
              className="bg-white/5 hover:bg-white/10 text-white rounded-full px-5 border border-white/10 glow-on-hover transition-all"
              size="sm"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </motion.div>
        </nav>

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3C5665]/20 border border-[#3C5665]/30 text-[10px] font-bold text-[#92A4B1] uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Personal Workspace</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              DEPLOY <br />
              <span className="text-[#92A4B1]">STRATEGIES.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/create">
              <Button size="lg" className="bg-[#3C5665] hover:bg-[#5A7480] text-white rounded-2xl px-8 h-14 text-base font-bold shadow-xl glow-primary shimmer-btn transition-all active:scale-[0.98]">
                <Plus className="w-5 h-5 mr-3" />
                Initialize New Campaign
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Projects Content */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-[#29343D] border-white/5 shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
              <CardContent className="py-28 text-center relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-[#1E2025] border border-[#3C5665]/30 flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Cpu className="w-10 h-10 text-[#3C5665] opacity-50" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">No active nodes.</h3>
                <p className="text-[#92A4B1] mb-10 max-w-md mx-auto leading-relaxed">
                  Start by initializing your first campaign. Our AI will synthesize everything you need in seconds.
                </p>
                <Link href="/create">
                  <Button size="lg" className="bg-[#3C5665] hover:bg-[#5A7480] text-white rounded-xl px-10 h-14 font-bold shimmer-btn">
                    <Plus className="w-5 h-5 mr-2" />
                    Launch Creation Wizard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link href={`/project/${project._id}`}>
                  <Card
                    className="bg-[#29343D] border-white/5 hover:border-[#5A7480]/50 shadow-xl transition-all cursor-pointer group relative overflow-hidden h-full flex flex-col"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#3C5665] opacity-0 group-hover:opacity-10 blur-3xl transition-opacity" />

                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-[#1E2025] rounded-xl border border-white/5 text-[#92A4B1] group-hover:text-white transition-colors">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <StatusBadge status={project.status} />
                      </div>
                      <CardTitle className="text-xl font-bold text-white group-hover:text-[#92A4B1] transition-colors line-clamp-1">
                        {project.eventName}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-grow flex flex-col justify-between">
                      <p className="text-[#92A4B1] text-sm font-medium opacity-70 line-clamp-2 mb-6">
                        {project.theme}
                      </p>

                      <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-black uppercase tracking-tighter text-[#92A4B1]">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          View details <Plus className="w-3 h-3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isCompleted = status === "completed";
  const isGenerating = status === "generating";

  return (
    <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${isCompleted
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        : isGenerating
          ? "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse"
          : "bg-[#3C5665]/20 text-[#92A4B1] border-white/5"
      }`}>
      <div className="flex items-center gap-1.5">
        {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : isGenerating ? <Clock className="w-3 h-3" /> : null}
        {status}
      </div>
    </div>
  );
}
