import React from "react";
import "../styles/button.css";

export default function Button({
  norm, name, description, click
}) {
  return (
    <button 
      id="button"
      type={norm} 
      className={name}
      onClick={click}
    >
      {description}
    </button>
  );
};
