import mongoose from "mongoose";

// step 1 : craete schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// step 2 : create model based on that schema
const Note = mongoose.model("Note",noteSchema);
export default Note;