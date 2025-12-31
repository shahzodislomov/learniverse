"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BookOpen, Terminal, FileText, Newspaper, ArrowRight } from "lucide-react";
import { staticCourses, staticLessons, staticNews, staticLabs } from "@/lib/mockData";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "course" | "lesson" | "lab" | "news";
  url: string;
  icon: React.ElementType;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  const searchContent = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search courses
    staticCourses.forEach((course) => {
      if (
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q)
      ) {
        searchResults.push({
          id: course._id,
          title: course.title,
          description: course.description,
          type: "course",
          url: `/courses/${course.slug}`,
          icon: BookOpen,
        });
      }
    });

    // Search lessons
    staticLessons.forEach((lesson) => {
      if (
        lesson.title.toLowerCase().includes(q) ||
        lesson.description.toLowerCase().includes(q)
      ) {
        const course = staticCourses.find((c) => c._id === lesson.courseId);
        searchResults.push({
          id: lesson._id,
          title: lesson.title,
          description: `${course?.title || "Course"} - ${lesson.moduleTitle}`,
          type: "lesson",
          url: `/courses/${course?.slug}/lesson/${lesson._id}`,
          icon: BookOpen,
        });
      }
    });

    // Search labs
    staticLabs.forEach((lab) => {
      if (
        lab.title.toLowerCase().includes(q) ||
        lab.description.toLowerCase().includes(q) ||
        lab.category.toLowerCase().includes(q)
      ) {
        searchResults.push({
          id: lab.id,
          title: lab.title,
          description: lab.description,
          type: "lab",
          url: `/labs/${lab.id}`,
          icon: Terminal,
        });
      }
    });

    // Search news
    staticNews.forEach((article) => {
      if (
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q)
      ) {
        searchResults.push({
          id: article._id,
          title: article.title,
          description: article.excerpt,
          type: "news",
          url: `/news/${article.slug}`,
          icon: Newspaper,
        });
      }
    });

    setResults(searchResults.slice(0, 10));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchContent(query);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, searchContent]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          // Parent should handle opening
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleResultClick = (url: string) => {
    router.push(url);
    onClose();
    setQuery("");
  };

  const typeColors = {
    course: "text-primary",
    lesson: "text-secondary",
    lab: "text-warning",
    news: "text-success",
  };

  const typeLabels = {
    course: "Course",
    lesson: "Lesson",
    lab: "Lab",
    news: "News",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-2xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
              {/* Search Input */}
              <div className="flex items-center border-b border-border px-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses, labs, news..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-14 flex-1 bg-transparent px-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {query && results.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    <Search className="mx-auto mb-4 h-10 w-10 opacity-50" />
                    <p>No results found for "{query}"</p>
                    <p className="mt-2 text-sm">
                      Try searching for courses, labs, or news articles
                    </p>
                  </div>
                )}

                {!query && (
                  <div className="p-8 text-center text-muted-foreground">
                    <p className="text-sm">Start typing to search...</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      <span className="rounded-lg bg-muted px-3 py-1 text-xs">
                        SQL Injection
                      </span>
                      <span className="rounded-lg bg-muted px-3 py-1 text-xs">
                        Penetration Testing
                      </span>
                      <span className="rounded-lg bg-muted px-3 py-1 text-xs">
                        Web Security
                      </span>
                    </div>
                  </div>
                )}

                {results.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result.url)}
                    className="flex w-full items-start gap-4 rounded-lg p-3 text-left transition-colors hover:bg-muted"
                  >
                    <div className={`mt-1 ${typeColors[result.type]}`}>
                      <result.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{result.title}</span>
                        <span
                          className={`text-xs ${typeColors[result.type]}`}
                        >
                          {typeLabels[result.type]}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                        {result.description}
                      </p>
                    </div>
                    <ArrowRight className="mt-2 h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-border px-4 py-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex gap-4">
                    <span>
                      <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">
                        ↵
                      </kbd>{" "}
                      to select
                    </span>
                    <span>
                      <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">
                        esc
                      </kbd>{" "}
                      to close
                    </span>
                  </div>
                  <span>
                    <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">
                      ⌘K
                    </kbd>{" "}
                    to toggle
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
