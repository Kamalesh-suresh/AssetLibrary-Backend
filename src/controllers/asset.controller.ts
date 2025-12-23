import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";

export const createAsset = async (req: Request, res: Response) => {
  try {
    const { title, description, mac, link } = req.body;
    if (!title || !description || !mac || !link) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const asset = await prisma.asset.create({
      data: {
        title,
        description,
        mac,
        link,
      },
    });
    return res
      .status(201)
      .json({ message: "Asset created successfully", asset });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
