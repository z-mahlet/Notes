const express = require("express");

const router = express.Router();

const {
  getNotes,
  createNote,
    updateNote,
    deleteNote
} = require("../controllers/notesController");

router.get("/", getNotes);
router.post("/", createNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);


module.exports = router;