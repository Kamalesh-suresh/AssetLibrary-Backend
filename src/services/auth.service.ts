import { prisma } from "../lib/prisma.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { AppError } from "../utils/appError.js";

export const registerUser = async (data: any) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new AppError(409, "User already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(401, "Invalid credentials");
  }

  const valid = await comparePassword(password, user.password);

  if (!valid) {
    throw new AppError(401, "Invalid credentials");
  }

  return user;
};

// ⭐ RESET PASSWORD SERVICE
export const resetUserPassword = async (email: string, newPassword: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  return true;
};
