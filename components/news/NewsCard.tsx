"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { motion } from "framer-motion";

interface NewsCardProps {
  slug?: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
}

export function NewsCard({
  slug,
  title,
  excerpt,
  image,
  category,
  author,
  readTime,
  date,
}: NewsCardProps) {
  const CardContent = (
    <>
      <div className="relative aspect-[16/9] overflow-hidden">
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
        <p className="mb-2 text-xs text-muted-foreground">{date}</p>
        <h3 className="mb-2 text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{excerpt}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readTime}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      {slug ? (
        <Link href={`/news/${slug}`} className="group block overflow-hidden rounded-xl border border-border bg-card card-hover">
          {CardContent}
        </Link>
      ) : (
        <div className="group block overflow-hidden rounded-xl border border-border bg-card card-hover">
          {CardContent}
        </div>
      )}
    </motion.div>
  );
}