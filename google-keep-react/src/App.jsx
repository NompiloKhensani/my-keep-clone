import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Form from "./components/Form/Form";
import Notes from "./components/Notes/Notes";
import Modal from "./components/Modal/Modal";

const NOTES = [];

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : NOTES;
  });
  const [selectedNote, setSelectedNote] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    if (saved) document.body.style.backgroundColor = "#202124";
    return saved;
  });
  const [isListView, setIsListView] = useState(() => localStorage.getItem("listView") === "true");

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("darkMode", isDark);
    document.body.style.backgroundColor = isDark ? "#202124" : "";
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("listView", isListView);
  }, [isListView]);

  const toggleDark = () => setIsDark((prev) => !prev);
  const toggleListView = () => setIsListView((prev) => !prev);

  const addNote = (note) => {
    setNotes((prevNotes) => {
      return [note, ...prevNotes];
    });
  };

  const editNote = (editedNote) => {
    setNotes(prevNotes => {
    const newArray = prevNotes.map(note => {
      if(editedNote.id === note.id) {
        note.title = editedNote.title;
        note.text = editedNote.text;
        note.color = editedNote.color;
      }
      return note;
    })
    return newArray;
  });
  }

  const colorNote = (id, color) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, color } : note))
    );
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => id !== note.id);
    });
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <Navbar isDark={isDark} toggleDark={toggleDark} isListView={isListView} toggleListView={toggleListView} />
      <Sidebar />
      <div className="content-area">
        <Form addNote={addNote} />
        <Notes
          notes={notes}
          isListView={isListView}
          deleteNote={deleteNote}
          toggleModal={toggleModal}
          setSelectedNote={setSelectedNote}
          colorNote={colorNote}
        />
      </div>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          selectedNote={selectedNote}
          toggleModal={toggleModal}
          editNote={editNote}
        />
      )}
    </div>
  );
}

export default App;
