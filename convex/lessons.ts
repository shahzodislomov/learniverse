import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get lessons for a course
export const listByCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const lessons = await ctx.db
      .query("lessons")
      .withIndex("by_course_order", (q) => q.eq("courseId", args.courseId))
      .collect();
    
    // Get video URLs for lessons
    const lessonsWithUrls = await Promise.all(
      lessons.map(async (lesson) => {
        let videoUrl = lesson.videoUrl;
        if (lesson.videoStorageId) {
          videoUrl = await ctx.storage.getUrl(lesson.videoStorageId) || lesson.videoUrl;
        }
        return { ...lesson, videoUrl };
      })
    );
    
    return lessonsWithUrls;
  },
});

// Get a single lesson
export const get = query({
  args: { id: v.id("lessons") },
  handler: async (ctx, args) => {
    const lesson = await ctx.db.get(args.id);
    if (!lesson) return null;
    
    let videoUrl = lesson.videoUrl;
    if (lesson.videoStorageId) {
      videoUrl = await ctx.storage.getUrl(lesson.videoStorageId) || lesson.videoUrl;
    }
    
    return { ...lesson, videoUrl };
  },
});

// Create a new lesson
export const create = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    description: v.string(),
    videoUrl: v.optional(v.string()),
    videoStorageId: v.optional(v.id("_storage")),
    duration: v.string(),
    moduleTitle: v.string(),
    isPreview: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Get the current highest order for this course
    const existingLessons = await ctx.db
      .query("lessons")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .collect();
    
    const maxOrder = existingLessons.reduce((max, l) => Math.max(max, l.order), 0);
    
    const now = Date.now();
    
    const lessonId = await ctx.db.insert("lessons", {
      ...args,
      order: maxOrder + 1,
      createdAt: now,
      updatedAt: now,
    });
    
    // Update course duration
    const allLessons = await ctx.db
      .query("lessons")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .collect();
    
    const totalMinutes = allLessons.reduce((acc, l) => {
      const mins = parseInt(l.duration) || 0;
      return acc + mins;
    }, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const durationStr = hours > 0 ? `${hours}h ${mins}m` : `${mins} min`;
    
    await ctx.db.patch(args.courseId, {
      duration: durationStr,
      updatedAt: now,
    });
    
    return lessonId;
  },
});

// Update a lesson
export const update = mutation({
  args: {
    id: v.id("lessons"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    videoStorageId: v.optional(v.id("_storage")),
    duration: v.optional(v.string()),
    moduleTitle: v.optional(v.string()),
    order: v.optional(v.number()),
    isPreview: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Lesson not found");
    
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
    
    // Recalculate course duration if duration changed
    if (updates.duration) {
      const allLessons = await ctx.db
        .query("lessons")
        .withIndex("by_course", (q) => q.eq("courseId", existing.courseId))
        .collect();
      
      const totalMinutes = allLessons.reduce((acc, l) => {
        const duration = l._id === id ? (updates.duration || l.duration) : l.duration;
        const mins = parseInt(duration) || 0;
        return acc + mins;
      }, 0);
      
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      const durationStr = hours > 0 ? `${hours}h ${mins}m` : `${mins} min`;
      
      await ctx.db.patch(existing.courseId, {
        duration: durationStr,
        updatedAt: Date.now(),
      });
    }
  },
});

// Delete a lesson
export const remove = mutation({
  args: { id: v.id("lessons") },
  handler: async (ctx, args) => {
    const lesson = await ctx.db.get(args.id);
    if (!lesson) throw new Error("Lesson not found");
    
    await ctx.db.delete(args.id);
    
    // Recalculate course duration
    const remainingLessons = await ctx.db
      .query("lessons")
      .withIndex("by_course", (q) => q.eq("courseId", lesson.courseId))
      .collect();
    
    const totalMinutes = remainingLessons.reduce((acc, l) => {
      const mins = parseInt(l.duration) || 0;
      return acc + mins;
    }, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const durationStr = hours > 0 ? `${hours}h ${mins}m` : `${mins} min`;
    
    await ctx.db.patch(lesson.courseId, {
      duration: durationStr,
      updatedAt: Date.now(),
    });
  },
});

// Reorder lessons
export const reorder = mutation({
  args: {
    lessonIds: v.array(v.id("lessons")),
  },
  handler: async (ctx, args) => {
    for (let i = 0; i < args.lessonIds.length; i++) {
      await ctx.db.patch(args.lessonIds[i], {
        order: i + 1,
        updatedAt: Date.now(),
      });
    }
  },
});
