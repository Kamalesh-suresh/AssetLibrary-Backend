import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { Request, Response } from "express";

import {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
} from "../schemas/auth.schema.js";

import {
  registerUser,
  loginUser,
  resetUserPassword,
} from "../services/auth.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.middleware.js";

// REGISTER
export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = validate(registerSchema, req.body);

  const user = await registerUser(data);

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

// LOGIN
export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = validate(loginSchema, req.body);

  const user = await loginUser(data.email, data.password);

  const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  res.json({
    message: "Login successful",
    token,
  });
});

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const data = validate(resetPasswordSchema, req.body);

    await resetUserPassword(data.email, data.newPassword);
    res.json({
      message: "Password reset successfully",
    });
  }
);
