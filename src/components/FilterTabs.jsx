// src/components/FilterTabs.jsx
import SortDropdown from "./SortDropdown";
import "../styles/FilterTabs.css";
import FilterButtons from "./FilterButtons";

export default function FilterTabs({
  activeTab,
  onChangeTab,
  sortField,
  onChangeSort,
  categoriesFiltered,
  changeCategory,
  categorySelected
}) {
  const tabs = [
    { key: "all", label: "Alle Cursussen" },
    { key: "beginner", label: "Voor Beginners" },
    { key: "gevorderd", label: "Gevorderde" },
    { key: "filter by", label: "Filter by" },
  ];

  return (
    <nav className="filter">
      <div className="filter__tabs">
        <div className="filter__tabs__buttons">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={activeTab === tab.key ? "active" : ""}
              onClick={() => onChangeTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* “Meest Bekeken” becomes a dropdown trigger */}
        <div className="filter__tabs__dropdown-wrapper">
          {activeTab === "filter by" && (
            <SortDropdown value={sortField} onChange={onChangeSort} />
          )}
        </div>
      </div>
      <div className="filter__category">
        <FilterButtons
          options={categoriesFiltered}
          selectedCategories={categorySelected}
          onChangeSelection={changeCategory}
        />
      </div>
    </nav>
  );
}
