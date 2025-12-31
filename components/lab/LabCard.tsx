"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Terminal, Clock, Flag } from "lucide-react";
import { motion } from "framer-motion";

interface LabCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  points: number;
  category: string;
  status?: "not-started" | "in-progress" | "completed";
}

export function LabCard({
  id,
  title,
  description,
  difficulty,
  duration,
  points,
  category,
  status = "not-started",
}: LabCardProps) {
  const statusStyles = {
    "not-started": "border-border",
    "in-progress": "border-warning/50",
    completed: "border-success/50",
  };

  const statusLabels = {
    "not-started": null,
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/labs/${id}`}
        className={`group block rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-lg ${statusStyles[status]}`}
        style={{
          boxShadow: status === "in-progress" 
            ? "0 0 20px hsl(38 92% 50% / 0.1)" 
            : status === "completed"
            ? "0 0 20px hsl(160 84% 39% / 0.1)"
            : undefined
        }}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Terminal className="h-6 w-6 text-primary" />
          </div>
          {statusLabels[status] && (
            <Badge variant={status === "completed" ? "success" : "warning"}>
              {statusLabels[status]}
            </Badge>
          )}
        </div>
        <div className="mb-3 flex items-center gap-2">
          <Badge variant={difficulty}>{difficulty}</Badge>
          <Badge variant="outline">{category}</Badge>
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
            <Flag className="h-3.5 w-3.5 text-primary" />
            {points} pts
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
