import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Rocket, ArrowRight, Image as ImageIcon, Mail, MessageSquare, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black grain relative overflow-hidden">
      {/* Spline 3D Scene Background */}
      <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
        <iframe 
          src='https://my.spline.design/untitled-98a3dc23a79d4f4fa51a2d4fadcabc35/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          style={{ border: 'none' }}
        />
      </div>
      
      {/* Subtle gradient orbs in background */}
      <div className="absolute top-20 right-20 w-[500px] h-[500px] gradient-orange opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-[600px] h-[600px] gradient-blue opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Clean Navigation */}
        <nav className="flex justify-between items-center mb-32">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-xl font-semibold">GenCampus OS</span>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost" className="btn-secondary">Login</Button>
            </Link>
            <Link href="/login">
              <Button className="btn-primary">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-40 fade-in">
          <div className="inline-block mb-6">
            <span className="glass-card px-4 py-2 rounded-full text-sm font-medium">
              AI-Powered Marketing Platform
            </span>
          </div>
          
          <h1 className="text-7xl font-bold mb-6 leading-tight tracking-tight">
            Create Stunning
            <br />
            <span className="text-gray-400">Marketing Campaigns</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
            Generate complete marketing kits for college events in seconds.
            Powered by advanced AI technology.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="btn-primary text-base px-8 py-6">
                Start Creating Free
              </Button>
            </Link>
            <Button size="lg" className="btn-secondary text-base px-8 py-6">
              View Demo
            </Button>
          </div>
        </div>

        {/* What You Get Section */}
        <div className="max-w-6xl mx-auto mb-32">
          <h2 className="text-4xl font-bold text-center mb-16">What You Get</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Instagram Poster</h3>
              <p className="text-sm text-gray-400 font-light">Eye-catching visuals</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Caption</h3>
              <p className="text-sm text-gray-400 font-light">Engaging copy</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Email Invite</h3>
              <p className="text-sm text-gray-400 font-light">Professional emails</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Landing Page</h3>
              <p className="text-sm text-gray-400 font-light">Complete website</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">10s</div>
            <div className="text-gray-400 font-light">Generation Time</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">5+</div>
            <div className="text-gray-400 font-light">Assets Created</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">AI</div>
            <div className="text-gray-400 font-light">Powered</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center glass-card rounded-3xl p-16 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-8 font-light">
            Join thousands of students creating amazing campaigns
          </p>
          <Link href="/login">
            <Button size="lg" className="btn-primary text-base px-10 py-6">
              Create Your First Campaign
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
