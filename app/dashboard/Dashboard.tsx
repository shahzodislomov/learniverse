"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { 
  Shield, 
  LayoutDashboard, 
  BookOpen, 
  Terminal, 
  Trophy, 
  Settings,
  TrendingUp,
  Target,
  Clock,
  Flame,
  Award,
  ArrowRight,
  ChevronRight
} from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/progress", label: "Progress", icon: TrendingUp },
  { href: "/dashboard/certificates", label: "Certificates", icon: Award },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const recentActivity = [
  { type: "course", title: "Web Application Security", action: "Completed module 2", time: "2 hours ago" },
  { type: "lab", title: "SQL Injection Basics", action: "Earned 100 points", time: "5 hours ago" },
  { type: "course", title: "Network Security Essentials", action: "Started course", time: "1 day ago" },
  { type: "lab", title: "Linux Privilege Escalation", action: "Completed lab", time: "2 days ago" },
];

const enrolledCourses = [
  { title: "Web Application Security", progress: 45, lessons: 45, completed: 20 },
  { title: "Network Security Essentials", progress: 12, lessons: 52, completed: 6 },
  { title: "Advanced Penetration Testing", progress: 0, lessons: 68, completed: 0 },
];

export default function Dashboard() {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-border bg-card lg:block">
        <div className="sticky top-0 flex h-screen flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-border px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">LearnHub</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3 rounded-lg bg-accent/50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                JD
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Pro Member</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-6">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <Link href="/">
              <Button variant="outline" size="sm">
                Back to Home
              </Button>
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <BookOpen className="h-5 w-5 text-primary" />
                <Badge variant="cyber">+2 this week</Badge>
              </div>
              <p className="mt-4 text-3xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Courses Enrolled</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <Terminal className="h-5 w-5 text-success" />
                <Badge variant="success">+5 this week</Badge>
              </div>
              <p className="mt-4 text-3xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Labs Completed</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <Flame className="h-5 w-5 text-warning" />
                <Badge variant="warning">Active</Badge>
              </div>
              <p className="mt-4 text-3xl font-bold">7 days</p>
              <p className="text-sm text-muted-foreground">Learning Streak</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <Trophy className="h-5 w-5 text-secondary" />
              </div>
              <p className="mt-4 text-3xl font-bold">2,450</p>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Enrolled Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Your Courses</h2>
                <Link href="/courses" className="text-sm text-primary hover:underline">
                  Browse more
                </Link>
              </div>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.title}
                    className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-medium">{course.title}</h3>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{course.completed}/{course.lessons} lessons</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
              <div className="rounded-xl border border-border bg-card">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-4 ${
                      index !== recentActivity.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className={`mt-1 flex h-8 w-8 items-center justify-center rounded-lg ${
                      activity.type === "course" ? "bg-primary/10" : "bg-success/10"
                    }`}>
                      {activity.type === "course" ? (
                        <BookOpen className="h-4 w-4 text-primary" />
                      ) : (
                        <Terminal className="h-4 w-4 text-success" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recommended */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recommended for You</h2>
              <Link href="/labs" className="text-sm text-primary hover:underline">
                View all labs
              </Link>
            </div>
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="cyber" className="mb-2">Recommended Lab</Badge>
                  <h3 className="mb-1 text-xl font-semibold">Cross-Site Scripting (XSS)</h3>
                  <p className="text-sm text-muted-foreground">
                    Based on your progress in Web Application Security, try this lab next.
                  </p>
                </div>
                <Link href="/labs/xss-exploitation">
                  <Button variant="hero" className="gap-2">
                    Start Lab
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
