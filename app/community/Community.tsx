"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Users, 
  Github, 
  Twitter, 
  Linkedin, 
  ArrowRight,
  Trophy,
  Flame,
  Star
} from "lucide-react";
import Link from "next/link";

const communityLinks = [
  {
    title: "Discord Server",
    description: "Join our active community of security professionals and learners.",
    icon: MessageSquare,
    members: "15,000+",
    url: "#",
    color: "text-secondary",
  },
  {
    title: "GitHub Organization",
    description: "Contribute to open-source security tools and resources.",
    icon: Github,
    members: "2,500+",
    url: "#",
    color: "text-foreground",
  },
  {
    title: "Twitter Community",
    description: "Follow us for the latest security news and updates.",
    icon: Twitter,
    members: "25,000+",
    url: "#",
    color: "text-primary",
  },
  {
    title: "LinkedIn Group",
    description: "Network with security professionals worldwide.",
    icon: Linkedin,
    members: "8,000+",
    url: "#",
    color: "text-secondary",
  },
];

const topContributors = [
  { name: "Alex Security", points: 12500, rank: 1, avatar: "AS" },
  { name: "CyberNinja42", points: 11200, rank: 2, avatar: "CN" },
  { name: "HackMaster", points: 10800, rank: 3, avatar: "HM" },
  { name: "SecPro", points: 9500, rank: 4, avatar: "SP" },
  { name: "ByteHunter", points: 8900, rank: 5, avatar: "BH" },
];

const recentDiscussions = [
  {
    title: "Best resources for learning binary exploitation?",
    author: "newbie_hacker",
    replies: 24,
    category: "Learning",
  },
  {
    title: "CTF Team looking for members",
    author: "ctf_captain",
    replies: 18,
    category: "Teams",
  },
  {
    title: "Walkthrough: HTB Machine Cascade",
    author: "pwned_it",
    replies: 45,
    category: "Writeups",
  },
  {
    title: "Career advice: Red team vs Blue team?",
    author: "career_switch",
    replies: 32,
    category: "Career",
  },
  {
    title: "New OWASP Top 10 2024 Discussion",
    author: "web_sec_pro",
    replies: 67,
    category: "News",
  },
];

export default function CommunityPage() {
  return (
    <MainLayout>
      {/* Header */}
      <section className="border-b border-border py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Community
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Connect with fellow security enthusiasts, share knowledge, and grow together.
            </p>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <p className="text-sm text-muted-foreground">Members</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold">1M+</div>
                <p className="text-sm text-muted-foreground">Messages</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold">100+</div>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Links */}
      <section className="border-b border-border py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold">Join Our Platforms</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {communityLinks.map((link, index) => (
              <motion.a
                key={link.title}
                href={link.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
              >
                <link.icon className={`mb-4 h-8 w-8 ${link.color}`} />
                <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                  {link.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {link.description}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{link.members} members</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard & Discussions */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Top Contributors</h2>
                <Trophy className="h-5 w-5 text-warning" />
              </div>
              <div className="space-y-4">
                {topContributors.map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center gap-4 rounded-lg border border-border bg-accent/50 p-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {user.rank}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Flame className="h-4 w-4 text-warning" />
                      <span className="font-medium">{user.points.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-6 w-full">
                View Full Leaderboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* Recent Discussions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Recent Discussions</h2>
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-4">
                {recentDiscussions.map((discussion, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer rounded-lg border border-border p-4 transition-all duration-300 hover:border-primary/40"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="font-medium group-hover:text-primary">
                        {discussion.title}
                      </h3>
                      <Badge variant="outline">{discussion.category}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>by {discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.replies} replies</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-6 w-full">
                View All Discussions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <Star className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="mb-4 text-3xl font-bold">Ready to Join?</h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            Become part of the largest cybersecurity learning community. Connect, learn, and grow with us.
          </p>
          <Link href="/auth/register">
            <Button variant="hero" size="lg">
              Create Free Account
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
