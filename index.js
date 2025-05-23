import express from "express";
import { connectDB } from "./lib/db.js";
import "dotenv/config";
import authRouter from "./routes/authRoute.js";
import storageRoute from "./routes/storageRoute.js";
import noteRoute from "./routes/noteRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get(authRouter);
app.listen(PORT, () => {
  console.log("Server running ", PORT);
  connectDB();
});
app.use("/api/auth", authRouter);
app.use("/api/storage", storageRoute);
app.use("/api/note", noteRoute);
