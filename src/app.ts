import express from "express";
import cors from "cors";
import { setupSwagger } from "./config/swagger.js";

import authRoutes from "./routes/auth.routes.js";
import assetRoutes from "./routes/asset.routes.js";
import { set } from "zod";

const app = express();

app.use(cors({}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/asset", assetRoutes);

setupSwagger(app);

export default app;
