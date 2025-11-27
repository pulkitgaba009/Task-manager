import Note from "../models/Note.js";

// controller or function to get notes
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({createdAt:-1});  // newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in get All notes controller...", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// controller to get create
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(200).json(savedNote);
  } catch (error) {
    console.error("Error in post All notes controller...", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req,res){
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json({note});
    } catch (error) {
        console.error("Error in get note by id controller...", error);
        res.status(500).json({ message: "Internal server error" });
    }
} 

// controller to update note
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found..." });
    res.status(200).json({ updateNote });
  } catch (error) {
    console.error("Error in update note controller...", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// controller to get delete
export async function deleteNote(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);

    if(!deleteNote){
        return res.status(404).json({message:"Note not found..."})
    } 
    res.status(200).json({ deleteNote });
  } catch (error) {
    console.error("Error in deleating note controller...", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
