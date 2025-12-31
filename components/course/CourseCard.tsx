"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";

interface CourseCardProps {
  slug: string;
  title: string;
  description: string;
  image: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessons: number;
  students: number;
  category: string;
}

export function CourseCard({
  slug,
  title,
  description,
  image,
  level,
  duration,
  lessons,
  students,
  category,
}: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/courses/${slug}`}
        className="group block overflow-hidden rounded-xl border border-border bg-card card-hover"
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <Badge variant="cyber" className="absolute left-3 top-3">
            {category}
          </Badge>
        </div>
        <div className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant={level}>{level}</Badge>
          </div>
          <h3 className="mb-2 text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {lessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {students.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
