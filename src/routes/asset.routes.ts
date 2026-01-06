import { Router } from "express";
import { createAsset } from "../controllers/asset.controller.js";
import { getAssets } from "../controllers/asset.controller.js";
import { getAssetByMac } from "../controllers/asset.controller.js";
import { deleteAsset } from "../controllers/asset.controller.js";
import { updateAsset } from "../controllers/asset.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { getAssetById } from "../controllers/asset.controller.js";

const router = Router();

router.post("/create", authenticate, createAsset);
router.get("/all", getAssets);
router.get("/:mac", getAssetByMac);
router.get("/get/:id", getAssetById);
router.delete("/:id", authenticate, deleteAsset);
router.patch("/:id", authenticate, updateAsset);

export default router;



