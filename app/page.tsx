"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/course/CourseCard";
import { NewsCard } from "@/components/news/NewsCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFeaturedCourses, useFeaturedNews } from "@/hooks/useConvex";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { 
  Search, 
  ArrowRight, 
  Code2, 
  Terminal, 
  Shield, 
  Zap,
  Trophy,
  Users,
  BookOpen,
  Loader2
} from "lucide-react";

const learningTracks = [
  {
    icon: Code2,
    title: "Web Security",
    description: "Master OWASP Top 10, XSS, SQL injection, and modern web vulnerabilities",
    color: "text-primary",
  },
  {
    icon: Terminal,
    title: "Penetration Testing",
    description: "Learn ethical hacking, network scanning, and exploitation techniques",
    color: "text-secondary",
  },
  {
    icon: Shield,
    title: "Blue Team Defense",
    description: "Build skills in threat detection, incident response, and forensics",
    color: "text-success",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Index = () => {
  const featuredCourses = useFeaturedCourses();
  const featuredNews = useFeaturedNews();
  const platformStats = useQuery(api.stats.getPlatformStats);

  const stats = [
    { icon: BookOpen, value: platformStats ? `${platformStats.courses}+` : "...", label: "Courses" },
    { icon: Terminal, value: platformStats ? `${platformStats.labs}+` : "...", label: "Challenges" },
    { icon: Users, value: platformStats ? `${platformStats.learners}+` : "...", label: "Learners" },
    { icon: Trophy, value: platformStats ? `${platformStats.certificates}+` : "...", label: "Certificates" },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(188_94%_43%/0.1),transparent_50%)]" />
        
        <div className="container relative mx-auto max-w-7xl px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge variant="cyber" className="mb-6">
              <Zap className="mr-1 h-3 w-3" />
              New: Advanced Red Team Operations Course
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Master{" "}
              <span className="text-gradient">Cybersecurity</span>
              <br />
              Through Practice
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Learn from industry experts with hands-on labs, real-world scenarios,
              and a community of passionate security professionals.
            </p>
            
            {/* Search Bar */}
            <div className="mx-auto mb-8 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses, labs, or topics..."
                  className="h-14 w-full rounded-xl border border-border bg-card pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/courses">
                <Button variant="hero" size="xl">
                  Start Learning
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/ctf">
                <Button variant="heroOutline" size="xl">
                  Try CTF Challenges
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                <div className="text-2xl font-bold md:text-3xl">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Learning Tracks */}
      <section className="border-b border-border py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Choose Your Path
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Whether you're starting your journey or advancing your career, we have a track for you.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-3"
          >
            {learningTracks.map((track) => (
              <motion.div
                key={track.title}
                variants={itemVariants}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
                style={{ boxShadow: "0 0 0 transparent" }}
                whileHover={{ boxShadow: "0 10px 40px hsl(188 94% 43% / 0.1)" }}
              >
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 ${track.color}`}>
                  <track.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{track.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{track.description}</p>
                <div className="flex items-center justify-end">
                  <Link href="/courses" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="border-b border-border py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
                Featured Courses
              </h2>
              <p className="text-muted-foreground">
                Start with our most popular courses
              </p>
            </div>
            <Link href="/courses">
              <Button variant="outline">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {featuredCourses === undefined ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : featuredCourses && featuredCourses.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {featuredCourses.map((course) => (
                <motion.div key={course._id} variants={itemVariants}>
                  <CourseCard
                    slug={course.slug}
                    title={course.title}
                    description={course.shortDescription || course.description}
                    image={course.image || ""}
                    level={course.level as "beginner" | "intermediate" | "advanced"}
                    duration={course.duration}
                    lessons={0}
                    students={course.studentCount || 0}
                    category={course.category}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No courses yet. Add some in the admin panel!</p>
              <Link href="/admin">
                <Button variant="outline" className="mt-4">Go to Admin</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTF Challenges */}
      <section className="border-b border-border py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
                CTF Challenges
              </h2>
              <p className="text-muted-foreground">
                Test your skills with Capture The Flag challenges
              </p>
            </div>
            <Link href="/ctf">
              <Button variant="outline">
                View All Challenges
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-lg text-muted-foreground mb-6">
              Capture the Flag challenges are now available!
            </p>
            <Link href="/ctf">
              <Button variant="hero" size="lg">
                Start Hacking
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest News */}
      <section className="border-b border-border py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
                Security News
              </h2>
              <p className="text-muted-foreground">
                Stay updated with the latest in cybersecurity
              </p>
            </div>
            <Link href="/news">
              <Button variant="outline">
                All Articles
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {featuredNews === undefined ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : featuredNews && featuredNews.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {featuredNews.map((news) => (
                <motion.div key={news._id} variants={itemVariants}>
                  <NewsCard
                    slug={news.slug}
                    title={news.title}
                    excerpt={news.excerpt}
                    image={news.image || ""}
                    category={news.category}
                    author={news.author}
                    readTime={news.readTime}
                    date={new Date(news.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No news articles yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-12 text-center md:p-16"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(188_94%_43%/0.1),transparent_70%)]" />
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Ready to Start Your Journey?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
                Join thousands of security professionals who are advancing their careers with LearnHub.
                Get access to all courses, labs, and resources.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/auth/register">
                  <Button variant="hero" size="xl">
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button variant="heroOutline" size="xl">
                    Browse Courses
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;