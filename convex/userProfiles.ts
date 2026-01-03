import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get or create user profile
export const getOrCreateProfile = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    let profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!profile) {
      // Create new profile - only wenaco34@gmail.com is admin
      const isAdmin = args.email === "wenaco34@gmail.com";
      
      const profileId = await ctx.db.insert("userProfiles", {
        email: args.email,
        name: args.name,
        avatar: "default",
        bio: "",
        isAdmin,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      profile = await ctx.db.get(profileId);
    }

    return profile;
  },
});

// Get user profile
export const getProfile = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    return profile;
  },
});

// Update user profile
export const updateProfile = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!profile) {
      throw new Error("Profile not found");
    }

    const { email, ...updates } = args;
    
    await ctx.db.patch(profile._id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Check if user is admin
export const checkAdmin = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    return {
      isAdmin: profile?.isAdmin || false,
    };
  },
});

// Get all authenticated users (for community page)
export const getAllUsers = query({
  handler: async (ctx) => {
    const profiles = await ctx.db.query("userProfiles").collect();
    
    return profiles.map(profile => ({
      email: profile.email,
      name: profile.name,
      avatar: profile.avatar,
      isAdmin: profile.isAdmin,
      createdAt: profile.createdAt,
    }));
  },
});