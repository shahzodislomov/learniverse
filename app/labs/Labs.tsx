"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { LabCard } from "@/components/lab/LabCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search, Filter, Terminal, Trophy, Target, Clock } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Web", "Network", "Binary", "Crypto", "Forensics", "System"];
const difficulties = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const statuses = ["All", "Not Started", "In Progress", "Completed"];

const allLabs = [
  {
    id: "sql-injection-basics",
    title: "SQL Injection Basics",
    description: "Practice exploiting SQL injection vulnerabilities in a controlled environment.",
    difficulty: "beginner" as const,
    duration: "30 min",
    points: 100,
    category: "Web",
    status: "not-started" as const,
  },
  {
    id: "buffer-overflow-linux",
    title: "Linux Buffer Overflow",
    description: "Exploit a classic buffer overflow vulnerability in a Linux binary.",
    difficulty: "advanced" as const,
    duration: "2 hours",
    points: 500,
    category: "Binary",
    status: "in-progress" as const,
  },
  {
    id: "privilege-escalation",
    title: "Linux Privilege Escalation",
    description: "Find misconfigurations and escalate privileges on a Linux system.",
    difficulty: "intermediate" as const,
    duration: "1 hour",
    points: 250,
    category: "System",
    status: "completed" as const,
  },
  {
    id: "web-cache-poisoning",
    title: "Web Cache Poisoning",
    description: "Learn to exploit web cache poisoning vulnerabilities.",
    difficulty: "advanced" as const,
    duration: "45 min",
    points: 400,
    category: "Web",
    status: "not-started" as const,
  },
  {
    id: "xss-exploitation",
    title: "Cross-Site Scripting (XSS)",
    description: "Master different types of XSS attacks and bypass techniques.",
    difficulty: "beginner" as const,
    duration: "45 min",
    points: 150,
    category: "Web",
    status: "not-started" as const,
  },
  {
    id: "network-sniffing",
    title: "Network Traffic Analysis",
    description: "Analyze network packets to find hidden credentials and data.",
    difficulty: "intermediate" as const,
    duration: "1 hour",
    points: 200,
    category: "Network",
    status: "not-started" as const,
  },
  {
    id: "rsa-challenge",
    title: "RSA Cryptanalysis",
    description: "Break weak RSA implementations using mathematical attacks.",
    difficulty: "advanced" as const,
    duration: "2 hours",
    points: 450,
    category: "Crypto",
    status: "not-started" as const,
  },
  {
    id: "memory-forensics",
    title: "Memory Forensics",
    description: "Extract artifacts from memory dumps to investigate incidents.",
    difficulty: "intermediate" as const,
    duration: "1.5 hours",
    points: 300,
    category: "Forensics",
    status: "completed" as const,
  },
  {
    id: "ssrf-exploitation",
    title: "SSRF Exploitation",
    description: "Exploit Server-Side Request Forgery to access internal resources.",
    difficulty: "intermediate" as const,
    duration: "1 hour",
    points: 250,
    category: "Web",
    status: "not-started" as const,
  },
  {
    id: "windows-privesc",
    title: "Windows Privilege Escalation",
    description: "Identify and exploit Windows misconfigurations for privilege escalation.",
    difficulty: "intermediate" as const,
    duration: "1.5 hours",
    points: 300,
    category: "System",
    status: "in-progress" as const,
  },
  {
    id: "jwt-attacks",
    title: "JWT Token Attacks",
    description: "Exploit common JWT implementation flaws and bypass authentication.",
    difficulty: "intermediate" as const,
    duration: "45 min",
    points: 200,
    category: "Web",
    status: "not-started" as const,
  },
  {
    id: "reverse-engineering",
    title: "Binary Reverse Engineering",
    description: "Reverse engineer a compiled binary to find the hidden flag.",
    difficulty: "advanced" as const,
    duration: "3 hours",
    points: 600,
    category: "Binary",
    status: "not-started" as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LabsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLabs = allLabs.filter((lab) => {
    const matchesSearch = lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || lab.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All Levels" || 
      lab.difficulty === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const totalPoints = allLabs.reduce((sum, lab) => sum + lab.points, 0);
  const completedPoints = allLabs
    .filter((lab) => lab.status === "completed")
    .reduce((sum, lab) => sum + lab.points, 0);

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
              Hands-on Labs
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Practice your skills with real-world security challenges in a safe environment.
            </p>

            {/* Stats */}
            <div className="mx-auto mb-8 flex max-w-md items-center justify-center gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{allLabs.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Total Labs</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="h-5 w-5 text-warning" />
                  <span className="text-2xl font-bold">{completedPoints}/{totalPoints}</span>
                </div>
                <p className="text-sm text-muted-foreground">Points Earned</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Target className="h-5 w-5 text-success" />
                  <span className="text-2xl font-bold">
                    {allLabs.filter((l) => l.status === "completed").length}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
            
            {/* Search */}
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search labs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 w-full rounded-xl border border-border bg-card pl-12 pr-4 font-mono text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Category:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="h-6 w-px bg-border" />

            <div className="flex flex-wrap gap-2">
              {difficulties.map((diff) => (
                <Badge
                  key={diff}
                  variant={selectedDifficulty === diff ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedDifficulty(diff)}
                >
                  {diff}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Labs Grid */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredLabs.length} labs
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredLabs.map((lab) => (
              <motion.div key={lab.id} variants={itemVariants}>
                <LabCard {...lab} />
              </motion.div>
            ))}
          </motion.div>

          {filteredLabs.length === 0 && (
            <div className="py-16 text-center">
              <Terminal className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                No labs found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
