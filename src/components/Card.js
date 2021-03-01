import React from "react";
import "../styles/card.css";

export default function Card({ 
  cardName, description, id, valueOptions, children 
}) {
  return (
    <div className={cardName}>
      <div>
        <h3>
          <span>{description}</span>
        </h3>
        <p id={id}>{valueOptions}</p>
      </div>
      {children}
    </div>
  );
}
