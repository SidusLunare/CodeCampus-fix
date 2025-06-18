// src/components/Dashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import "../styles/Dashboard.css";

import FilterTabs from "./FilterTabs";
import SearchBar from "./SearchBar";
import CourseList from "./CourseList";
import CourseDetails from "./CourseDetails";
import PopularCourses from "./PopularCourses";
import Statistics from "./Statistics";

import {
  capitalize,
  lowercaseFirst,
  getFilterLocalStorage,
  getCategoryLocalStorage,
  setCategoryLocalStorage,
  getSearchLocalStorage,
  setSearchLocalStorage,
  getTabLocalStorage,
  setTabLocalStorage,
  getFavoritesLocalStorage,
  setFavoritesLocalStorage,
} from "../extra/functions";
import { courses } from "../data/coursesData";

export default function Dashboard({ courseData = courses, isLoading }) {
  const [activeTab, setActiveTab] = useState(() => {
    const fromLS = getTabLocalStorage();
    return fromLS !== null ? fromLS : "all";
  });

  const [searchTerm, setSearchTerm] = useState(() => {
    const fromLS = getSearchLocalStorage();
    return fromLS !== null ? fromLS : "";
  });

  // your favorites list
  const [favoriteIds, setFavoriteIds] = useState(() => {
    return getFavoritesLocalStorage();
  });

  // NEW: whether we're filtering to only favorites
  const [favoriteFilter, setFavoriteFilter] = useState(false);

  const [sortField, setSortField] = useState({
    value: "",
    label: "Selecteer filter in het dropdown menu",
  });

  const [categoriesFiltered, setCategoriesFiltered] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState(() => {
    const fromLS = getCategoryLocalStorage();
    return Array.isArray(fromLS) ? fromLS : [];
  });

  const [selectedCourse, setSelectedCourse] = useState(null);

  // persist tab/search/category/favorites
  useEffect(() => {
    setTabLocalStorage(activeTab);
  }, [activeTab]);

  useEffect(() => {
    setSearchLocalStorage(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setCategoryLocalStorage(selectedCategories);
  }, [selectedCategories]);

  useEffect(() => {
    setFavoritesLocalStorage(favoriteIds);
  }, [favoriteIds]);

  // restore sort on tab-change
  useEffect(() => {
    const fromLS = getFilterLocalStorage();
    if (fromLS !== null) {
      setSortField({
        value: fromLS.filter.value,
        label: `Gefilterd op ${lowercaseFirst(fromLS.filter.label)}`,
      });
    }
  }, [activeTab]);

  // build unique categories
  useEffect(() => {
    if (!isLoading) {
      const allCats = courses.flatMap((c) => c.categories);
      const unique = Array.from(new Set(allCats));
      setCategoriesFiltered(
        unique.map((cat, i) => ({
          id: i + 1,
          category: cat,
          label: capitalize(cat),
        }))
      );
    }
  }, [isLoading]);

  // memoized toggle for favorites
  const toggleFavorite = useCallback((id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  }, []);

  // your combined filter logic
  const filteredCourses = () => {
    if (!Array.isArray(courseData)) return [];
    let list = [...courseData];

    // level-tabs
    if (activeTab === "beginner") {
      list = list.filter((c) => c.level === "Beginner");
    } else if (activeTab === "gevorderd") {
      list = list.filter((c) => c.level === "Gevorderd");
    } else if (activeTab === "filter by") {
      list = list.sort((a, b) => {
        switch (sortField.value) {
          case "views":
          case "members":
            return b[sortField.value] - a[sortField.value];
          case "duration":
            return parseInt(a.duration, 10) - parseInt(b.duration, 10);
          default:
            return 0;
        }
      });
    }

    // category‐filter
    if (selectedCategories.length > 0) {
      list = list.filter((c) =>
        c.categories.some((cat) => selectedCategories.includes(cat))
      );
    }

    // favorites‐filter
    if (favoriteFilter) {
      list = list.filter((c) => favoriteIds.includes(c.id));
    }

    // search‐filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(term) ||
          c.description.toLowerCase().includes(term)
      );
    }

    return list;
  };

  const filtered = filteredCourses();

  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <FilterTabs
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          sortField={sortField}
          onChangeSort={setSortField}
          categoriesFiltered={categoriesFiltered}
          changeCategory={setSelectedCategories}
          categorySelected={selectedCategories}
          favoriteFilter={favoriteFilter}
          onToggleFavoriteFilter={setFavoriteFilter}
        />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </header>

      <div className="dashboard__content">
        <main className="dashboard__content__main">
          <h2>
            {activeTab === "all" && "Alle Cursussen"}
            {activeTab === "beginner" && "Cursussen voor Beginners"}
            {activeTab === "gevorderd" && "Gevorderde Cursussen"}
            {activeTab === "filter by" && sortField.label}
            {favoriteFilter && " (Favorites)"}
          </h2>

          <CourseList
            courses={filtered}
            onSelectCourse={setSelectedCourse}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />

          <CourseDetails
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        </main>

        <aside className="dashboard__content__sidebar">
          <PopularCourses courses={courseData} />
          <Statistics courses={courseData} />
        </aside>
      </div>
    </section>
  );
}
