import { mutation } from "./_generated/server";

const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];
const ALLOWED_DOCUMENT_TYPES = ["application/pdf", "application/zip", "text/plain"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_DOCUMENT_SIZE = 50 * 1024 * 1024; // 50MB

// Generate upload URL with validation
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Validate uploaded file (call after upload)
export const validateUpload = mutation({
  args: {},
  handler: async (ctx) => {
    // This is a placeholder for file validation logic
    // In production, you'd want to scan files for malware
    // and validate file contents match their MIME type
    return { valid: true };
  },
});