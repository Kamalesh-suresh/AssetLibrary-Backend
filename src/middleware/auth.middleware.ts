import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ["HS256"],
    }) as { userId: number; email: string };

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
