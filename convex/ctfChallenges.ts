import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all active challenges
export const getAllChallenges = query({
  args: { userEmail: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const challenges = await ctx.db
      .query("ctfChallenges")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();

    // Get user's solved challenges if email provided
    let solvedChallengeIds = new Set<string>();
    if (args.userEmail) {
      const submissions = await ctx.db
        .query("ctfSubmissions")
        .withIndex("by_user", (q) => q.eq("userEmail", args.userEmail))
        .filter((q) => q.eq(q.field("isCorrect"), true))
        .collect();
      
      solvedChallengeIds = new Set(submissions.map(s => s.challengeId.toString()));
    }

    // Get solve counts for each challenge
    const challengesWithStats = await Promise.all(
      challenges.map(async (challenge) => {
        const solves = await ctx.db
          .query("ctfSubmissions")
          .withIndex("by_challenge", (q) => q.eq("challengeId", challenge._id))
          .filter((q) => q.eq(q.field("isCorrect"), true))
          .collect();

        return {
          ...challenge,
          solveCount: solves.length,
          isSolved: solvedChallengeIds.has(challenge._id.toString()),
        };
      })
    );

    return challengesWithStats;
  },
});

// Get challenge by ID
export const getChallengeById = query({
  args: { challengeId: v.id("ctfChallenges") },
  handler: async (ctx, args) => {
    const challenge = await ctx.db.get(args.challengeId);
    if (!challenge) return null;

    const solves = await ctx.db
      .query("ctfSubmissions")
      .withIndex("by_challenge", (q) => q.eq("challengeId", args.challengeId))
      .filter((q) => q.eq(q.field("isCorrect"), true))
      .collect();

    return {
      ...challenge,
      solveCount: solves.length,
    };
  },
});

// Submit flag
export const submitFlag = mutation({
  args: {
    challengeId: v.id("ctfChallenges"),
    userEmail: v.string(),
    flag: v.string(),
  },
  handler: async (ctx, args) => {
    const challenge = await ctx.db.get(args.challengeId);
    if (!challenge || !challenge.isActive) {
      throw new Error("Challenge not found or inactive");
    }

    // Check if already solved
    const existingSolve = await ctx.db
      .query("ctfSubmissions")
      .withIndex("by_user_challenge", (q) =>
        q.eq("userEmail", args.userEmail).eq("challengeId", args.challengeId)
      )
      .filter((q) => q.eq(q.field("isCorrect"), true))
      .first();

    if (existingSolve) {
      throw new Error("Challenge already solved");
    }

    const isCorrect = args.flag.trim() === challenge.flag.trim();
    
    // Check if this is first blood
    let isFirstBlood = false;
    if (isCorrect) {
      const previousSolves = await ctx.db
        .query("ctfSubmissions")
        .withIndex("by_challenge", (q) => q.eq("challengeId", args.challengeId))
        .filter((q) => q.eq(q.field("isCorrect"), true))
        .collect();
      
      isFirstBlood = previousSolves.length === 0;
    }

    const pointsEarned = isCorrect ? (isFirstBlood ? challenge.points * 1.5 : challenge.points) : 0;

    await ctx.db.insert("ctfSubmissions", {
      challengeId: args.challengeId,
      userEmail: args.userEmail,
      isCorrect,
      submittedFlag: args.flag,
      submittedAt: Date.now(),
      pointsEarned: Math.round(pointsEarned),
      isFirstBlood,
    });

    return {
      success: isCorrect,
      points: Math.round(pointsEarned),
      firstBlood: isFirstBlood,
      bonusPoints: isFirstBlood ? Math.round(challenge.points * 0.5) : 0,
    };
  },
});

// Get solvers for a challenge
export const getChallengeSolvers = query({
  args: { challengeId: v.id("ctfChallenges") },
  handler: async (ctx, args) => {
    const submissions = await ctx.db
      .query("ctfSubmissions")
      .withIndex("by_challenge", (q) => q.eq("challengeId", args.challengeId))
      .filter((q) => q.eq(q.field("isCorrect"), true))
      .order("asc")
      .collect();

    return submissions.map((sub, index) => ({
      userEmail: sub.userEmail,
      solvedAt: sub.submittedAt,
      solveOrder: index + 1,
      firstBlood: sub.isFirstBlood,
    }));
  },
});

// Get user stats
export const getUserStats = query({
  args: { userEmail: v.string() },
  handler: async (ctx, args) => {
    const solvedSubmissions = await ctx.db
      .query("ctfSubmissions")
      .withIndex("by_user", (q) => q.eq("userEmail", args.userEmail))
      .filter((q) => q.eq(q.field("isCorrect"), true))
      .collect();

    const uniqueChallenges = new Set(solvedSubmissions.map(s => s.challengeId.toString()));
    const totalPoints = solvedSubmissions.reduce((sum, sub) => sum + sub.pointsEarned, 0);
    const firstBloods = solvedSubmissions.filter(s => s.isFirstBlood).length;

    const totalChallenges = await ctx.db
      .query("ctfChallenges")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();

    // Get all users' scores for ranking
    const allSubmissions = await ctx.db
      .query("ctfSubmissions")
      .withIndex("by_correct", (q) => q.eq("isCorrect", true))
      .collect();

    const userScores = new Map<string, number>();
    allSubmissions.forEach(sub => {
      const current = userScores.get(sub.userEmail) || 0;
      userScores.set(sub.userEmail, current + sub.pointsEarned);
    });

    const sortedScores = Array.from(userScores.entries())
      .sort((a, b) => b[1] - a[1]);
    
    const userRank = sortedScores.findIndex(([email]) => email === args.userEmail) + 1;
    const percentile = userRank > 0 ? Math.round((1 - userRank / sortedScores.length) * 100) : 0;

    return {
      completedChallenges: uniqueChallenges.size,
      totalChallenges: totalChallenges.length,
      totalPoints,
      rank: userRank || sortedScores.length + 1,
      percentile: percentile,
      firstBloods,
    };
  },
});

// Admin: Get all challenges (including inactive)
export const adminGetAllChallenges = query({
  args: { adminEmail: v.string() },
  handler: async (ctx, args) => {
    // Check if user is admin
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_email", (q) => q.eq("email", args.adminEmail))
      .first();

    if (!profile || !profile.isAdmin) {
      throw new Error("Unauthorized");
    }

    const challenges = await ctx.db.query("ctfChallenges").collect();

    const challengesWithStats = await Promise.all(
      challenges.map(async (challenge) => {
        const solves = await ctx.db
          .query("ctfSubmissions")
          .withIndex("by_challenge", (q) => q.eq("challengeId", challenge._id))
          .filter((q) => q.eq(q.field("isCorrect"), true))
          .collect();

        return {
          ...challenge,
          solveCount: solves.length,
        };
      })
    );

    return challengesWithStats;
  },
});

// Admin: Create challenge
export const adminCreateChallenge = mutation({
  args: {
    adminEmail: v.string(),
    title: v.string(),
    description: v.string(),
    flag: v.string(),
    flagFormat: v.string(),
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
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_email", (q) => q.eq("email", args.adminEmail))
      .first();

    if (!profile || !profile.isAdmin) {
      throw new Error("Unauthorized");
    }

    const challengeId = await ctx.db.insert("ctfChallenges", {
      title: args.title,
      description: args.description,
      flag: args.flag,
      flagFormat: args.flagFormat,
      difficulty: args.difficulty,
      points: args.points,
      category: args.category,
      isActive: args.isActive,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      createdBy: args.adminEmail,
    });

    return challengeId;
  },
});

// Admin: Update challenge
export const adminUpdateChallenge = mutation({
  args: {
    adminEmail: v.string(),
    challengeId: v.id("ctfChallenges"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    flag: v.optional(v.string()),
    flagFormat: v.optional(v.string()),
    difficulty: v.optional(v.union(v.literal("Easy"), v.literal("Medium"), v.literal("Hard"))),
    points: v.optional(v.number()),
    category: v.optional(v.union(
      v.literal("Web"),
      v.literal("Crypto"),
      v.literal("Forensics"),
      v.literal("OSINT"),
      v.literal("Reverse"),
      v.literal("Misc")
    )),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_email", (q) => q.eq("email", args.adminEmail))
      .first();

    if (!profile || !profile.isAdmin) {
      throw new Error("Unauthorized");
    }

    const { adminEmail, challengeId, ...updates } = args;
    
    await ctx.db.patch(challengeId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Admin: Delete challenge
export const adminDeleteChallenge = mutation({
  args: {
    adminEmail: v.string(),
    challengeId: v.id("ctfChallenges"),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_email", (q) => q.eq("email", args.adminEmail))
      .first();

    if (!profile || !profile.isAdmin) {
      throw new Error("Unauthorized");
    }

    // Delete all submissions for this challenge
    const submissions = await ctx.db
      .query("ctfSubmissions")
      .withIndex("by_challenge", (q) => q.eq("challengeId", args.challengeId))
      .collect();

    for (const submission of submissions) {
      await ctx.db.delete(submission._id);
    }

    await ctx.db.delete(args.challengeId);

    return { success: true };
  },
});

// Get scoreboard
export const getScoreboard = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const submissions = await ctx.db
      .query("ctfSubmissions")
      .withIndex("by_correct", (q) => q.eq("isCorrect", true))
      .collect();

    const userStats = new Map<string, {
      email: string;
      nickname: string;
      totalPoints: number;
      solvedChallenges: number;
      firstBloods: number;
      lastSolveTime: number;
    }>();

    // Get user profiles for nicknames
    const profiles = await ctx.db.query("userProfiles").collect();
    const profileMap = new Map(profiles.map(p => [p.email, p.name]));

    submissions.forEach(sub => {
      const current = userStats.get(sub.userEmail) || {
        email: sub.userEmail,
        nickname: profileMap.get(sub.userEmail) || sub.userEmail.split('@')[0],
        totalPoints: 0,
        solvedChallenges: 0,
        firstBloods: 0,
        lastSolveTime: 0,
      };

      userStats.set(sub.userEmail, {
        ...current,
        totalPoints: current.totalPoints + sub.pointsEarned,
        solvedChallenges: current.solvedChallenges + 1,
        firstBloods: current.firstBloods + (sub.isFirstBlood ? 1 : 0),
        lastSolveTime: Math.max(current.lastSolveTime, sub.submittedAt),
      });
    });

    const sorted = Array.from(userStats.values())
      .sort((a, b) => {
        if (b.totalPoints !== a.totalPoints) {
          return b.totalPoints - a.totalPoints;
        }
        return a.lastSolveTime - b.lastSolveTime; // Earlier solve time wins
      });

    const limited = args.limit ? sorted.slice(0, args.limit) : sorted;

    return limited.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
  },
});