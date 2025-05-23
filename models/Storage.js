import mongoose from "mongoose";
import Note, { noteSchema } from "./Note.js";
const { Schema } = mongoose;
const storageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Storage = mongoose.model("Storage", storageSchema);

export default Storage;
