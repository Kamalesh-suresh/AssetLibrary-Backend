import { z } from "zod";

// CREATE
export const createAssetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  mac: z
    .string()
    .min(1, "Mac is required")
    .regex(/^Mac\s[1-9]\d*$/, "Mac must be like 'Mac 1', 'Mac 2', etc."),
  link: z.string().url("Invalid URL format"),
});

// UPDATE (partial)
export const updateAssetSchema = createAssetSchema.partial();
