import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

import { env } from "./config/env.js"; // safe now

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
