import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  createAssetSchema,
  updateAssetSchema,
} from "../schemas/asset.schema.js";

import {
  createAssetService,
  getAllAssetsService,
  getAssetByMacService,
  getAssetByIdService,
  updateAssetService,
  deleteAssetService,
} from "../services/asset.service.js";

// CREATE
export const createAsset = asyncHandler(async (req: Request, res: Response) => {
  const data = validate(createAssetSchema, req.body);

  const asset = await createAssetService(data);

  res.status(201).json({
    message: "Asset created successfully",
    asset,
  });
});

// GET ALL
export const getAssets = asyncHandler(async (_req: Request, res: Response) => {
  const assets = await getAllAssetsService();

  res.status(200).json({
    count: assets.length,
    assets,
  });
});

// GET BY MAC
export const getAssetByMac = asyncHandler(
  async (req: Request, res: Response) => {
    const assets = await getAssetByMacService(req.params.mac);

    res.status(200).json({
      count: assets.length,
      assets,
    });
  },
);

// GET BY ID
export const getAssetById = asyncHandler(
  async (req: Request, res: Response) => {
    const asset = await getAssetByIdService(req.params.id);

    res.status(200).json({ asset });
  },
);

// UPDATE
export const updateAsset = asyncHandler(async (req: Request, res: Response) => {
  const data = validate(updateAssetSchema, req.body);

  const asset = await updateAssetService(req.params.id, data);

  res.status(200).json({
    message: "Asset updated successfully",
    asset,
  });
});

// DELETE
export const deleteAsset = asyncHandler(async (req: Request, res: Response) => {
  await deleteAssetService(req.params.id);

  res.status(200).json({
    message: "Asset deleted successfully",
  });
});
