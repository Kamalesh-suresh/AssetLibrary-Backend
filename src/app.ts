import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import assetRoutes from "./routes/asset.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:49892", // Angular app
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/asset", assetRoutes);

export default app;
 