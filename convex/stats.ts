import { query } from "./_generated/server";

// Get platform statistics
export const getPlatformStats = query({
  handler: async (ctx) => {
    // Get course count
    const courses = await ctx.db
      .query("courses")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();

    // Get lesson count (labs)
    const lessons = await ctx.db.query("lessons").collect();

    // Get user count
    const users = await ctx.db.query("users").collect();

    // Get total submissions for certificates (unique users who solved at least one challenge)
    const submissions = await ctx.db
      .query("ctfSubmissions")
      .withIndex("by_correct", (q) => q.eq("isCorrect", true))
      .collect();
    
    const uniqueSolvers = new Set(submissions.map(s => s.userEmail));

    return {
      courses: courses.length,
      labs: lessons.length,
      learners: users.length,
      certificates: uniqueSolvers.size,
    };
  },
});