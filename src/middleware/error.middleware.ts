import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  // If custom error
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors || null,
    });
  }

  console.error(err);

  return res.status(500).json({
    message: "Internal server error",
  });
};
