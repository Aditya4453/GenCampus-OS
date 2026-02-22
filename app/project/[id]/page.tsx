"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, ArrowLeft, Copy, Download, Loader2 } from "lucide-react";

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

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          title: "Error",
          description: "Project not found",
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
      title: "Copied!",
      description: `${label} copied to clipboard`,
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
      // Fallback: open in new tab if fetch fails (e.g. CORS)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black grain flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-white" />
          <p className="text-gray-400">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen bg-black grain relative overflow-hidden">
      {/* Subtle background gradients */}
      <div className="absolute top-20 right-20 w-[400px] h-[400px] gradient-orange opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-[500px] h-[500px] gradient-blue opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
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

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 fade-in">
            <h1 className="text-5xl font-bold mb-3">{project.eventName}</h1>
            <p className="text-xl text-gray-400 font-light">{project.theme}</p>
          </div>

          {/* Check if assets are generated */}
          {!project.generatedAssets || Object.keys(project.generatedAssets).length === 0 ? (
            <Card className="glass-card">
              <CardContent className="py-20 text-center">
                <Loader2 className="w-16 h-16 mx-auto mb-6 animate-spin text-white" />
                <h3 className="text-3xl font-bold mb-3">Generating Your Campaign</h3>
                <p className="text-gray-400 font-light max-w-md mx-auto">
                  AI is creating your marketing assets. This usually takes 5-10 seconds.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Poster Section */}
              {project.generatedAssets?.posterUrl && (
                <div className="glass-card rounded-2xl p-8 fade-in">
                  <h2 className="text-2xl font-semibold mb-6">Instagram Poster</h2>
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
                      <Image
                        src={project.generatedAssets.posterUrl}
                        alt="Event Poster"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-gray-400 mb-6 font-light">
                        High-quality poster ready for Instagram and social media
                      </p>
                      <Button
                        className="btn-primary w-full"
                        onClick={downloadPoster}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Poster
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Text Content Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Caption */}
                {project.generatedAssets?.caption && (
                  <div className="glass-card rounded-2xl p-6 fade-in">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">Instagram Caption</h3>
                      <Button
                        size="sm"
                        className="btn-secondary"
                        onClick={() =>
                          copyToClipboard(
                            project.generatedAssets.caption!,
                            "Caption"
                          )
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="whitespace-pre-wrap text-gray-300 font-light leading-relaxed">
                      {project.generatedAssets.caption}
                    </p>
                  </div>
                )}

                {/* WhatsApp Message */}
                {project.generatedAssets?.whatsappMessage && (
                  <div className="glass-card rounded-2xl p-6 fade-in">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">WhatsApp Message</h3>
                      <Button
                        size="sm"
                        className="btn-secondary"
                        onClick={() =>
                          copyToClipboard(
                            project.generatedAssets.whatsappMessage!,
                            "WhatsApp message"
                          )
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="whitespace-pre-wrap text-gray-300 font-light leading-relaxed">
                      {project.generatedAssets.whatsappMessage}
                    </p>
                  </div>
                )}
              </div>

              {/* Email Invite */}
              {project.generatedAssets?.emailInvite && (
                <div className="glass-card rounded-2xl p-8 fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Email Invite</h2>
                    <Button
                      className="btn-secondary"
                      onClick={() =>
                        copyToClipboard(
                          project.generatedAssets.emailInvite!,
                          "Email"
                        )
                      }
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy HTML
                    </Button>
                  </div>
                  <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
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
                </div>
              )}

              {/* Landing Page */}
              {project.generatedAssets?.landingPageHTML && (
                <div className="glass-card rounded-2xl p-8 fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Landing Page</h2>
                    <Button className="btn-primary" onClick={downloadHTML}>
                      <Download className="w-4 h-4 mr-2" />
                      Download HTML
                    </Button>
                  </div>
                  <div className="bg-white rounded-xl overflow-hidden">
                    <iframe
                      srcDoc={project.generatedAssets.landingPageHTML}
                      className="w-full h-[600px] border-0"
                      title="Landing Page Preview"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
