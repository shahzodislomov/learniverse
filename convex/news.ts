import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all published news
export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    const news = await ctx.db
      .query("news")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .order("desc")
      .collect();
    
    const newsWithImages = await Promise.all(
      news.map(async (article) => {
        let imageUrl = article.image;
        if (article.imageStorageId) {
          imageUrl = await ctx.storage.getUrl(article.imageStorageId) || article.image;
        }
        return {
          ...article,
          image: imageUrl,
          date: new Date(article.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        };
      })
    );
    
    return newsWithImages;
  },
});

// Get featured news
export const listFeatured = query({
  args: {},
  handler: async (ctx) => {
    const news = await ctx.db
      .query("news")
      .withIndex("by_featured", (q) => q.eq("isFeatured", true).eq("isPublished", true))
      .order("desc")
      .take(3);
    
    const newsWithImages = await Promise.all(
      news.map(async (article) => {
        let imageUrl = article.image;
        if (article.imageStorageId) {
          imageUrl = await ctx.storage.getUrl(article.imageStorageId) || article.image;
        }
        return {
          ...article,
          image: imageUrl,
          date: new Date(article.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        };
      })
    );
    
    return newsWithImages;
  },
});

// Get article by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const article = await ctx.db
      .query("news")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    
    if (!article) return null;
    
    let imageUrl = article.image;
    if (article.imageStorageId) {
      imageUrl = await ctx.storage.getUrl(article.imageStorageId) || article.image;
    }
    
    return {
      ...article,
      image: imageUrl,
      date: new Date(article.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
  },
});

// Get all news for admin
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const news = await ctx.db.query("news").order("desc").collect();
    
    const newsWithImages = await Promise.all(
      news.map(async (article) => {
        let imageUrl = article.image;
        if (article.imageStorageId) {
          imageUrl = await ctx.storage.getUrl(article.imageStorageId) || article.image;
        }
        return {
          ...article,
          image: imageUrl,
          date: new Date(article.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        };
      })
    );
    
    return newsWithImages;
  },
});

// Create a new article
export const create = mutation({
  args: {
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.string(),
    author: v.string(),
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const slug = args.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    // Calculate read time (roughly 200 words per minute)
    const wordCount = args.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    
    const now = Date.now();
    
    const articleId = await ctx.db.insert("news", {
      ...args,
      slug,
      readTime: `${readTime} min read`,
      isPublished: false,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });
    
    return articleId;
  },
});

// Update an article
export const update = mutation({
  args: {
    id: v.id("news"),
    title: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.string()),
    author: v.optional(v.string()),
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    isPublished: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Article not found");
    
    // Update slug if title changed
    let slug = existing.slug;
    if (updates.title) {
      slug = updates.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    
    // Recalculate read time if content changed
    let readTime = existing.readTime;
    if (updates.content) {
      const wordCount = updates.content.split(/\s+/).length;
      const mins = Math.max(1, Math.ceil(wordCount / 200));
      readTime = `${mins} min read`;
    }
    
    await ctx.db.patch(id, {
      ...updates,
      slug,
      readTime,
      updatedAt: Date.now(),
    });
  },
});

// Delete an article
export const remove = mutation({
  args: { id: v.id("news") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
