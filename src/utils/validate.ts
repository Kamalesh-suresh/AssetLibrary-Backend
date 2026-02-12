import { ZodSchema } from "zod";
import { AppError } from "./appError.js";

export const validate = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    throw new AppError(400, "Validation failed", parsed.error.flatten());
  }

  return parsed.data;
};
