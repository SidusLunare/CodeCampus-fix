// src/components/SearchBar.jsx
import '../styles/SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Search courses…' }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
