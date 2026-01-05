import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const ADMIN_EMAIL = "wenaco34@gmail.com";

// Get all published resources
export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    const resources = await ctx.db
      .query("resources")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();

    return Promise.all(resources.map(async (resource) => {
      const fileUrl = await ctx.storage.getUrl(resource.fileStorageId);
      return {
        ...resource,
        fileUrl,
      };
    }));
  },
});

// Get resources by category
export const listByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const resources = await ctx.db
      .query("resources")
      .withIndex("by_category", (q) => 
        q.eq("category", args.category).eq("isPublished", true)
      )
      .collect();

    return Promise.all(resources.map(async (resource) => {
      const fileUrl = await ctx.storage.getUrl(resource.fileStorageId);
      return {
        ...resource,
        fileUrl,
      };
    }));
  },
});

// Admin: Get all resources
export const adminListAll = query({
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

    const resources = await ctx.db.query("resources").collect();

    return Promise.all(resources.map(async (resource) => {
      const fileUrl = await ctx.storage.getUrl(resource.fileStorageId);
      return {
        ...resource,
        fileUrl,
      };
    }));
  },
});

// Admin: Create resource
export const adminCreate = mutation({
  args: {
    adminEmail: v.string(),
    title: v.string(),
    description: v.string(),
    category: v.string(),
    fileStorageId: v.id("_storage"),
    fileName: v.string(),
    fileSize: v.number(),
    fileType: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify admin
    const admin = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.adminEmail.toLowerCase()))
      .first();

    if (!admin || !admin.isAdmin) {
      throw new Error("Unauthorized");
    }

    const resourceId = await ctx.db.insert("resources", {
      title: args.title,
      description: args.description,
      category: args.category,
      fileStorageId: args.fileStorageId,
      fileName: args.fileName,
      fileSize: args.fileSize,
      fileType: args.fileType,
      downloadCount: 0,
      isPublished: true,
      createdBy: args.adminEmail,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return resourceId;
  },
});

// Admin: Update resource
export const adminUpdate = mutation({
  args: {
    adminEmail: v.string(),
    resourceId: v.id("resources"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Verify admin
    const admin = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.adminEmail.toLowerCase()))
      .first();

    if (!admin || !admin.isAdmin) {
      throw new Error("Unauthorized");
    }

    const { adminEmail, resourceId, ...updates } = args;

    await ctx.db.patch(resourceId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Admin: Delete resource
export const adminDelete = mutation({
  args: {
    adminEmail: v.string(),
    resourceId: v.id("resources"),
  },
  handler: async (ctx, args) => {
    // Verify admin
    const admin = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.adminEmail.toLowerCase()))
      .first();

    if (!admin || !admin.isAdmin) {
      throw new Error("Unauthorized");
    }

    const resource = await ctx.db.get(args.resourceId);
    
    if (resource) {
      // Delete the file from storage
      await ctx.storage.delete(resource.fileStorageId);
      // Delete the resource record
      await ctx.db.delete(args.resourceId);
    }

    return { success: true };
  },
});

// Increment download count
export const incrementDownload = mutation({
  args: { resourceId: v.id("resources") },
  handler: async (ctx, args) => {
    const resource = await ctx.db.get(args.resourceId);
    
    if (resource) {
      await ctx.db.patch(args.resourceId, {
        downloadCount: resource.downloadCount + 1,
      });
    }

    return { success: true };
  },
});