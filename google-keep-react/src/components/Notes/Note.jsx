import React, { useState, useRef, useEffect } from "react";

const NOTE_COLORS = [
  { label: "Default", value: "" },
  { label: "Coral", value: "#FAAFA8" },
  { label: "Peach", value: "#F39F76" },
  { label: "Sand", value: "#FFF8B8" },
  { label: "Mint", value: "#E2F6D3" },
  { label: "Sage", value: "#B4DDD3" },
  { label: "Fog", value: "#D4E4ED" },
  { label: "Storm", value: "#AECCDC" },
  { label: "Dusk", value: "#D3BFDB" },
  { label: "Blossom", value: "#F6E2DD" },
  { label: "Clay", value: "#E9E3D4" },
  { label: "Chalk", value: "#EFEFF1" },
];

function Note(props) {
  const { note, toggleModal, setSelectedNote, colorNote } = props;
  const [showColorPicker, setShowColorPicker] = useState(false);
  const noteRef = useRef(null);

  useEffect(() => {
    if (!showColorPicker) return;
    function handleClickOutside(event) {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showColorPicker]);

  const noteClickHandler = () => {
    toggleModal();
    setSelectedNote(note);
  };

  const deleteHandler = () => {
    props.deleteNote(note.id);
  };

  const colorPickerHandler = (e) => {
    e.stopPropagation();
    setShowColorPicker((p) => !p);
  };

  const selectColorHandler = (e, colorValue) => {
    e.stopPropagation();
    colorNote(note.id, colorValue);
    setShowColorPicker(false);
  };

  return (
    <div
      ref={noteRef}
      className={`note${note.color ? " note-colored" : ""}${showColorPicker ? " picker-open" : ""}`}
      id={props.id}
      onClick={noteClickHandler}
      style={{ backgroundColor: note.color || undefined }}
    >
      <span
        className="material-symbols-outlined check-circle"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        check_circle
      </span>
      <div className="title">{note.title}</div>
      <div className="text">{note.text}</div>

      {showColorPicker && (
        <div className="color-picker" onClick={(e) => e.stopPropagation()}>
          {NOTE_COLORS.map((c) => (
            <div key={c.value} className="tooltip color-swatch-tooltip">
              <button
                className={`color-swatch${(note.color || "") === c.value ? " selected" : ""}`}
                style={{ backgroundColor: c.value || "#ffffff" }}
                onClick={(e) => selectColorHandler(e, c.value)}
                type="button"
              />
              <span className="tooltip-text">{c.label}</span>
            </div>
          ))}
        </div>
      )}
      <div className="note-footer">
        <div className="tooltip" onClick={colorPickerHandler}>
          <span className="material-symbols-outlined hover small-icon">
            palette
          </span>
          <span className="tooltip-text">Background options</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover small-icon">
            add_alert
          </span>
          <span className="tooltip-text">Remind me</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover small-icon">
            person_add
          </span>
          <span className="tooltip-text">Collaborator</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover small-icon">
            image
          </span>
          <span className="tooltip-text">Add Image</span>
        </div>
        <div
          className="tooltip archive"
          onClick={(e) => {
            e.stopPropagation();
            deleteHandler();
          }}
        >
          <span className="material-symbols-outlined hover small-icon">
            archive
          </span>
          <span className="tooltip-text">Archive</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover small-icon">
            more_vert
          </span>
          <span className="tooltip-text">More</span>
        </div>
      </div>
    </div>
  );
}

export default Note;
