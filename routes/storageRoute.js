import express from "express";
import Storage from "../models/Storage.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, image } = req.body;

    if (!title || !image) {
      return res.status(400).json({ message: "Title and image are required" });
    }

    const storage = new Storage({ title, image });
    await storage.save();

    res.status(201).json({ storage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const storage = await Storage.find();

    res.status(200).json({ storage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
