"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/notes");

      const data = await response.json();

      setNotes(data);

    } catch (error) {
      console.error(error);
    }
  };

  const createNote = async () => {
    try {
      if (!title.trim()) {
        alert("Title is required");
        return;
      }
      const response = await fetch("http://localhost:5000/notes", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      setTitle("");
      setContent("");

      fetchNotes();

    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
      });

      fetchNotes();

    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async () => {
    try {
      if (!editTitle.trim()) {
        alert("Title is required");
        return;
      }
      const response = await fetch(
        `http://localhost:5000/notes/${editingId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: editTitle,
            content: editContent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      setEditingId(null);
      setEditTitle("");
      setEditContent("");

      fetchNotes();

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <main>
      <h1>Notes App</h1>

      {/* Create Note Form */}
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />

        <button onClick={createNote}>Add Note</button>
      </div>

      <hr />

      {/* Notes List */}
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
      notes.map((note) => (
        <div key={note.id}>
          {editingId === note.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <br />

              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />

              <br />

              <button onClick={updateNote}>Save</button>

              <button
                onClick={() => {
                  setEditingId(null);
                  setEditTitle("");
                  setEditContent("");
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2>{note.title}</h2>

              <p>{note.content}</p>

              <button
                onClick={() => {
                  setEditingId(note.id);
                  setEditTitle(note.title);
                  setEditContent(note.content);
                }}
              >
                Edit
              </button>

              <button onClick={() => deleteNote(note.id)}>
                Delete
              </button>
            </>
          )}

          <hr />
        </div>
      )))}
    </main>
  );
}