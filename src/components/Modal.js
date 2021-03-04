import React from "react";
import "../styles/modal.css";

export default function Modal({state, children}) {
  return (
    <div id="modal-container" className={state}>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};
