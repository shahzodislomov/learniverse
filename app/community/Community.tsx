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
  Star,
  Loader2,
  Shield
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

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

export default function CommunityPage() {
  const scoreboard = useQuery(api.ctfChallenges.getScoreboard, { limit: 10 });
  const allUsers = useQuery(api.userProfiles.getAllUsers);

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
              {scoreboard === undefined ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : scoreboard.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No users have solved challenges yet</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {scoreboard.slice(0, 5).map((user) => (
                      <div
                        key={user.rank}
                        className="flex items-center gap-4 rounded-lg border border-border bg-accent/50 p-4"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {user.rank}
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
                          {user.email.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{user.nickname}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.solvedChallenges} challenges · {user.firstBloods} first bloods
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Flame className="h-4 w-4 text-warning" />
                          <span className="font-medium">{user.totalPoints.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/ctf/scoreboard">
                    <Button variant="outline" className="mt-6 w-full">
                      View Full Leaderboard
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Active Users */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Active Users</h2>
                <Users className="h-5 w-5 text-primary" />
              </div>
              {allUsers === undefined ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : allUsers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No registered users yet</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {allUsers.slice(0, 8).map((user) => (
                      <div
                        key={user.email}
                        className="flex items-center gap-3 rounded-lg border border-border bg-accent/30 p-3"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
                          {user.email.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">{user.name}</p>
                            {user.isAdmin && (
                              <Shield className="h-3 w-3 text-primary flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-center text-sm text-muted-foreground">
                    {allUsers.length} registered user{allUsers.length !== 1 ? 's' : ''}
                  </p>
                </>
              )}
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
