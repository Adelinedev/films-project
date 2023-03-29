import React from "react";
import "./SelectBox.css";

function SelectBox({ selectedOption, options, onChange }) {
  return (
    <select value={selectedOption} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
