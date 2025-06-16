import "../styles/FilterButtons.css";

export default function FilterButtons({
  options,
  selectedCategories,
  onChangeSelection,
}) {
  // Ensure options is always an array to avoid map errors
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
      <button
        key="clear-all"
        className={noneSelected ? "active" : ""}
        onClick={() => onChangeSelection([])}
      >
        Clear All
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          className={selectedCategories.includes(cat.category) ? "active" : ""}
          onClick={() => handleToggle(cat.category)}
        >
          {cat.label}
        </button>
      ))}
    </section>
  );
}
