"use client";

import { motion } from "framer-motion";
import { BookOpen, Newspaper, Video, Users, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAllCourses, useAllNews } from "@/hooks/useConvex";
import Link from "next/link";

export default function AdminDashboard() {
  const courses = useAllCourses();
  const news = useAllNews();

  const publishedCourses = courses?.filter((c) => c.isPublished).length || 0;
  const draftCourses = (courses?.length || 0) - publishedCourses;
  const publishedNews = news?.filter((n) => n.isPublished).length || 0;
  const draftNews = (news?.length || 0) - publishedNews;
  const totalLessons = courses?.reduce((acc, c) => acc + c.lessonsCount, 0) || 0;

  return (
    <div className="p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your courses, lessons, and news articles
        </p>
      </header>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <Link href="/admin/courses" className="block">
          <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
            <div className="flex items-center justify-between">
              <BookOpen className="h-5 w-5 text-primary" />
              <Badge variant="cyber">{draftCourses} drafts</Badge>
            </div>
            <p className="mt-4 text-3xl font-bold">{courses?.length || 0}</p>
            <p className="text-sm text-muted-foreground">Total Courses</p>
          </div>
        </Link>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <Video className="h-5 w-5 text-success" />
          </div>
          <p className="mt-4 text-3xl font-bold">{totalLessons}</p>
          <p className="text-sm text-muted-foreground">Total Lessons</p>
        </div>

        <Link href="/admin/news" className="block">
          <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
            <div className="flex items-center justify-between">
              <Newspaper className="h-5 w-5 text-warning" />
              <Badge variant="warning">{draftNews} drafts</Badge>
            </div>
            <p className="mt-4 text-3xl font-bold">{news?.length || 0}</p>
            <p className="text-sm text-muted-foreground">News Articles</p>
          </div>
        </Link>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <TrendingUp className="h-5 w-5 text-secondary" />
          </div>
          <p className="mt-4 text-3xl font-bold">{publishedCourses + publishedNews}</p>
          <p className="text-sm text-muted-foreground">Published Content</p>
        </div>
      </motion.div>

      {/* Recent Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Courses</h2>
            <Link href="/admin/courses" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card">
            {courses === undefined ? (
              <div className="p-4 text-center text-muted-foreground">Loading...</div>
            ) : !courses || courses.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No courses yet</div>
            ) : (
              courses.slice(0, 5).map((course, index) => (
                <div
                  key={course._id}
                  className={`flex items-center justify-between p-4 ${
                    index !== Math.min(courses.length - 1, 4) ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-16 overflow-hidden rounded bg-muted">
                      {course.image && (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{course.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {course.lessonsCount} lessons
                      </p>
                    </div>
                  </div>
                  <Badge variant={course.isPublished ? "success" : "outline"}>
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent News</h2>
            <Link href="/admin/news" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card">
            {news === undefined ? (
              <div className="p-4 text-center text-muted-foreground">Loading...</div>
            ) : !news || news.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No articles yet</div>
            ) : (
              news.slice(0, 5).map((article, index) => (
                <div
                  key={article._id}
                  className={`flex items-center justify-between p-4 ${
                    index !== Math.min(news.length - 1, 4) ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-16 overflow-hidden rounded bg-muted">
                      {article.image && (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium line-clamp-1">{article.title}</p>
                      <p className="text-xs text-muted-foreground">{article.category}</p>
                    </div>
                  </div>
                  <Badge variant={article.isPublished ? "success" : "outline"}>
                    {article.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
