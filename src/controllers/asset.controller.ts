import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export const createAsset = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, mac, link } = req.body;

    const user = req.user;
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

export const getAssets = async (req: Request, res: Response) => {
  try {
    const assets = await prisma.asset.findMany();
    if (assets.length === 0) {
      return res.status(404).json({ message: "No assets found" });
    }
    return res.status(200).json({ count: assets.length, assets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAssetByMac = async (req: Request, res: Response) => {
  try {
    const { mac } = req.params;

    const assets = await prisma.asset.findMany({
      where: { mac },
    });

    if (assets.length === 0) {
      return res.status(404).json({ message: "No assets found" });
    }

    return res.status(200).json({
      count: assets.length,
      assets,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAssetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const asset = await prisma.asset.findUnique({
      where: { id: Number(id) },
    });

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    return res.status(200).json({ asset });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAsset = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existingAsset = await prisma.asset.findUnique({
      where: { id: Number(id) },
    });
    if (!existingAsset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    const asset = await prisma.asset.delete({
      where: { id: Number(id) },
    });

    return res
      .status(200)
      .json({ message: "Asset deleted successfully", asset });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAsset = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, mac, link } = req.body;

    const existingAsset = await prisma.asset.findUnique({
      where: { id: Number(id) },
    });
    if (!existingAsset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    const updatedAsset = await prisma.asset.update({
      where: { id: Number(id) },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(mac !== undefined && { mac }),
        ...(link !== undefined && { link }),
      },
    });
    return res
      .status(200)
      .json({ message: "Asset updated successfully", asset: updatedAsset });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
