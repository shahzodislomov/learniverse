import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Courses table
  courses: defineTable({
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    level: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
    duration: v.string(),
    category: v.string(),
    instructor: v.object({
      name: v.string(),
      title: v.string(),
      avatar: v.string(),
    }),
    whatYouLearn: v.array(v.string()),
    requirements: v.array(v.string()),
    isPublished: v.boolean(),
    isFeatured: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["isPublished"])
    .index("by_featured", ["isFeatured", "isPublished"]),

  // Lessons table (videos for courses)
  lessons: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    description: v.string(),
    videoUrl: v.optional(v.string()),
    videoStorageId: v.optional(v.id("_storage")),
    duration: v.string(),
    order: v.number(),
    moduleTitle: v.string(),
    isPreview: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_course", ["courseId"])
    .index("by_course_order", ["courseId", "order"]),

  // News/Articles table
  news: defineTable({
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    category: v.string(),
    author: v.string(),
    readTime: v.string(),
    isPublished: v.boolean(),
    isFeatured: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["isPublished"])
    .index("by_featured", ["isFeatured", "isPublished"])
    .index("by_category", ["category", "isPublished"]),

  // User progress tracking
  userProgress: defineTable({
    visitorId: v.string(), // For anonymous users, use a generated ID
    lessonId: v.id("lessons"),
    courseId: v.id("courses"),
    completed: v.boolean(),
    completedAt: v.optional(v.number()),
  })
    .index("by_visitor", ["visitorId"])
    .index("by_visitor_course", ["visitorId", "courseId"])
    .index("by_visitor_lesson", ["visitorId", "lessonId"]),

  // Course enrollments
  enrollments: defineTable({
    visitorId: v.string(),
    courseId: v.id("courses"),
    enrolledAt: v.number(),
    lastAccessedAt: v.number(),
  })
    .index("by_visitor", ["visitorId"])
    .index("by_visitor_course", ["visitorId", "courseId"]),
});
