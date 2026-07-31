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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_55%,_#111827_100%)] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-[0_20px_60px_rgba(2,8,23,0.45)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
                Workspace Notes
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Notes App
              </h1>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                Capture ideas, keep context, and bring clarity to your work with a calm, modern place to think.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 shadow-inner">
              <span className="font-semibold text-white">{notes.length}</span>{" "}
              {notes.length === 1 ? "note" : "notes"}
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
          <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/80 p-6 shadow-[0_18px_45px_rgba(2,8,23,0.35)]">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Create a note</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Add a new thought with a clear title and optional details.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Title
                </span>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Content
                </span>
                <textarea
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                />
              </label>

              <button
                onClick={createNote}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Add Note
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {notes.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center shadow-[0_10px_30px_rgba(2,8,23,0.2)]">
                <h2 className="text-xl font-semibold text-white">No notes yet</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Start by creating your first note on the left.
                </p>
              </div>
            ) : (
              notes.map((note) => (
                <article
                  key={note.id}
                  className="rounded-[28px] border border-slate-800/80 bg-slate-900/80 p-6 shadow-[0_18px_45px_rgba(2,8,23,0.28)] transition-transform duration-200 hover:-translate-y-1"
                >
                  {editingId === note.id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm font-medium text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                      />

                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={5}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                      />

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={updateNote}
                          className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditTitle("");
                            setEditContent("");
                          }}
                          className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{note.title}</h3>
                          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                            {note.content}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          onClick={() => {
                            setEditingId(note.id);
                            setEditTitle(note.title);
                            setEditContent(note.content);
                          }}
                          className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteNote(note.id)}
                          className="inline-flex items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-400/40 hover:bg-rose-500/20 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}