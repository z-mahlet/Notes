# 📝 Notes App

A simple full-stack Notes application built with **Next.js**, **Node.js**, **Express**, and **PostgreSQL**. Users can create, view, update, and delete notes through a clean and responsive interface.

---

## 📖 Overview

This project was built to learn the fundamentals of full-stack web development by implementing a complete CRUD (Create, Read, Update, Delete) application.

The frontend communicates with a REST API built using Express, which interacts with a PostgreSQL database to store notes.

---

## ✨ Features

- 📄 View all notes
- ➕ Create a new note
- ✏️ Edit an existing note
- 🗑️ Delete a note
- 🎨 Responsive UI with Tailwind CSS
- 🔄 Real-time updates after every CRUD operation

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL

---

## 📁 Project Structure

```text
notes-app/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone git@github.com:z-mahlet/Notes.git
cd notes-app
```

---

### 2. Install backend dependencies

```bash
cd backend
npm install
```

---

### 3. Configure environment variables

Create a `.env` file inside the `backend` folder.

Example:

```env
DB_USER=your_username
DB_HOST=localhost
DB_NAME=notes_db
DB_PASSWORD=your_password
DB_PORT=5432
PORT=5000
```

---

### 4. Create the PostgreSQL table

```sql
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 5. Start the backend

```bash
npm start
```

The backend runs on:

```
http://localhost:5000
```

---

### 6. Install frontend dependencies

Open another terminal.

```bash
cd frontend
npm install
```

---

### 7. Start the frontend

```bash
npm run dev
```

The frontend runs on:

```
http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/notes` | Get all notes |
| POST | `/notes` | Create a note |
| PUT | `/notes/:id` | Update a note |
| DELETE | `/notes/:id` | Delete a note |

---

## 🎯 Learning Outcomes

Through this project, I learned how to:

- Build a REST API with Express.js
- Connect Node.js to PostgreSQL
- Perform CRUD operations
- Use React Hooks (`useState`, `useEffect`)
- Fetch data from an API
- Manage component state
- Build a responsive UI with Tailwind CSS
- Connect a frontend application to a backend service

---

## 🚀 Future Improvements

- Search notes
- Filter and sort notes
- User authentication
- Categories and tags
- Rich text editor
- Dark mode
- Pagination
- Docker support
- Deployment to Vercel and Render

---

## 📄 License

This project is for learning and educational purposes.