// "use client";

// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
// import { useLesson } from "@/hooks/useConvex";

// function getYouTubeEmbed(url: string) {
//   try {
//     const u = new URL(url);
//     if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
//       // support both youtu.be and youtube.com/watch?v=
//       let id = "";
//       if (u.hostname.includes("youtu.be")) {
//         id = u.pathname.slice(1);
//       } else {
//         id = u.searchParams.get("v") || "";
//       }
//       if (id) return `https://www.youtube.com/embed/${id}`;
//     }
//   } catch (e) {
//     // ignore
//   }
//   return null;
// }

// export default function LessonPlayer() {
//   const params = useParams();
//   const slug = params?.slug as string;
//   const lessonId = params?.lessonId as string;

//   const lesson = useLesson(lessonId);

//   const videoUrl = lesson?.videoUrl || "";
//   const yt = videoUrl ? getYouTubeEmbed(videoUrl) : null;

//   return (
//     <div className="flex min-h-screen flex-col bg-background">
//       {/* Header */}
//       <header className="border-b border-border">
//         <div className="container mx-auto flex h-16 items-center justify-between px-4">
//           <Link
//             href={`/courses/${slug}`}
//             className="flex items-center gap-2 text-sm hover:text-primary"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Course
//           </Link>

//           <div className="flex items-center gap-4">
//             <Button variant="outline" size="sm">
//               Previous Lesson
//             </Button>
//             <Button size="sm">
//               Next Lesson
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1">
//         <div className="container mx-auto px-4 py-8">
//           <div className="mx-auto max-w-4xl">
//             <h1 className="mb-4 text-3xl font-bold">{lesson?.title || `Lesson ${lessonId}`}</h1>
//             <div className="aspect-video overflow-hidden rounded-xl border border-border bg-muted">
//               {videoUrl ? (
//                 yt ? (
//                   <iframe
//                     src={yt}
//                     title={lesson?.title || "Video"}
//                     className="h-full w-full"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   />
//                 ) : (
//                   <video src={videoUrl} controls className="h-full w-full object-cover" />
//                 )
//               ) : (
//                 <div className="flex h-full items-center justify-center">
//                   <p className="text-muted-foreground">No video available for this lesson.</p>
//                 </div>
//               )}
//             </div>

//             <div className="mt-8">
//               <Button className="w-full" size="lg">
//                 <CheckCircle2 className="mr-2 h-5 w-5" />
//                 Mark as Complete
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MainLayout } from "@/components/layout/MainLayout";

import {
  ArrowLeft,
  Play,
  List,
  Clock,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { useCourse, useLessons, useLesson } from "@/hooks/useConvex";

/* ---------------- utils ---------------- */

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null;

  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}?rel=0`;
    }

    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}?rel=0`;
    }
  } catch {
    return null;
  }

  return null;
}

/* ---------------- component ---------------- */

export default function LessonPlayer() {
  const { slug, lessonId } = useParams<{
    slug: string;
    lessonId: string;
  }>();

  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(true);

  const course = useCourse(slug);
  const lessons = useLessons(course?._id);
  const lesson = useLesson(lessonId);

  /* -------- loading -------- */

  if (course === undefined || lessons === undefined || lesson === undefined) {
    return (
      <MainLayout>
        <div className="flex min-h-[80vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  if (!course || !lesson) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Lesson not found</h1>
          <Link href="/courses">
            <Button variant="outline">Back to Courses</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  /* -------- lesson navigation -------- */

  const currentIndex = lessons.findIndex((l) => l._id === lessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  const embedUrl = getYouTubeEmbedUrl(lesson.videoUrl);

  /* ---------------- render ---------------- */

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/courses/${slug}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Course</span>
            </Link>

            <div className="hidden md:block text-sm font-medium">
              {course.title}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSidebar((v) => !v)}
            className="gap-2"
          >
            <List className="h-4 w-4" />
            Lessons
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* ---------- Main ---------- */}
        <main className={`flex-1 ${showSidebar ? "lg:mr-80" : ""}`}>
          {/* Video */}
          {/* Video */}
          <div className="mx-auto w-full max-w-4xl">
            <div className="aspect-video overflow-hidden rounded-xl bg-black">

              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={lesson.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : lesson.videoUrl ? (
                <video
                  src={lesson.videoUrl}
                  controls
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  No video available
                </div>
              )}
            </div>
          </div>
          {/* Info */}
          <div className="p-6">
            <div className="mx-auto max-w-4xl">
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="outline">{lesson.moduleTitle}</Badge>
                <Badge variant="cyber" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {lesson.duration} min
                </Badge>
              </div>

              <h1 className="mb-4 text-2xl font-bold md:text-3xl">
                {lesson.title}
              </h1>

              <p className="text-muted-foreground">
                {lesson.description}
              </p>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between border-t pt-6">
                {prevLesson ? (
                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(
                        `/courses/${slug}/lesson/${prevLesson._id}`
                      )
                    }
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                ) : (
                  <div />
                )}

                {nextLesson && (
                  <Button
                    variant="hero"
                    onClick={() =>
                      router.push(
                        `/courses/${slug}/lesson/${nextLesson._id}`
                      )
                    }
                    className="gap-2"
                  >
                    Next Lesson
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* ---------- Sidebar ---------- */}
        {showSidebar && (
          <motion.aside
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            className="fixed right-0 top-14 hidden h-[calc(100vh-3.5rem)] w-80 overflow-y-auto border-l bg-card lg:block"
          >
            <div className="p-4">
              <h3 className="mb-4 font-semibold">Course Content</h3>

              <div className="space-y-2">
                {lessons.map((l, index) => {
                  const active = l._id === lessonId;

                  return (
                    <Link
                      key={l._id}
                      href={`/courses/${slug}/lesson/${l._id}`}
                      className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${active
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                        }`}
                    >
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${active
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                          }`}
                      >
                        {active ? <Play className="h-3 w-3" /> : index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {l.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {l.duration} min
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        )}
      </div>
    </div>
  );
}
