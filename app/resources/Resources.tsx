"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Download, 
  FileText, 
  Terminal, 
  BookOpen,
  Link2,
  ExternalLink,
  Search,
  Code2,
  Shield,
  Database
} from "lucide-react";
import { useState } from "react";

const resourceCategories = ["All", "Cheatsheets", "Tools", "Guides", "References"];

const resources = [
  {
    title: "SQL Injection Cheatsheet",
    description: "Comprehensive reference for SQL injection payloads and bypass techniques.",
    category: "Cheatsheets",
    icon: Database,
    downloadUrl: "#",
    type: "PDF",
  },
  {
    title: "XSS Payload Collection",
    description: "Curated list of XSS payloads for different contexts and filter bypasses.",
    category: "Cheatsheets",
    icon: Code2,
    downloadUrl: "#",
    type: "PDF",
  },
  {
    title: "Linux Privilege Escalation Guide",
    description: "Step-by-step guide for privilege escalation on Linux systems.",
    category: "Guides",
    icon: Terminal,
    downloadUrl: "#",
    type: "PDF",
  },
  {
    title: "Burp Suite Extensions",
    description: "Essential Burp Suite extensions for web application testing.",
    category: "Tools",
    icon: Shield,
    externalUrl: "#",
    type: "Link",
  },
  {
    title: "OWASP Testing Guide",
    description: "Comprehensive web application security testing methodology.",
    category: "References",
    icon: BookOpen,
    externalUrl: "#",
    type: "Link",
  },
  {
    title: "Reverse Shell Cheatsheet",
    description: "Quick reference for reverse shell commands in various languages.",
    category: "Cheatsheets",
    icon: Terminal,
    downloadUrl: "#",
    type: "PDF",
  },
  {
    title: "Nmap Command Reference",
    description: "Complete reference for Nmap scanning options and NSE scripts.",
    category: "Cheatsheets",
    icon: Terminal,
    downloadUrl: "#",
    type: "PDF",
  },
  {
    title: "Metasploit Framework Guide",
    description: "Getting started with Metasploit for penetration testing.",
    category: "Guides",
    icon: Shield,
    downloadUrl: "#",
    type: "PDF",
  },
  {
    title: "Web Security Tools Collection",
    description: "Curated list of essential tools for web security testing.",
    category: "Tools",
    icon: Code2,
    externalUrl: "#",
    type: "Link",
  },
  {
    title: "CTF Resources & Writeups",
    description: "Collection of CTF challenges, tools, and writeups for practice.",
    category: "References",
    icon: BookOpen,
    externalUrl: "#",
    type: "Link",
  },
  {
    title: "Windows Privilege Escalation",
    description: "Techniques for privilege escalation on Windows systems.",
    category: "Guides",
    icon: Terminal,
    downloadUrl: "#",
    type: "PDF",
  },
  {
    title: "API Security Testing Guide",
    description: "Methodology for testing API security vulnerabilities.",
    category: "Guides",
    icon: Code2,
    downloadUrl: "#",
    type: "PDF",
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

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              Resources
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Cheatsheets, tools, and guides to accelerate your security learning journey.
            </p>
            
            {/* Search */}
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 w-full rounded-xl border border-border bg-card pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {resourceCategories.map((cat) => (
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
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredResources.length} resources
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                variants={itemVariants}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <resource.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline">{resource.category}</Badge>
                </div>
                <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                  {resource.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {resource.description}
                </p>
                {resource.downloadUrl ? (
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download {resource.type}
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Resource
                  </Button>
                )}
              </motion.div>
            ))}
          </motion.div>

          {filteredResources.length === 0 && (
            <div className="py-16 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                No resources found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contribute CTA */}
      <section className="border-t border-border py-16">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">Have a Resource to Share?</h2>
          <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
            Contribute to our growing collection of security resources and help the community learn.
          </p>
          <Button variant="heroOutline" size="lg">
            Submit a Resource
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
