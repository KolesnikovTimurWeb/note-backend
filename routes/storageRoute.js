import express from "express";
import Storage from "../models/Storage.js";
import protectionRoute from "../middleware/auth.middleware.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = express.Router();

router.post("/", protectionRoute, async (req, res) => {
  try {
    const { title, image } = req.body;
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!title || !image) {
      return res.status(400).json({ message: "Title and image are required" });
    }

    const storage = new Storage({ title, image, user: user._id });
    await storage.save();

    res.status(201).json({ storage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/", protectionRoute, async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    const storage = await Storage.find({ user: user._id });

    res.status(200).json({ storage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
