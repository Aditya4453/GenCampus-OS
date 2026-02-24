"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Image as ImageIcon, Mail, Globe, Zap, Shield, Cpu, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingBlob = ({ color, size, top, left, delay }: { color: string, size: string, top: string, left: string, delay: number }) => (
  <motion.div
    className="absolute rounded-full mix-blend-screen filter blur-[100px] opacity-20"
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -50, 20, 0],
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

const Particle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-[#92A4B1] rounded-full opacity-10"
    animate={{
      y: [0, -100, 0],
      opacity: [0, 0.2, 0],
    }}
    transition={{
      duration: Math.random() * 10 + 10,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }}
  />
);

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#1E2025] text-[#D6E0E6] relative overflow-hidden selection:bg-[#3C5665] selection:text-white">
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />

        {/* Radial Glow Top Right */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#3C5665] opacity-20 blur-[150px] -translate-y-1/2 translate-x-1/2" />

        <FloatingBlob color="#3C5665" size="500px" top="20%" left="10%" delay={0} />
        <FloatingBlob color="#5A7480" size="400px" top="60%" left="70%" delay={2} />

        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 0.5} />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#3C5665] flex items-center justify-center glow-primary">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">GEN<span className="text-[#92A4B1]">CAMPUS</span></span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <Link href="/login" className="text-sm font-medium hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/login">
              <Button className="bg-[#3C5665] hover:bg-[#5A7480] text-white rounded-full px-6 border-none glow-on-hover shimmer-btn">
                Launch App
              </Button>
            </Link>
          </motion.div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-40 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#92A4B1] mb-6"
            >
              <Sparkles className="w-3 h-3" />
              <span>Next-Gen Campus Intelligence</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] mb-8">
              GENERATE <br />
              <span className="text-[#92A4B1]">EXPERIENCES.</span>
            </h1>

            <p className="text-lg md:text-xl text-[#92A4B1] opacity-80 mb-10 max-w-lg mx-auto leading-relaxed">
              Empowering the next generation of campus creators with AI-driven marketing kits. From posters to landing pages, in seconds.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="bg-[#3C5665] hover:bg-[#5A7480] text-white rounded-[14px] px-8 h-14 text-base font-semibold glow-on-hover shimmer-btn">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-[#92A4B1]/30 text-[#92A4B1] hover:bg-white/5 bg-transparent rounded-[14px] px-8 h-14 text-base font-semibold">
                View Showcase
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Engineered for Impact</h2>
            <p className="text-[#92A4B1] max-w-2xl mx-auto">Focus on the event, let AI handle the distribution. Modular, fast, and stunningly beautiful.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ImageIcon className="w-6 h-6" />}
              title="Visual Assets"
              description="Professional-grade posters and social media banners tailored to your event's vibe."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Instant Copies"
              description="High-converting captions and email invites generated by models trained on campus trends."
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6" />}
              title="Landing Sites"
              description="Micro-sites for registration and info, deployed instantly with zero code needed."
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-32 border-t border-white/5">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-12 text-white">Workflow Redefined</h2>
              <div className="space-y-12 relative">
                <motion.div
                  className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-[#3C5665] via-[#5A7480] to-transparent"
                  style={{ scaleY: 1 }}
                />
                <StepItem number="01" title="Input Basics" description="Tell our AI about your event - name, date, and basic theme." />
                <StepItem number="02" title="AI Synthesizes" description="Our system analyzes your input to create a cohesive brand identity." />
                <StepItem number="03" title="Review & Refine" description="Choose from multiple variations and tweak the output to perfection." />
              </div>
            </div>
            <div className="bg-[#29343D] rounded-2xl border border-white/10 p-12 aspect-square flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-10" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-64 h-64 rounded-full border border-dashed border-[#92A4B1]/30 flex items-center justify-center"
              >
                <Cpu className="w-12 h-12 text-[#92A4B1]" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40">
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            className="bg-[#29343D] rounded-3xl p-16 text-center border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#3C5665] opacity-20 blur-[100px] -z-10" />
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">Ready to Elevate?</h2>
            <p className="text-[#92A4B1] text-lg mb-12 max-w-xl mx-auto opacity-80">
              Join the future of campus marketing. Create your first campaign in less than 60 seconds.
            </p>
            <Link href="/login">
              <Button size="lg" className="bg-[#3C5665] hover:bg-[#5A7480] text-white rounded-full px-12 h-16 text-lg font-bold glow-primary shimmer-btn transition-transform active:scale-95">
                Launch Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-[#92A4B1] opacity-50">
            © 2024 GenCampus OS. Built for creators.
          </div>
          <div className="flex gap-8">
            {['Twitter', 'GitHub', 'LinkedIn'].map((item) => (
              <a key={item} href="#" className="text-sm text-[#92A4B1] hover:text-white transition-colors opacity-50 hover:opacity-100">
                {item}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="p-8 rounded-[18px] bg-[#29343D] border border-white/5 hover:border-[#5A7480]/50 transition-all group overflow-hidden relative"
    >
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#3C5665]/10 rounded-full blur-2xl group-hover:bg-[#3C5665]/20" />
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-12 h-12 rounded-xl bg-[#1E2025] flex items-center justify-center text-[#92A4B1] mb-6 border border-white/5"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-[#92A4B1] text-sm leading-relaxed opacity-80">{description}</p>
    </motion.div>
  );
}

function StepItem({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-8 group"
    >
      <div className="w-14 h-14 rounded-full bg-[#1E2025] border border-[#3C5665] flex items-center justify-center text-sm font-black text-white z-10 group-hover:bg-[#3C5665] group-hover:border-[#5A7480] transition-colors glow-primary">
        {number}
      </div>
      <div>
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-[#92A4B1] text-sm opacity-80">{description}</p>
      </div>
    </motion.div>
  );
}

const IconShield = () => <Shield className="w-8 h-8 text-[#92A4B1]" />;
const IconZap = () => <Zap className="w-8 h-8 text-[#92A4B1]" />;
const IconRocket = () => <Rocket className="w-8 h-8 text-[#92A4B1]" />;
const IconMail = () => <Mail className="w-8 h-8 text-[#92A4B1]" />;
