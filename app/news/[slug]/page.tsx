"use client";

import React, { useEffect, use } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useArticle } from "@/hooks/useConvex";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = useArticle(slug);
  const router = useRouter();

  useEffect(() => {
    if (article === null) {
      router.replace("/news");
    }
  }, [article, router]);

  if (!article) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">{new Date(article.createdAt).toLocaleDateString()}</p>
            <h1 className="mt-2 text-3xl font-bold">{article.title}</h1>
            <p className="mt-4 text-muted-foreground">By {article.author} • {article.readTime}</p>
          </div>
          {article.image && (
            <div className="mb-8 w-full overflow-hidden rounded-lg">
              <img src={article.image} alt={article.title} className="w-full object-cover" />
            </div>
          )}
          <article className="prose max-w-none">
            <p>{article.content}</p>
          </article>
        </div>
      </section>
    </MainLayout>
  );
}
