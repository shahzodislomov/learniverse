import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const ADMIN_EMAIL = "wenaco34@gmail.com";

// Get user profile
export const getProfile = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!profile) return null;

    // Get photo URL if storage ID exists
    let photoUrl = undefined;
    if (profile.photoStorageId) {
      photoUrl = await ctx.storage.getUrl(profile.photoStorageId) || undefined;
    }

    return { ...profile, photoUrl };
  },
});

// Create user profile (deprecated - use auth.register instead)
export const createProfile = mutation({
  args: { email: v.string(), name: v.optional(v.string()) },
  handler: async (ctx, args) => {
    // Check if already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      return existing._id;
    }

    // This is deprecated - users should be created via auth.register
    throw new Error("Please use auth.register to create new users");
  },
});

// Update user profile
export const updateProfile = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
    bio: v.optional(v.string()),
    photoStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const { email, ...updates } = args;
    
    const profile = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!profile) {
      throw new Error("Profile not found");
    }

    await ctx.db.patch(profile._id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Get user profile by email
export const getProfileByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!profile) return null;

    let photoUrl = undefined;
    if (profile.photoStorageId) {
      photoUrl = await ctx.storage.getUrl(profile.photoStorageId) || undefined;
    }

    return { ...profile, photoUrl };
  },
});