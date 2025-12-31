"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/news/NewsCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNews } from "@/hooks/useConvex";
import Link from "next/link";

const categories = ["All", "Vulnerability", "Analysis", "Technology", "Industry", "Research"];

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

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const news = useNews();

  const filteredNews = news?.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const featuredNews = filteredNews[0];
  const restNews = filteredNews.slice(1);

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
              Security News
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Stay informed with the latest cybersecurity news, analysis, and research.
            </p>
            
            {/* Search */}
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
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
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {news === undefined ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : news.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-lg text-muted-foreground">No news articles yet.</p>
          <Link href="/admin/news">
            <Button variant="outline" className="mt-4">Add Articles in Admin</Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Featured Article */}
          {featuredNews && (
            <section className="border-b border-border py-12">
              <div className="container mx-auto max-w-7xl px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid gap-8 lg:grid-cols-2"
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl">
                    <img
                      src={featuredNews.image || ""}
                      alt={featuredNews.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <Badge variant="cyber" className="absolute left-4 top-4">
                      Featured
                    </Badge>
                  </div>
                  <div className="flex flex-col justify-center">
                    <Badge variant="outline" className="mb-4 w-fit">
                      {featuredNews.category}
                    </Badge>
                    <p className="mb-2 text-sm text-muted-foreground">
                      {new Date(featuredNews.publishedAt || featuredNews.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <h2 className="mb-4 text-3xl font-bold leading-tight">
                      {featuredNews.title}
                    </h2>
                    <p className="mb-6 text-muted-foreground">{featuredNews.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>By {featuredNews.author}</span>
                      <span>•</span>
                      <span>{featuredNews.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* News Grid */}
          <section className="py-12">
            <div className="container mx-auto max-w-7xl px-4">
              {restNews.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {restNews.map((article) => (
                    <motion.div key={article._id} variants={itemVariants}>
                      <NewsCard
                        slug={article.excerpt ? article.slug : undefined}
                        title={article.title}
                        excerpt={article.excerpt}
                        image={article.image || ""}
                        category={article.category}
                        author={article.author}
                        readTime={article.readTime}
                        date={new Date(article.publishedAt || article.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : filteredNews.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-lg text-muted-foreground">
                    No articles found matching your criteria.
                  </p>
                </div>
              ) : null}
            </div>
          </section>
        </>
      )}
    </MainLayout>
  );
}
