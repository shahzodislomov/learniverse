"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/course/CourseCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search, Filter, Code2, Terminal, Shield, Network, Database, Lock, Loader2 } from "lucide-react";
import { useState } from "react";
import { useCourses } from "@/hooks/useConvex";
import Link from "next/link";

const categories = [
  { id: "all", label: "All Courses", icon: null },
  { id: "web", label: "Web Security", icon: Code2 },
  { id: "pentesting", label: "Pentesting", icon: Terminal },
  { id: "defense", label: "Blue Team", icon: Shield },
  { id: "network", label: "Network", icon: Network },
  { id: "forensics", label: "Forensics", icon: Database },
  { id: "crypto", label: "Cryptography", icon: Lock },
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

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

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");
  
  const courses = useCourses();

  const filteredCourses = courses?.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "All Levels" || 
      course.level === selectedLevel.toLowerCase();
    const matchesCategory = selectedCategory === "all" || 
      course.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesLevel && matchesCategory;
  }) || [];

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
              Explore Courses
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Learn from industry experts with comprehensive courses covering all aspects of cybersecurity.
            </p>
            
            {/* Search */}
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 w-full rounded-xl border border-border bg-card pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Filters */}
        <div className="mb-8 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="gap-2"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {category.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Levels */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">Difficulty Level</h3>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {courses === undefined ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading courses...
              </span>
            ) : (
              `Showing ${filteredCourses.length} of ${courses.length} courses`
            )}
          </p>
        </div>

        {/* Course Grid */}
        {courses === undefined ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
            <p className="text-lg text-muted-foreground">No courses found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedLevel("All Levels");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCourses.map((course) => (
              <motion.div key={course._id} variants={itemVariants}>
                <CourseCard {...course} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}