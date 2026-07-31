require("dotenv").config();

const pool = require("./config/db");

const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

const notesRoutes = require("./routes/notesRoutes");
app.use("/notes", notesRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running!"
  });
});

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected!");
    console.log(result.rows[0]);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});