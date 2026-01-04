"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCourse, useLessons } from "@/hooks/useConvex";
import { 
  Clock, 
  BookOpen, 
  Users, 
  Star, 
  Play, 
  CheckCircle2, 
  Lock,
  ArrowLeft,
  Download,
  Share2,
  Loader2
} from "lucide-react";

export default function CourseDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const course = useCourse(slug || "");
  const lessons = useLessons(course?._id);

  if (course === undefined) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <Link href="/courses">
            <Button variant="outline">Back to Courses</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  // Group lessons by module
  const moduleMap = new Map<string, typeof lessons>();
  lessons?.forEach((lesson) => {
    const existing = moduleMap.get(lesson.moduleTitle) || [];
    moduleMap.set(lesson.moduleTitle, [...existing, lesson]);
  });
  const modules = Array.from(moduleMap.entries());

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container relative mx-auto max-w-7xl px-4 py-12">
          <Link
            href="/courses"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Course Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="cyber">{course.category}</Badge>
                <Badge variant={course.level as "beginner" | "intermediate" | "advanced"}>
                  {course.level}
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">
                    ({"students" in course ? course.students : "studentCount" in course ? course.studentCount : 0})
                  </span>
                </div>
              </div>

              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                {course.title}
              </h1>
              
              <p className="mb-6 text-lg text-muted-foreground">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{lessons?.length || 0} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{"students" in course ? course.students : "studentCount" in course ? course.studentCount : 0} students</span>
                </div>
              </div>
            </motion.div>

            {/* Action Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:sticky lg:top-4"
            >
              <div className="overflow-hidden rounded-xl border border-border bg-card p-6">
                <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg bg-muted">
                  {/* Course preview image/video placeholder */}
                  <div className="flex h-full items-center justify-center">
                    <Play className="h-16 w-16 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full" size="lg">
                    <Play className="mr-2 h-5 w-5" />
                    Start Learning
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-2xl font-bold">Course Content</h2>
              
              {lessons === undefined ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : modules.length === 0 ? (
                <p className="text-muted-foreground">No lessons available yet.</p>
              ) : (
                <div className="space-y-4">
                  {modules.map(([moduleTitle, moduleLessons], moduleIndex) => (
                    <div key={moduleIndex} className="overflow-hidden rounded-xl border border-border bg-card">
                      <div className="border-b border-border bg-muted/50 p-4">
                        <h3 className="font-semibold">{moduleTitle}</h3>
                        <p className="text-sm text-muted-foreground">
                          {moduleLessons.length} lessons
                        </p>
                      </div>
                      <div className="divide-y divide-border">
                        {moduleLessons.map((lesson) => (
                          <Link
                            key={lesson._id}
                            href={`/courses/${slug}/lesson/${lesson._id}`}
                            className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              {"completed" in lesson && lesson.completed ? (
                                <CheckCircle2 className="h-5 w-5 text-success" />
                              ) : "locked" in lesson && lesson.locked ? (
                                <Lock className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <Play className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{lesson.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {lesson.duration}
                              </p>
                            </div>
                            {"locked" in lesson && lesson.locked && (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-bold">About This Course</h2>
              <div className="space-y-6 rounded-xl border border-border bg-card p-6">
                <div>
                  <h3 className="mb-2 font-semibold">What You'll Learn</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>Understand core concepts and methodologies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>Apply practical skills through hands-on exercises</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>Master industry-standard tools and techniques</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Prerequisites</h3>
                  <p className="text-sm text-muted-foreground">
                    Basic understanding of computer networks and programming concepts recommended.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}