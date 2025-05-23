import mongoose from "mongoose";
const { Schema } = mongoose;

export const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Note = mongoose.model("Note", noteSchema);

export default Note;
