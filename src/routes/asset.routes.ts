import { Router } from "express";
import { createAsset } from "../controllers/asset.controller.js";

const router = Router();

router.post("/create", createAsset);

export default router;
