"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Terminal,
  Clock,
  Flag,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Play,
  Target,
  Lightbulb,
  FileText,
} from "lucide-react";

// Static lab data - expanded
const labsData: Record<string, {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  points: number;
  category: string;
  objectives: string[];
  prerequisites: string[];
  tools: string[];
  hints: string[];
  steps: string[];
}> = {
  "sql-injection-basics": {
    id: "sql-injection-basics",
    title: "SQL Injection Basics",
    description: "Practice exploiting SQL injection vulnerabilities in a controlled environment.",
    fullDescription: "In this hands-on lab, you'll learn to identify and exploit SQL injection vulnerabilities in web applications. You'll practice various injection techniques, from basic authentication bypasses to data extraction, all in a safe, sandboxed environment. By the end, you'll understand both how these attacks work and how to prevent them.",
    difficulty: "beginner",
    duration: "30 min",
    points: 100,
    category: "Web",
    objectives: [
      "Understand what SQL injection is and why it's dangerous",
      "Identify SQL injection vulnerabilities in web forms",
      "Perform authentication bypass using SQL injection",
      "Extract data from databases using UNION-based injection",
      "Learn remediation techniques to prevent SQL injection",
    ],
    prerequisites: [
      "Basic understanding of SQL queries",
      "Familiarity with web forms and HTTP requests",
      "No prior hacking experience required",
    ],
    tools: ["Web Browser", "Developer Tools", "Optional: Burp Suite"],
    hints: [
      "Start by testing single quotes in input fields",
      "Pay attention to error messages - they reveal database information",
      "Remember that comments (--) can neutralize the rest of a query",
      "UNION SELECT requires matching the number of columns",
    ],
    steps: [
      "Launch the lab environment and access the vulnerable application",
      "Explore the login form and identify the input fields",
      "Test for SQL injection by inserting special characters",
      "Bypass the login authentication using a simple payload",
      "Use UNION-based injection to extract database contents",
      "Document your findings and complete the challenge",
    ],
  },
  "buffer-overflow-linux": {
    id: "buffer-overflow-linux",
    title: "Linux Buffer Overflow",
    description: "Exploit a classic buffer overflow vulnerability in a Linux binary.",
    fullDescription: "This advanced lab challenges you to exploit a classic stack-based buffer overflow in a Linux binary. You'll learn about memory layout, stack operations, and how attackers can hijack program execution. Understanding buffer overflows is essential for both offensive security and secure development.",
    difficulty: "advanced",
    duration: "2 hours",
    points: 500,
    category: "Binary",
    objectives: [
      "Understand the stack memory layout",
      "Identify buffer overflow vulnerabilities",
      "Create a working exploit payload",
      "Gain shell access through exploitation",
      "Learn about modern protections (ASLR, DEP, Stack Canaries)",
    ],
    prerequisites: [
      "Understanding of C programming",
      "Basic Linux command line skills",
      "Familiarity with assembly language concepts",
      "GDB debugging experience helpful",
    ],
    tools: ["GDB", "Python/pwntools", "objdump", "Ghidra (optional)"],
    hints: [
      "Start by finding the exact offset to overwrite EIP/RIP",
      "Check what protections are enabled with checksec",
      "Consider using a pattern generator for offset calculation",
      "The NOP sled technique can help with reliability",
    ],
    steps: [
      "Analyze the vulnerable binary with objdump and GDB",
      "Identify the vulnerable function and buffer size",
      "Calculate the exact offset to overwrite the return address",
      "Craft your shellcode or use a pre-built payload",
      "Develop the exploit script with proper padding",
      "Execute the exploit and gain shell access",
    ],
  },
  "privilege-escalation": {
    id: "privilege-escalation",
    title: "Linux Privilege Escalation",
    description: "Find misconfigurations and escalate privileges on a Linux system.",
    fullDescription: "In this practical lab, you'll start with a low-privilege shell on a Linux system and work your way to root. You'll learn to enumerate the system for misconfigurations, find exploitable SUID binaries, discover cron job vulnerabilities, and more. These techniques are essential for both penetration testers and system administrators.",
    difficulty: "intermediate",
    duration: "1 hour",
    points: 250,
    category: "System",
    objectives: [
      "Enumerate a Linux system for privilege escalation vectors",
      "Identify and exploit SUID binary misconfigurations",
      "Find and exploit vulnerable cron jobs",
      "Understand kernel exploit basics",
      "Practice post-exploitation techniques",
    ],
    prerequisites: [
      "Basic Linux command line proficiency",
      "Understanding of Linux permissions",
      "Familiarity with common Linux utilities",
    ],
    tools: ["LinPEAS", "Linux Exploit Suggester", "GTFOBins reference"],
    hints: [
      "Always start with thorough enumeration",
      "Check for SUID/GUID binaries with find command",
      "Examine cron jobs and their file permissions",
      "Look for world-writable files in sensitive locations",
    ],
    steps: [
      "Connect to the target system with provided credentials",
      "Run enumeration scripts to identify attack vectors",
      "Investigate SUID binaries and their capabilities",
      "Check for misconfigured cron jobs",
      "Exploit the vulnerability to escalate privileges",
      "Capture the root flag and document your path",
    ],
  },
  // Default fallback for other labs
};

const defaultLab = {
  id: "default",
  title: "Lab Coming Soon",
  description: "This lab is currently being developed.",
  fullDescription: "We're working hard to bring you this hands-on lab experience. Check back soon or explore our other available labs in the meantime.",
  difficulty: "intermediate" as const,
  duration: "TBD",
  points: 0,
  category: "Coming Soon",
  objectives: [
    "Stay tuned for updates",
    "Join our community to get notified",
    "Try other available labs while you wait",
  ],
  prerequisites: ["Check back soon!"],
  tools: ["Coming soon"],
  hints: ["This lab is under development"],
  steps: ["Lab content coming soon!"],
};

export default function LabDetail() {
  const params = useParams();
  const labId = typeof params?.labId === 'string' ? params.labId : '';
  const lab = labsData[labId || ""] || { ...defaultLab, id: labId, title: labId?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || "Unknown Lab" };

  const difficultyColors = {
    beginner: "bg-success/10 text-success",
    intermediate: "bg-warning/10 text-warning",
    advanced: "bg-destructive/10 text-destructive",
  };

  return (
    <MainLayout>
      {/* Header */}
      <section className="border-b border-border py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <Link
            href="/labs"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Labs
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
          >
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge className={difficultyColors[lab.difficulty]}>
                  {lab.difficulty}
                </Badge>
                <Badge variant="outline">{lab.category}</Badge>
              </div>
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                {lab.title}
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                {lab.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button size="lg" className="gap-2">
                <Play className="h-5 w-5" />
                Start Lab
              </Button>
              <Button variant="outline" size="lg">
                <BookOpen className="mr-2 h-5 w-5" />
                Read Walkthrough
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-8">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{lab.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-primary" />
              <span>{lab.points} points</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-muted-foreground" />
              <span>{lab.tools.length} tools</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <FileText className="h-5 w-5 text-primary" />
                  About This Lab
                </h2>
                <p className="text-muted-foreground">{lab.fullDescription}</p>
              </motion.div>

              {/* Objectives */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <Target className="h-5 w-5 text-primary" />
                  Learning Objectives
                </h2>
                <ul className="space-y-3">
                  {lab.objectives.map((objective, index) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 mt-0.5 shrink-0 text-success" />
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Lab Steps
                </h2>
                <ol className="space-y-4">
                  {lab.steps.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <p className="mt-1 text-muted-foreground">{step}</p>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Prerequisites */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="mb-4 flex items-center gap-2 font-bold">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Prerequisites
                </h3>
                <ul className="space-y-2">
                  {lab.prerequisites.map((prereq, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {prereq}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tools */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="mb-4 flex items-center gap-2 font-bold">
                  <Terminal className="h-5 w-5 text-primary" />
                  Tools Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lab.tools.map((tool, index) => (
                    <Badge key={index} variant="outline">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Hints */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="mb-4 flex items-center gap-2 font-bold">
                  <Lightbulb className="h-5 w-5 text-warning" />
                  Hints (Spoiler!)
                </h3>
                <details className="text-sm">
                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                    Click to reveal hints
                  </summary>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    {lab.hints.map((hint, index) => (
                      <li key={index}>💡 {hint}</li>
                    ))}
                  </ul>
                </details>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
