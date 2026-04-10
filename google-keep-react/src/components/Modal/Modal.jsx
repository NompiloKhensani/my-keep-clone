import React from "react";
import "./Modal.css";
import Form from "../Form/Form";

function Modal(props) {
  const { isModalOpen, selectedNote, toggleModal, editNote } = props;

  const handleOverlayClick = () => {
    toggleModal();
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`modal ${isModalOpen ? "open-modal" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal-content" onClick={handleModalContentClick}>
        <Form
          selectedNote={selectedNote}
          toggleModal={toggleModal}
          editNote={editNote}
          edit
        />
      </div>
    </div>
  );
}

export default Modal;