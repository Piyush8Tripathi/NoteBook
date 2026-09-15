import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  // Add Note
  const addNote = (e) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter title and description");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title,
      description: description,
    };

    setNotes([...notes, newNote]);

    setTitle("");
    setDescription("");
  };

  // Delete Note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Search Notes
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div>
          <h1>📚 NoteBook</h1>
          <p>Write it. Save it. Remember it.</p>
        </div>

        <div className="note-count">
          <span>Total Notes</span>
          <strong>{notes.length}</strong>
        </div>
      </header>

      <main className="container">

        {/* Add Note Section */}
        <section className="add-section">
          <h2>✏️ Create a New Note</h2>

          <form onSubmit={addNote}>

            <div className="input-group">
              <label>Note Title</label>

              <input
                type="text"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Note Description</label>

              <textarea
                placeholder="Write your note here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button className="add-btn" type="submit">
              + Add To Book
            </button>

          </form>
        </section>

        {/* Search Section */}
        <section className="search-section">

          <div>
            <h2>🔎 Search Notes</h2>
            <p>
              Showing <strong>{filteredNotes.length}</strong> of{" "}
              <strong>{notes.length}</strong> notes
            </p>
          </div>

          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </section>

        {/* Notes Section */}
        <section className="notes-section">

          {filteredNotes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📖</div>

              <h2>
                {notes.length === 0
                  ? "No Notes Yet"
                  : "No Matching Notes"}
              </h2>

              <p>
                {notes.length === 0
                  ? "Create your first note and start building your notebook."
                  : "Try searching with a different keyword."}
              </p>
            </div>
          ) : (
            <div className="notes-grid">

              {filteredNotes.map((note) => (
                <div className="note-card" key={note.id}>

                  <div className="note-header">
                    <h3>{note.title}</h3>

                    <span className="note-number">
                      #{notes.indexOf(note) + 1}
                    </span>
                  </div>

                  <p className="note-description">
                    {note.description}
                  </p>

                  <div className="note-footer">

                    <span>📝 Note</span>

                    <button
                      className="delete-btn"
                      onClick={() => deleteNote(note.id)}
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>

      {/* Footer */}
      <footer>
        <p>Made with ❤️ using React</p>
      </footer>

    </div>
  );
}

export default App;