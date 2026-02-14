"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestGeneratePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [eventName, setEventName] = useState("Tech Fest 2024");
  const [theme, setTheme] = useState("Innovation and Future Technology");

  const handleTest = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/test-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventName, theme }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || "Failed to generate");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Test AI Generation
        </h1>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10 mb-6">
          <CardHeader>
            <CardTitle>Test Campaign Generation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Event Name</Label>
              <Input
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Tech Fest 2024"
              />
            </div>
            <div>
              <Label>Theme</Label>
              <Input
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="Innovation and Future Technology"
              />
            </div>
            <Button onClick={handleTest} disabled={loading} className="w-full">
              {loading ? "Generating..." : "Test Generate"}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <Card className="bg-red-500/10 border-red-500/50 mb-6">
            <CardContent className="pt-6">
              <p className="text-red-400">Error: {error}</p>
            </CardContent>
          </Card>
        )}

        {result && (
          <div className="space-y-4">
            <Card className="bg-green-500/10 border-green-500/50">
              <CardContent className="pt-6">
                <p className="text-green-400 font-bold">✅ Success!</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle>Poster URL</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={result.posterUrl}
                  alt="Poster"
                  className="w-full rounded"
                />
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle>Caption</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{result.content.caption}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle>WhatsApp Message</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">
                  {result.content.whatsappMessage}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle>Email Invite</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: result.content.emailInvite,
                  }}
                />
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle>Landing Page Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <iframe
                  srcDoc={result.content.landingPageHTML}
                  className="w-full h-96 bg-white rounded"
                  title="Landing Page"
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
