import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User authentication and accounts
  users: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    bio: v.optional(v.string()),
    photoStorageId: v.optional(v.id("_storage")),
    isAdmin: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_admin", ["isAdmin"]),

  // Resources table for PDFs and documents
  resources: defineTable({
    title: v.string(),
    description: v.string(),
    category: v.string(),
    fileStorageId: v.id("_storage"),
    fileName: v.string(),
    fileSize: v.number(),
    fileType: v.string(),
    downloadCount: v.number(),
    isPublished: v.boolean(),
    createdBy: v.string(), // email of admin who created it
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_published", ["isPublished"])
    .index("by_category", ["category", "isPublished"]),

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
    userId: v.string(), // email for now
    lessonId: v.id("lessons"),
    courseId: v.id("courses"),
    completed: v.boolean(),
    completedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_course", ["userId", "courseId"])
    .index("by_user_lesson", ["userId", "lessonId"]),

  // Course enrollments
  enrollments: defineTable({
    userId: v.string(), // email for now
    courseId: v.id("courses"),
    enrolledAt: v.number(),
    lastAccessedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_course", ["userId", "courseId"]),

  // CTF Challenges
  ctfChallenges: defineTable({
    title: v.string(),
    description: v.string(),
    flag: v.string(),
    flagFormat: v.string(), // e.g., "WEN{...}"
    difficulty: v.union(v.literal("Easy"), v.literal("Medium"), v.literal("Hard")),
    points: v.number(),
    category: v.union(
      v.literal("Web"),
      v.literal("Crypto"),
      v.literal("Forensics"),
      v.literal("OSINT"),
      v.literal("Reverse"),
      v.literal("Misc")
    ),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
    createdBy: v.string(), // email of admin who created it
  })
    .index("by_active", ["isActive"])
    .index("by_category", ["category"])
    .index("by_difficulty", ["difficulty"]),

  // CTF Submissions/Solves
  ctfSubmissions: defineTable({
    challengeId: v.id("ctfChallenges"),
    userEmail: v.string(),
    isCorrect: v.boolean(),
    submittedFlag: v.string(),
    submittedAt: v.number(),
    pointsEarned: v.number(),
    isFirstBlood: v.boolean(),
  })
    .index("by_challenge", ["challengeId"])
    .index("by_user", ["userEmail"])
    .index("by_user_challenge", ["userEmail", "challengeId"])
    .index("by_correct", ["isCorrect", "submittedAt"]),

  // Site settings (logo, etc.)
  siteSettings: defineTable({
    key: v.string(),
    value: v.string(),
    storageId: v.optional(v.id("_storage")),
    updatedAt: v.number(),
    updatedBy: v.string(),
  }).index("by_key", ["key"]),
});