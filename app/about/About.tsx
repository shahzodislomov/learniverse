"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Target, Award, Github, Linkedin } from "lucide-react";
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

function TelegramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M120 0C53.729 0 0 53.729 0 120s53.729 120 120 120 120-53.729 120-120S186.271 0 120 0z" fill="#0088cc" />
      <path d="M50 123l142-51c4-1 7 2 5 6l-56 152c-2 5-7 6-11 3l-39-28-19 19c-2 2-4 3-7 3l3-46 84-61c4-3 1-7-4-5L50 123z" fill="#fff" />
    </svg>
  );
}
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFeaturedCourses, useFeaturedNews } from "@/hooks/useConvex";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "We believe everyone deserves access to quality cybersecurity education. Our mission is to make the digital world safer.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Learning is better together. Our community of 50,000+ security professionals supports and mentors each other.",
  },
  {
    icon: Target,
    title: "Practical Learning",
    description: "Theory is important, but practice makes perfect. Our hands-on labs simulate real-world scenarios.",
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Our courses align with industry certifications and are recognized by leading cybersecurity employers.",
  },
];

const team = [
  {
    name: "shahzod islomov",
    role: "Founder & Lead Developer",
    bio: "Passionate about cybersecurity education and making complex topics accessible to everyone. Building LearnHub to democratize security knowledge.",
    avatar: "SI",
    social: {
      github: "https://github.com/shahzodislomov/",
      linkedin: "https://www.linkedin.com/in/shahzodislomov/",
      telegram: "https://t.me/shawn.isl",
    },
  },
  {
    name: "Abdulloh Qurbonov",
    role: "Contributor",
    bio: "Contributing to make cybersecurity education more accessible and helping build a better learning platform for everyone.",
    avatar: "AQ",
    social: {
      github: "https://github.com/abdullohqurbon0v",
      linkedin: "https://www.linkedin.com/in/abdulloh-qurbonov-030bb7357/",
      telegram: "https://t.me/Secure_byt3",
    },
  },
];

export default function About() {
  const platformStats = useQuery(api.stats.getPlatformStats);
  const stats = [
    { icon: BookOpen, value: platformStats ? `${platformStats.courses}+` : "...", label: "Courses" },
    { icon: Terminal, value: platformStats ? `${platformStats.labs}+` : "...", label: "Challenges" },
    { icon: Users, value: platformStats ? `${platformStats.learners}+` : "...", label: "Learners" },
    { icon: Trophy, value: platformStats ? `${platformStats.certificates}+` : "...", label: "Certificates" },
  ];
  return (
    <MainLayout>
      {/* Hero */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Empowering the next generation of{" "}
              <span className="text-primary">security professionals</span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              LearnHub was founded with a simple mission: make cybersecurity
              education accessible, practical, and engaging for everyone.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  LearnHub started in 2025 when our founder, wenaco, noticed a
                  critical gap in cybersecurity education. Most resources were
                  either too theoretical or too expensive for aspiring security
                  professionals.
                </p>
                <p>
                  We set out to build a platform that combines expert-led video
                  courses with hands-on labs where learners can practice in safe,
                  realistic environments. No more reading about attacks - now you
                  can perform them safely and learn the defender's perspective
                  too.
                </p>
                <p>
                  Today, we're proud to serve over 50,000 learners worldwide,
                  from complete beginners to seasoned professionals looking to
                  expand their skills. Our community is what makes LearnHub
                  special - knowledge shared is knowledge multiplied.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <h3 className="mb-4 text-xl font-semibold">What We Believe</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">
                    Security knowledge should be accessible to everyone, not just
                    those who can afford expensive bootcamps.
                  </span>
                </li>
                <li className="flex gap-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">
                    Practical skills trump theoretical knowledge - you learn
                    security by doing, not just reading.
                  </span>
                </li>
                <li className="flex gap-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">
                    The best learning happens in communities where everyone
                    teaches and learns from each other.
                  </span>
                </li>
                <li className="flex gap-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">
                    Ethical hacking and security research make the internet safer
                    for everyone.
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-muted/30 py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold">Our Values</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Everything we do is guided by these core principles.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold">Meet the Team</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              The person behind LearnHub who are passionate about cybersecurity
              education.
            </p>
          </motion.div>
          <div className="flex flex-row justify-center gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  {member.avatar}
                </div>
                <h3 className="mb-1 text-lg font-semibold">{member.name}</h3>
                <p className="mb-3 text-sm text-primary">{member.role}</p>
                <p className="mb-4 text-sm text-muted-foreground">
                  {member.bio}
                </p>
                <div className="flex justify-center gap-3">
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.telegram && (
                    <a href={member.social.telegram} className="text-muted-foreground hover:text-foreground">
                      <TelegramIcon className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to start learning?</h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            Join thousands of security professionals who are advancing their
            careers with LearnHub.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
