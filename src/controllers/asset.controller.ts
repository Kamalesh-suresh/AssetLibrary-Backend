import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

/* ======================
   Helpers
====================== */

const parseId = (id: string) => {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};



/* ======================
   Create Asset
====================== */

export const createAsset = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, mac, link } = req.body;

    if (!title || !description || !mac || !link) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const asset = await prisma.asset.create({
      data: {
        title: String(title).trim(),
        description: String(description).trim(),
        mac: String(mac).trim(),
        link: String(link).trim(),
      },
    });

    return res.status(201).json({
      message: "Asset created successfully",
      asset,
    });
  } catch (error) {
    console.error("Create Asset Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* ======================
   Get All Assets
====================== */

export const getAssets = async (_req: Request, res: Response) => {
  try {
    const assets = await prisma.asset.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      count: assets.length,
      assets,
    });
  } catch (error) {
    console.error("Get Assets Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* ======================
   Get Asset By MAC
====================== */

export const getAssetByMac = async (req: Request, res: Response) => {
  try {
    const mac = req.params.mac;

    if (!mac) {
      return res.status(400).json({ message: "MAC address required" });
    }

    const assets = await prisma.asset.findMany({
      where: { mac: mac.trim() },
    });

    if (assets.length === 0) {
      return res.status(404).json({ message: "No assets found" });
    }

    return res.status(200).json({
      count: assets.length,
      assets,
    });
  } catch (error) {
    console.error("Get Asset By MAC Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* ======================
   Get Asset By ID
====================== */

export const getAssetById = async (req: Request, res: Response) => {
  try {
    const parsedId = parseId(req.params.id);

    if (!parsedId) {
      return res.status(400).json({ message: "Invalid asset id" });
    }

    const asset = await prisma.asset.findUnique({
      where: { id: parsedId },
    });

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    return res.status(200).json({ asset });
  } catch (error) {
    console.error("Get Asset By ID Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* ======================
   Update Asset
====================== */

export const updateAsset = async (req: Request, res: Response) => {
  try {
    const parsedId = parseId(req.params.id);

    if (!parsedId) {
      return res.status(400).json({ message: "Invalid asset id" });
    }

    const { title, description, mac, link } = req.body;

    const existingAsset = await prisma.asset.findUnique({
      where: { id: parsedId },
    });

    if (!existingAsset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    const updateData: any = {};

    if (title !== undefined) updateData.title = String(title).trim();
    if (description !== undefined)
      updateData.description = String(description).trim();
    if (mac !== undefined) updateData.mac = String(mac).trim();
    if (link !== undefined) updateData.link = String(link).trim();

    const updatedAsset = await prisma.asset.update({
      where: { id: parsedId },
      data: updateData,
    });

    return res.status(200).json({
      message: "Asset updated successfully",
      asset: updatedAsset,
    });
  } catch (error) {
    console.error("Update Asset Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/* ======================
   Delete Asset
====================== */

export const deleteAsset = async (req: Request, res: Response) => {
  try {
    const parsedId = parseId(req.params.id);

    if (!parsedId) {
      return res.status(400).json({ message: "Invalid asset id" });
    }

    const existingAsset = await prisma.asset.findUnique({
      where: { id: parsedId },
    });

    if (!existingAsset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    await prisma.asset.delete({
      where: { id: parsedId },
    });

    return res.status(200).json({
      message: "Asset deleted successfully",
    });
  } catch (error) {
    console.error("Delete Asset Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



