import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const ADMIN_EMAIL = "wenaco34@gmail.com";

// Define resources table schema inline for now
// This would normally be in schema.ts

// Get all published resources
export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    // For now, return empty array as we need to add resources table to schema
    return [];
  },
});

// Admin: Create resource
export const adminCreateResource = mutation({
  args: {
    adminEmail: v.string(),
    title: v.string(),
    description: v.string(),
    category: v.string(),
    fileStorageId: v.id("_storage"),
    fileName: v.string(),
    fileSize: v.number(),
  },
  handler: async (ctx, args) => {
    if (args.adminEmail !== ADMIN_EMAIL) {
      throw new Error("Unauthorized");
    }

    // For now, just validate - need to add resources table to schema
    return { success: true, message: "Resources table needs to be added to schema" };
  },
});