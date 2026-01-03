import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const ADMIN_EMAIL = "wenaco34@gmail.com";

// Get site logo
export const getLogo = query({
  args: {},
  handler: async (ctx) => {
    const setting = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "logo"))
      .first();

    if (!setting) return null;

    let logoUrl = setting.value;
    if (setting.storageId) {
      logoUrl = await ctx.storage.getUrl(setting.storageId) || setting.value;
    }

    return logoUrl;
  },
});

// Update site logo (admin only)
export const updateLogo = mutation({
  args: {
    adminEmail: v.string(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    if (args.adminEmail !== ADMIN_EMAIL) {
      throw new Error("Unauthorized");
    }

    const logoUrl = await ctx.storage.getUrl(args.storageId);
    if (!logoUrl) {
      throw new Error("Failed to get logo URL");
    }

    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "logo"))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        value: logoUrl,
        storageId: args.storageId,
        updatedAt: Date.now(),
        updatedBy: args.adminEmail,
      });
    } else {
      await ctx.db.insert("siteSettings", {
        key: "logo",
        value: logoUrl,
        storageId: args.storageId,
        updatedAt: Date.now(),
        updatedBy: args.adminEmail,
      });
    }

    return { success: true, logoUrl };
  },
});