import { Router } from "express";
import { createAsset } from "../controllers/asset.controller.js";
import { getAssets } from "../controllers/asset.controller.js";
import { getAssetByMac } from "../controllers/asset.controller.js";
import { deleteAsset } from "../controllers/asset.controller.js";
import { updateAsset } from "../controllers/asset.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { getAssetById } from "../controllers/asset.controller.js";

const router = Router();

/**
 * @swagger
 * /asset/create:
 *   post:
 *     summary: Create a new asset
 *     tags: [Assets]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asset'
 *     responses:
 *       201:
 *         description: Asset created successfully
 */
router.post("/create", authenticate, createAsset);

/**
 * @swagger
 * /asset/all:
 *   get:
 *     summary: Get all assets
 *     tags: [Assets]
 *     responses:
 *       200:
 *         description: List of assets
 */
router.get("/all", getAssets);

/**
 * @swagger
 * /asset/{mac}:
 *   get:
 *     summary: Get asset by MAC address
 *     tags: [Assets]
 *     parameters:
 *       - in: path
 *         name: mac
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Asset(s) found
 *       404:
 *         description: No assets found
 */
router.get("/:mac", getAssetByMac);

/**
 * @swagger
 * /asset/get/{id}:
 *   get:
 *     summary: Get asset by ID
 *     tags: [Assets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asset found
 *       404:
 *         description: Asset not found
 */

router.get("/get/:id", getAssetById);

/**
 * @swagger
 * /asset/{id}:
 *   patch:
 *     summary: Update asset
 *     tags: [Assets]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asset'
 *     responses:
 *       200:
 *         description: Asset updated successfully
 */
router.patch("/:id", authenticate, updateAsset);

/**
 * @swagger
 * /asset/{id}:
 *   delete:
 *     summary: Delete asset
 *     tags: [Assets]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asset deleted successfully
 */

router.delete("/:id", authenticate, deleteAsset);

export default router;
