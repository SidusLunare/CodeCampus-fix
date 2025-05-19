import React from 'react';
import '../styles/SortDropdown.css';

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="sort-container">
      <select
        className="sort-select"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="views">Totaal weergaven</option>
        <option value="members">Totaal leden</option>
        <option value="rating">Gemiddelde beoordeling</option>
      </select>
    </div>
  );
}
