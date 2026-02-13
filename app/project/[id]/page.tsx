"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, ArrowLeft, Copy, Download } from "lucide-react";

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

  const downloadHTML = () => {
    if (!project?.generatedAssets.landingPageHTML) return;
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">GenCampus OS</span>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </nav>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">{project.eventName}</h1>
          <p className="text-gray-400 mb-8">{project.theme}</p>

          <div className="grid lg:grid-cols-2 gap-6">
            {project.generatedAssets.posterUrl && (
              <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <CardTitle>Instagram Poster</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <Image
                      src={project.generatedAssets.posterUrl}
                      alt="Event Poster"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      window.open(project.generatedAssets.posterUrl, "_blank")
                    }
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Image
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              {project.generatedAssets.caption && (
                <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Instagram Caption</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(
                          project.generatedAssets.caption!,
                          "Caption"
                        )
                      }
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-sm">
                      {project.generatedAssets.caption}
                    </p>
                  </CardContent>
                </Card>
              )}

              {project.generatedAssets.whatsappMessage && (
                <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>WhatsApp Message</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(
                          project.generatedAssets.whatsappMessage!,
                          "WhatsApp message"
                        )
                      }
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-sm">
                      {project.generatedAssets.whatsappMessage}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {project.generatedAssets.emailInvite && (
              <Card className="bg-white/5 backdrop-blur-lg border-white/10 lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Email Invite</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        project.generatedAssets.emailInvite!,
                        "Email"
                      )
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose prose-invert max-w-none text-sm"
                    dangerouslySetInnerHTML={{
                      __html: project.generatedAssets.emailInvite,
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {project.generatedAssets.landingPageHTML && (
              <Card className="bg-white/5 backdrop-blur-lg border-white/10 lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Landing Page</CardTitle>
                  <Button variant="ghost" size="sm" onClick={downloadHTML}>
                    <Download className="w-4 h-4 mr-2" />
                    Download HTML
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-lg overflow-hidden">
                    <iframe
                      srcDoc={project.generatedAssets.landingPageHTML}
                      className="w-full h-96 border-0"
                      title="Landing Page Preview"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
