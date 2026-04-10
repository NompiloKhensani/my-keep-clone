import "./Notes.css";
import Note from "./Note";

function Notes (props) {
  const { notes, isListView, deleteNote, toggleModal, setSelectedNote, colorNote } = props;

    return (
      <>
        {notes.length === 0 ? (
          <div className="empty-notes">
            <span className="material-symbols-outlined empty-lightbulb">lightbulb_2</span>
            <p>Notes that you add appear here</p>
          </div>
        ) : (
          <div className={`notes${isListView ? " notes-list" : ""}`}>
            {notes.map((note, index) => (
              <Note
                key={index}
                note={note}
                deleteNote={deleteNote}
                toggleModal={toggleModal}
                setSelectedNote={setSelectedNote}
                colorNote={colorNote}
              />
            ))}
          </div>
        )}
      </>
    );
}

export default Notes;