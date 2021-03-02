import React from "react";
import "../styles/select.css";

export default function Select({
  label, name, options, ...props 
}) {
  return (
    <div className="select-block">
      <label htmlFor={name} {...props}>
        {label}
      </label>
      <select id={name} {...props}>
        <option value="" disabled hidden>
          Selecione uma opção
        </option>
        {options.map((option) => {
          return (
            <option 
              key={option.value} 
              value={option.value}
              className="option-select"
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
