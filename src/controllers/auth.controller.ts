import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { env } from "../config/env.js";
import { z } from "zod";

/* ============================
   Validation Schemas
============================ */

const registerSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  password: z.string().min(8).max(100),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const resetPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(8).max(100),
});

/* ============================
   Register
============================ */

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parsed.error.flatten(),
      });
    }

    const { email, firstName, lastName, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // stronger hash

    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* ============================
   Login
============================ */

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parsed.error.flatten(),
      });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Avoid user enumeration
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRES_IN,
        algorithm: "HS256",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* ============================
   Reset Password
============================ */

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const parsed = resetPasswordSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parsed.error.flatten(),
      });
    }

    const { email, newPassword } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
