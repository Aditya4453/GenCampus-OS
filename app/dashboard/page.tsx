"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Sparkles, LogOut, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";

interface Project {
  _id: string;
  eventName: string;
  theme: string;
  status: string;
  createdAt: string;
}

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
      <div className="min-h-screen bg-black grain flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-white" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black grain relative overflow-hidden">
      {/* Subtle background gradients */}
      <div className="absolute top-20 right-20 w-[400px] h-[400px] gradient-purple opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-[500px] h-[500px] gradient-blue opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-xl font-semibold">GenCampus OS</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 glass-card px-4 py-2 rounded-full font-light">
              {session?.user?.email}
            </span>
            <Button className="btn-secondary" size="sm" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </nav>

        {/* Header */}
        <div className="flex justify-between items-center mb-12 fade-in">
          <div>
            <h1 className="text-5xl font-bold mb-2">Your Campaigns</h1>
            <p className="text-gray-400 text-lg font-light">
              Manage and create AI-powered marketing campaigns
            </p>
          </div>
          <Link href="/create">
            <Button size="lg" className="btn-primary">
              <Plus className="w-5 h-5 mr-2" />
              New Campaign
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <Card className="glass-card fade-in">
            <CardContent className="py-24 text-center">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-3">No campaigns yet</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto font-light">
                Create your first AI-powered marketing campaign and watch the magic happen
              </p>
              <Link href="/create">
                <Button size="lg" className="btn-primary">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Campaign
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Link key={project._id} href={`/project/${project._id}`}>
                <Card 
                  className="glass-card hover:bg-white/5 transition-all cursor-pointer fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                      {project.eventName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4 font-light line-clamp-2">
                      {project.theme}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span
                        className={`px-3 py-1 rounded-full font-medium ${
                          project.status === "completed"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : project.status === "generating"
                            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 animate-pulse"
                            : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                        }`}
                      >
                        {project.status}
                      </span>
                      <span className="text-gray-500 font-light">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
