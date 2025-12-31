"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLesson } from "@/hooks/useConvex";

function getYouTubeEmbed(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      // support both youtu.be and youtube.com/watch?v=
      let id = "";
      if (u.hostname.includes("youtu.be")) {
        id = u.pathname.slice(1);
      } else {
        id = u.searchParams.get("v") || "";
      }
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch (e) {
    // ignore
  }
  return null;
}

export default function LessonPlayer() {
  const params = useParams();
  const slug = params?.slug as string;
  const lessonId = params?.lessonId as string;

  const lesson = useLesson(lessonId);

  const videoUrl = lesson?.videoUrl || "";
  const yt = videoUrl ? getYouTubeEmbed(videoUrl) : null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href={`/courses/${slug}`}
            className="flex items-center gap-2 text-sm hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Previous Lesson
            </Button>
            <Button size="sm">
              Next Lesson
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-3xl font-bold">{lesson?.title || `Lesson ${lessonId}`}</h1>
            <div className="aspect-video overflow-hidden rounded-xl border border-border bg-muted">
              {videoUrl ? (
                yt ? (
                  <iframe
                    src={yt}
                    title={lesson?.title || "Video"}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={videoUrl} controls className="h-full w-full object-cover" />
                )
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">No video available for this lesson.</p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <Button className="w-full" size="lg">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Mark as Complete
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}