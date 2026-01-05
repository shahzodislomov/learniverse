import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const ADMIN_EMAIL = "wenaco34@gmail.com";

// Simple password hashing (in production, use bcrypt or similar)
function hashPassword(password: string): string {
  // This is a simple hash for demo - in production use proper hashing
  return btoa(password);
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Register new user
export const register = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .first();

    if (existing) {
      throw new Error("User with this email already exists");
    }

    // Create user
    const userId = await ctx.db.insert("users", {
      email: args.email.toLowerCase(),
      passwordHash: hashPassword(args.password),
      name: args.name,
      isAdmin: args.email.toLowerCase() === ADMIN_EMAIL,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return {
      userId,
      email: args.email.toLowerCase(),
      name: args.name,
      isAdmin: args.email.toLowerCase() === ADMIN_EMAIL,
    };
  },
});

// Login user
export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .first();

    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (!verifyPassword(args.password, user.passwordHash)) {
      throw new Error("Invalid email or password");
    }

    // Get photo URL if exists
    let photoUrl = undefined;
    if (user.photoStorageId) {
      photoUrl = await ctx.storage.getUrl(user.photoStorageId) || undefined;
    }

    return {
      userId: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      bio: user.bio,
      photoUrl,
      isAdmin: user.isAdmin,
    };
  },
});

// Get current user by email
export const getCurrentUser = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .first();

    if (!user) {
      return null;
    }

    let photoUrl = undefined;
    if (user.photoStorageId) {
      photoUrl = await ctx.storage.getUrl(user.photoStorageId) || undefined;
    }

    return {
      userId: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      bio: user.bio,
      photoUrl,
      isAdmin: user.isAdmin,
    };
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
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email.toLowerCase()))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Get all users (admin only)
export const getAllUsers = query({
  args: { adminEmail: v.string() },
  handler: async (ctx, args) => {
    // Verify admin
    const admin = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.adminEmail.toLowerCase()))
      .first();

    if (!admin || !admin.isAdmin) {
      throw new Error("Unauthorized");
    }

    const users = await ctx.db.query("users").collect();
    
    return Promise.all(users.map(async (user) => {
      let photoUrl = undefined;
      if (user.photoStorageId) {
        photoUrl = await ctx.storage.getUrl(user.photoStorageId) || undefined;
      }

      return {
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        photoUrl,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      };
    }));
  },
});