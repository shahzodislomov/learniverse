import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all published courses
export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    const courses = await ctx.db
      .query("courses")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();
    
    // Get lesson counts for each course
    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        const lessons = await ctx.db
          .query("lessons")
          .withIndex("by_course", (q) => q.eq("courseId", course._id))
          .collect();
        
        // Get image URL if stored in Convex
        let imageUrl = course.image;
        if (course.imageStorageId) {
          imageUrl = await ctx.storage.getUrl(course.imageStorageId) || course.image;
        }
        
        return {
          ...course,
          image: imageUrl,
          lessons: lessons.length,
          students: Math.floor(Math.random() * 10000) + 1000, // Placeholder
        };
      })
    );
    
    return coursesWithStats;
  },
});

// Get featured courses
export const listFeatured = query({
  args: {},
  handler: async (ctx) => {
    const courses = await ctx.db
      .query("courses")
      .withIndex("by_featured", (q) => q.eq("isFeatured", true).eq("isPublished", true))
      .take(6);
    
    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        const lessons = await ctx.db
          .query("lessons")
          .withIndex("by_course", (q) => q.eq("courseId", course._id))
          .collect();
        
        let imageUrl = course.image;
        if (course.imageStorageId) {
          imageUrl = await ctx.storage.getUrl(course.imageStorageId) || course.image;
        }
        
        return {
          ...course,
          image: imageUrl,
          lessons: lessons.length,
          students: Math.floor(Math.random() * 10000) + 1000,
        };
      })
    );
    
    return coursesWithStats;
  },
});

// Get course by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const course = await ctx.db
      .query("courses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    
    if (!course) return null;
    
    // Get lessons grouped by module
    const lessons = await ctx.db
      .query("lessons")
      .withIndex("by_course_order", (q) => q.eq("courseId", course._id))
      .collect();
    
    // Group lessons by module
    const modules: Record<string, typeof lessons> = {};
    lessons.forEach((lesson) => {
      if (!modules[lesson.moduleTitle]) {
        modules[lesson.moduleTitle] = [];
      }
      modules[lesson.moduleTitle].push(lesson);
    });
    
    const syllabus = Object.entries(modules).map(([moduleTitle, moduleLessons]) => ({
      module: moduleTitle,
      lessons: moduleLessons.length,
      duration: moduleLessons.reduce((acc, l) => {
        const mins = parseInt(l.duration) || 0;
        return acc + mins;
      }, 0) + " min",
      completed: false,
    }));
    
    let imageUrl = course.image;
    if (course.imageStorageId) {
      imageUrl = await ctx.storage.getUrl(course.imageStorageId) || course.image;
    }
    
    return {
      ...course,
      image: imageUrl,
      lessons: lessons.length,
      syllabus,
      students: Math.floor(Math.random() * 10000) + 1000,
      rating: 4.8,
      reviews: Math.floor(Math.random() * 1000) + 100,
    };
  },
});

// Get all courses for admin
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const courses = await ctx.db.query("courses").order("desc").collect();
    
    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        const lessons = await ctx.db
          .query("lessons")
          .withIndex("by_course", (q) => q.eq("courseId", course._id))
          .collect();
        
        let imageUrl = course.image;
        if (course.imageStorageId) {
          imageUrl = await ctx.storage.getUrl(course.imageStorageId) || course.image;
        }
        
        return {
          ...course,
          image: imageUrl,
          lessonsCount: lessons.length,
        };
      })
    );
    
    return coursesWithStats;
  },
});

// Create a new course
export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    level: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
    category: v.string(),
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    instructor: v.object({
      name: v.string(),
      title: v.string(),
      avatar: v.string(),
    }),
    whatYouLearn: v.array(v.string()),
    requirements: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const slug = args.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    const now = Date.now();
    
    const courseId = await ctx.db.insert("courses", {
      ...args,
      slug,
      duration: "0 hours",
      isPublished: false,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });
    
    return courseId;
  },
});

// Update a course
export const update = mutation({
  args: {
    id: v.id("courses"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    level: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"))),
    category: v.optional(v.string()),
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    instructor: v.optional(v.object({
      name: v.string(),
      title: v.string(),
      avatar: v.string(),
    })),
    whatYouLearn: v.optional(v.array(v.string())),
    requirements: v.optional(v.array(v.string())),
    isPublished: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Course not found");
    
    // Update slug if title changed
    let slug = existing.slug;
    if (updates.title) {
      slug = updates.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    
    await ctx.db.patch(id, {
      ...updates,
      slug,
      updatedAt: Date.now(),
    });
  },
});

// Delete a course
export const remove = mutation({
  args: { id: v.id("courses") },
  handler: async (ctx, args) => {
    // Delete all lessons first
    const lessons = await ctx.db
      .query("lessons")
      .withIndex("by_course", (q) => q.eq("courseId", args.id))
      .collect();
    
    for (const lesson of lessons) {
      await ctx.db.delete(lesson._id);
    }
    
    await ctx.db.delete(args.id);
  },
});
