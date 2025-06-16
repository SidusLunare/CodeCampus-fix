// src/components/Dashboard.jsx
import { useEffect, useState } from "react";
import "../styles/Dashboard.css";

import FilterTabs from "./FilterTabs";
import SearchBar from "./SearchBar";
import CourseList from "./CourseList";
import PopularCourses from "./PopularCourses";
import Statistics from "./Statistics";

import {
  capitalize,
  lowercaseFirst,
  getFilterLocalStorage,
  getCategoryLocalStorage,
  setCategoryLocalStorage,
} from "../extra/functions";
import { courses } from "../data/coursesData";

export default function Dashboard({ courseData, isLoading }) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState({
    value: "",
    label: "Selecteer filter in het dropdown menu",
  });
  const [categoriesFiltered, setCategoriesFiltered] = useState([]);

  // Lees bij init geselecteerde categories uit localStorage of val terug op lege array
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const fromLS = getCategoryLocalStorage();
    return Array.isArray(fromLS) ? fromLS : [];
  });

  // Sla wijzigingen in selectie op
  useEffect(() => {
    setCategoryLocalStorage(selectedCategories);
  }, [selectedCategories]);

  // Lees sort-filter uit LS (onafhankelijk van categorieën)
  useEffect(() => {
    const fromLS = getFilterLocalStorage();
    if (fromLS !== null) {
      setSortField({
        value: fromLS.filter.value,
        label: `Gefilterd op ${lowercaseFirst(fromLS.filter.label)}`,
      });
    }
  }, [activeTab]);

  // Bouw lijst van unieke categorieën
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

  // Filter-logica
  const filteredCourses = () => {
    if (!Array.isArray(courseData)) return [];

    let list = [...courseData];

    // 1) level-tabs
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
          case "durationNum":
            return a.durationNum - b.durationNum;
          default:
            return 0;
        }
      });
    }
    // bij "all" niks doen

    // 2) categorieën (OR-match)
    if (selectedCategories.length > 0) {
      list = list.filter((c) =>
        c.categories.some((cat) => selectedCategories.includes(cat))
      );
    }

    // 3) zoekterm
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
          </h2>
          <CourseList courses={filteredCourses()} />
        </main>
        <aside className="dashboard_content__sidebar">
          <PopularCourses courses={courseData} />
          <Statistics courses={courseData} />
        </aside>
      </div>
    </section>
  );
}
