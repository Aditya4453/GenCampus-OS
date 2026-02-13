import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">GenCampus OS</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Creation Operating System for Colleges
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Generate complete marketing campaigns in seconds. Posters, captions, emails, and landing pages—all powered by AI.
          </p>
          <Link href="/login">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Creating <Zap className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <Sparkles className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-3">AI-Powered</h3>
            <p className="text-gray-400">
              Generate stunning visuals and compelling copy using GPT-4 and DALL-E
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <Zap className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Lightning Fast</h3>
            <p className="text-gray-400">
              Complete marketing kits in under 60 seconds. No design skills needed
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <Rocket className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-3">All-in-One</h3>
            <p className="text-gray-400">
              Posters, captions, emails, WhatsApp messages, and landing pages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
