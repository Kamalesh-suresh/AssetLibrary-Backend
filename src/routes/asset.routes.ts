import { Router } from "express";
import { createAsset } from "../controllers/asset.controller.js";
import { getAssets } from "../controllers/asset.controller.js";
import { getAssetByMac } from "../controllers/asset.controller.js";
import { deleteAsset } from "../controllers/asset.controller.js";
import { updateAsset } from "../controllers/asset.controller.js";

const router = Router();

router.post("/create", createAsset);
router.get("/all", getAssets);
router.get("/:mac", getAssetByMac);
router.delete("/:id", deleteAsset);
router.patch("/:id", updateAsset);

export default router;
