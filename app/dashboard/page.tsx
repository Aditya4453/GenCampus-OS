"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Sparkles, LogOut } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">GenCampus OS</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{session?.user?.email}</span>
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </nav>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Your Campaigns</h1>
          <Link href="/create">
            <Button size="lg">
              <Plus className="w-5 h-5 mr-2" />
              New Campaign
            </Button>
          </Link>
        </div>

        {projects.length === 0 ? (
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardContent className="py-16 text-center">
              <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No campaigns yet</h3>
              <p className="text-gray-400 mb-6">
                Create your first AI-powered marketing campaign
              </p>
              <Link href="/create">
                <Button>
                  <Plus className="w-5 h-5 mr-2" />
                  Create Campaign
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link key={project._id} href={`/project/${project._id}`}>
                <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:border-primary/50 transition-all cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl">{project.eventName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-2">{project.theme}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span
                        className={`px-2 py-1 rounded ${
                          project.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : project.status === "generating"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {project.status}
                      </span>
                      <span className="text-gray-500">
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
