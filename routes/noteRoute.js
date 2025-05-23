import express from "express";
import Storage from "../models/Storage.js";
import Note from "../models/Note.js";

const router = express.Router();

// Create and add note to storage
router.post("/", async (req, res) => {
  try {
    const { title, caption, image } = req.body;
    const { storage } = req.query;

    if (!title || !caption || !image || !storage) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find storage by title
    const storageDoc = await Storage.findOne({ title: storage });
    if (!storageDoc) {
      return res.status(404).json({ message: "Storage not found" });
    }

    // Create and save new note
    const note = new Note({ title, caption, image });
    await note.save();

    // Push note into storage and save
    storageDoc.notes.push(note._id);
    await storageDoc.save();

    res.status(201).json({ message: "Note added to storage", note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all storages (with optional population of notes)
router.get("/", async (req, res) => {
  try {
    const storage = await Storage.find().populate("notes"); // optional
    res.status(200).json({ storage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.query;
    const note = await Storage.findOneAndDelete(id); // optional
    res.status(200).json({ note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
