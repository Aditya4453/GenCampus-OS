"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CreatePage() {
  const { status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    theme: "",
    audience: "",
    tone: "",
  });

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
          title: "Success!",
          description: "Your campaign has been generated",
        });
        router.push(`/project/${data.projectId}`);
      } else {
        const data = await res.json();
        toast({
          title: "Error",
          description: data.error || "Failed to generate campaign",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black grain relative overflow-hidden">
      {/* Subtle background gradients */}
      <div className="absolute top-20 right-20 w-[400px] h-[400px] gradient-orange opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-[500px] h-[500px] gradient-purple opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-xl font-semibold">GenCampus OS</span>
          </div>
          <Link href="/dashboard">
            <Button className="btn-secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </nav>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <h1 className="text-5xl font-bold mb-4">
              Create New Campaign
            </h1>
            <p className="text-gray-400 text-lg font-light">
              Fill in the details and let AI create your marketing magic
            </p>
          </div>

          {/* Form Card */}
          <Card className="glass-card fade-in">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Event Details</CardTitle>
              <p className="text-gray-400 mt-2 font-light">Tell us about your event</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="eventName" className="text-base font-medium">
                    Event Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="eventName"
                    placeholder="e.g., Tech Fest 2024"
                    value={formData.eventName}
                    onChange={(e) =>
                      setFormData({ ...formData, eventName: e.target.value })
                    }
                    required
                    className="bg-white/5 border-white/10 focus:border-white/20 h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme" className="text-base font-medium">
                    Theme <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="theme"
                    placeholder="e.g., Innovation and Future Technology"
                    value={formData.theme}
                    onChange={(e) =>
                      setFormData({ ...formData, theme: e.target.value })
                    }
                    required
                    className="bg-white/5 border-white/10 focus:border-white/20 h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience" className="text-base font-medium">
                    Target Audience
                  </Label>
                  <Input
                    id="audience"
                    placeholder="e.g., Engineering students, Tech enthusiasts"
                    value={formData.audience}
                    onChange={(e) =>
                      setFormData({ ...formData, audience: e.target.value })
                    }
                    className="bg-white/5 border-white/10 focus:border-white/20 h-12"
                  />
                  <p className="text-xs text-gray-500 font-light">
                    Leave blank for default: college students
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone" className="text-base font-medium">
                    Tone
                  </Label>
                  <Input
                    id="tone"
                    placeholder="e.g., Professional, Energetic, Fun"
                    value={formData.tone}
                    onChange={(e) =>
                      setFormData({ ...formData, tone: e.target.value })
                    }
                    className="bg-white/5 border-white/10 focus:border-white/20 h-12"
                  />
                  <p className="text-xs text-gray-500 font-light">
                    Leave blank for default: energetic and engaging
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-base btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating Magic...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Campaign
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <div className="mt-8 glass-card rounded-2xl p-6 text-center fade-in">
            <p className="text-gray-400 mb-2 font-light">
              ✨ AI will generate: Instagram poster, caption, email invite,
              WhatsApp message, and landing page
            </p>
            <p className="text-sm text-gray-500 font-light">Usually takes 5-10 seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
}
