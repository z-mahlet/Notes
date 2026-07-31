const pool = require("../config/db");

const getNotes = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notes ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || title.trim() === "") {

        return res.status(400).json({
            message: "Title is required"
        });

    }

    const result = await pool.query(
      `INSERT INTO notes (title, content)
       VALUES ($1, $2)
       RETURNING *`,
      [title, content]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM notes
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.json({
      message: "Note deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

const updateNote = async (req, res) => {

  try {

    const { id } = req.params;

    const { title, content } = req.body;

    if (!title || title.trim() === "") {

        return res.status(400).json({
            message: "Title is required"
        });

    }

    const result = await pool.query(

      `UPDATE notes
       SET title=$1,
           content=$2
       WHERE id=$3
       RETURNING *`,

      [title, content, id]

    );

    if(result.rows.length===0){

      return res.status(404).json({
        message:"Note not found"
      });

    }

    res.json(result.rows[0]);

  }

  catch(error){

    console.error(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

}

module.exports = {
  getNotes,
  createNote,
  deleteNote,
  updateNote
};

