import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/appError.js";
import { CreateAssetDTO, UpdateAssetDTO } from "../dtos/asset.dto.js";

const parseId = (id: string): number => {
  const parsed = Number(id);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError(400, "Invalid asset id");
  }
  return parsed;
};

// CREATE
export const createAssetService = async (data: CreateAssetDTO) => {
  // Optional: Prevent duplicate MAC

  return prisma.asset.create({
    data: {
      title: data.title.trim(),
      description: data.description.trim(),
      mac: data.mac.trim(),
      link: data.link.trim(),
    },
  });
};

// GET ALL
export const getAllAssetsService = async () => {
  return prisma.asset.findMany({
    orderBy: { createdAt: "desc" },
  });
};

// GET BY MAC
export const getAssetByMacService = async (mac: string) => {
  if (!mac) {
    throw new AppError(400, "MAC address required");
  }

  const assets = await prisma.asset.findMany({
    where: { mac: mac.trim() },
  });

  if (!assets.length) {
    throw new AppError(404, "No assets found");
  }

  return assets;
};

// GET BY ID
export const getAssetByIdService = async (id: string) => {
  const parsedId = parseId(id);

  const asset = await prisma.asset.findUnique({
    where: { id: parsedId },
  });

  if (!asset) {
    throw new AppError(404, "Asset not found");
  }

  return asset;
};

// UPDATE
export const updateAssetService = async (id: string, data: UpdateAssetDTO) => {
  const parsedId = parseId(id);

  const existing = await prisma.asset.findUnique({
    where: { id: parsedId },
  });

  if (!existing) {
    throw new AppError(404, "Asset not found");
  }

  if (data.mac) {
    const duplicate = await prisma.asset.findFirst({
      where: {
        mac: data.mac.trim(),
        NOT: { id: parsedId },
      },
    });

    if (duplicate) {
      throw new AppError(409, "Another asset already uses this MAC");
    }
  }

  return prisma.asset.update({
    where: { id: parsedId },
    data: {
      ...data,
      title: data.title?.trim(),
      description: data.description?.trim(),
      mac: data.mac?.trim(),
      link: data.link?.trim(),
    },
  });
};

// DELETE
export const deleteAssetService = async (id: string) => {
  const parsedId = parseId(id);

  const existing = await prisma.asset.findUnique({
    where: { id: parsedId },
  });

  if (!existing) {
    throw new AppError(404, "Asset not found");
  }

  await prisma.asset.delete({
    where: { id: parsedId },
  });

  return true;
};
