import { z } from "zod";
import type { StringValue } from "ms";

const envSchema = z.object({
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.custom<StringValue>().default("1h"),
});

export const env = envSchema.parse(process.env);
