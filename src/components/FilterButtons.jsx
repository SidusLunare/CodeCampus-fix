// src/components/FilterButtons.jsx
import React from "react";
import "../styles/FilterButtons.css";

export default function FilterButtons({
  options = [],
  selectedCategories = [],
  onChangeSelection = () => {},
  favoriteFilterActive = false,
  onToggleFavoriteFilter = () => {},
}) {
  const categories = Array.isArray(options) ? options : [];

  const handleToggle = (category) => {
    if (selectedCategories.includes(category)) {
      onChangeSelection(selectedCategories.filter((c) => c !== category));
    } else {
      onChangeSelection([...selectedCategories, category]);
    }
  };

  const noneSelected = selectedCategories.length === 0;

  return (
    <section className="filter__category__buttons">
      {/* Clear all (resets both categories & favorites) */}
      <button
        key="clear-all"
        className={!favoriteFilterActive && noneSelected ? "active" : ""}
        onClick={() => {
          onChangeSelection([]);
          onToggleFavoriteFilter(false);
        }}
      >
        Clear All
      </button>

      <button
        key="favorite-filter"
        className={favoriteFilterActive ? "active" : ""}
        onClick={() => onToggleFavoriteFilter((prev) => !prev)}
      >
        ★ Favorites
      </button>


      {/* Your existing category buttons */}
      {categories.map((cat) => {
        const isActive = selectedCategories.includes(cat.category);
        return (
          <button
            key={cat.id}
            className={isActive ? "active" : ""}
            onClick={() => handleToggle(cat.category)}
          >
            {cat.label}
          </button>
        );
      })}
    </section>
  );
}
