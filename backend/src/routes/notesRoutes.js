import express from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notesController.js";

const router = express.Router();

// API to send the notes
router.get("/",getAllNotes)
router.get("/:id",getNoteById)
// API to create notes
router.post("/",createNote)
// API to update notes
// http://localhost:3000/api/notes/4
router.put("/:id",updateNote)
// API to delete notes
// http://localhost:3000/api/notes/4
router.delete("/:id",deleteNote)

export default router;

