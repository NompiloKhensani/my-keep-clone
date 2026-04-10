import React, { useState, useRef, useEffect } from "react";
import "./Form.css";
import { uid } from "uid";

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

function Form(props) {
  const { edit, selectedNote, toggleModal } = props;
  const [title, setTitle] = useState((edit && selectedNote.title) || "");
  const [text, setText] = useState((edit && selectedNote.text) || "");
  const [isActiveForm, setIsActiveForm] = useState(edit);
  const [color, setColor] = useState((edit && selectedNote.color) || "");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const formRef = useRef(null);
  const titleRef = useRef(title);
  const textRef = useRef(text);
  const colorRef = useRef(color);
  const textareaRef = useRef(null);

  // Keep refs in sync with state so unmount cleanup has latest values
  useEffect(() => {
    titleRef.current = title;
  }, [title]);
  useEffect(() => {
    textRef.current = text;
  }, [text]);
  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  // Save edits on unmount when in edit mode (handles overlay click closing modal)
  useEffect(() => {
    if (!edit) return;
    return () => {
      props.editNote({
        id: selectedNote.id,
        title: titleRef.current,
        text: textRef.current,
        color: colorRef.current,
      });
    };
  }, []);

  // Handle click outside to close form and add note (only for main form, not edit modal)
  useEffect(() => {
    if (edit || !isActiveForm) return;

    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        if (text.trim() !== "") {
          props.addNote({
            id: uid(),
            title,
            text,
            color,
          });
        }
        setIsActiveForm(false);
        setTitle("");
        setText("");
        setColor("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActiveForm, edit, text, title, color, props]);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const textChangeHandler = (event) => {
    setText(event.target.value);
    // Auto-resize textarea
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
    if (!edit) {
      setIsActiveForm(true);
    }
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!edit) {
      if (text.trim() !== "") {
        props.addNote({
          id: uid(),
          title,
          text,
          color,
        });
      }
      setIsActiveForm(false);
    } else {
      // Just close modal — edits are saved on unmount
      toggleModal();
    }

    setTitle("");
    setText("");
    setColor("");
  };

  const formClickHandler = () => {
    if (!edit) {
      setIsActiveForm(true);
    }
    setShowColorPicker(false);
  };

  return (
    <div>
      <div
        className={`form-container${color ? " form-colored" : ""}`}
        onClick={formClickHandler}
        ref={formRef}
        style={{ backgroundColor: color || undefined }}
      >
        <form
          onSubmit={submitFormHandler}
          className={isActiveForm ? "form" : ""}
        >
          {isActiveForm && (
            <input
              onChange={titleChangeHandler}
              value={title}
              type="text"
              className="note-title"
              placeholder="Title"
            />
          )}
          <textarea
            ref={textareaRef}
            onChange={textChangeHandler}
            value={text}
            className="note-text"
            placeholder="Take a note..."
            rows={1}
          />

          {isActiveForm && showColorPicker && (
            <div className="color-picker" onClick={(e) => e.stopPropagation()}>
              {NOTE_COLORS.map((c) => (
                <div key={c.value} className="tooltip color-swatch-tooltip">
                  <button
                    className={`color-swatch${color === c.value ? " selected" : ""}`}
                    style={{ backgroundColor: c.value || "#ffffff" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setColor(c.value);
                      setShowColorPicker(false);
                    }}
                    type="button"
                  />
                  <span className="tooltip-text">{c.label}</span>
                </div>
              ))}
            </div>
          )}
          {isActiveForm ? (
            <div className="form-actions">
              <div className="icons">
                <div className="tooltip">
                  <span className="material-symbols-outlined hover small-icon">
                    format_color_text
                  </span>
                  <span className="tooltip-text">Formatting options</span>
                </div>
                <div
                  className="tooltip"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowColorPicker((p) => !p);
                  }}
                >
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
                <div className="tooltip">
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
                <div className="tooltip">
                  <span className="material-symbols-outlined hover small-icon not-allowed">
                    undo
                  </span>
                  <span className="tooltip-text">Undo</span>
                </div>
                <div className="tooltip">
                  <span className="material-symbols-outlined hover small-icon not-allowed">
                    redo
                  </span>
                  <span className="tooltip-text">Redo</span>
                </div>
              </div>
              <button type="submit" className="close-btn">
                Close
              </button>
            </div>
          ) : (
            <div className="form-actions">
              <div className="tooltip">
                <span className="material-symbols-outlined hover">
                  check_box
                </span>
                <span className="tooltip-text">New List</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover">brush</span>
                <span className="tooltip-text">New note with drawing</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover">image</span>
                <span className="tooltip-text">New note with image</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
