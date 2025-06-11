import { useEffect, useState } from "react";
import "../styles/Dashboard.css";

import FilterTabs from "./FilterTabs";
import SearchBar from "./SearchBar";
import CourseList from "./CourseList";
import PopularCourses from "./PopularCourses";
import Statistics from "./Statistics";
import {
  capitalize,
  getFilterLocalStorage,
  lowercaseFirst,
} from "../extra/functions";
import { courses } from "../data/coursesData";

export default function Dashboard({ courseData, isLoading }) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState({
    value: "",
    label: "Selecteer filter in het dropdown menu",
  });
  const [categoriesFiltered, setCategoriesFiltered] = useState({});
  const fromLS = getFilterLocalStorage();

  useEffect(() => {
    if (fromLS !== null) {
      setSortField({
        value: fromLS.filter.value,
        label: `Gefilterd op ${lowercaseFirst(fromLS.filter.label)}`,
      });
    }
    return;
  }, [activeTab]);

  useEffect(() => {
    let categories = [];
    if (isLoading == false) {
      for (let i = 0; i < courses.length; i++) {
        let course = courses[i];
        course.categories.forEach((category) => {
          categories.push(category);
        });
      }
      const raw = Array.from(new Set(categories));
      setCategoriesFiltered(
        raw.map((obj, idx) => ({
          id: idx + 1,
          category: obj,
          label: capitalize(obj),
        }))
      );
    }
  }, []);

  console.log(categoriesFiltered);
  const filteredCourses = () => {
    if (!Array.isArray(courseData)) return [];
    let list;
    switch (activeTab) {
      case "beginner":
        list = courseData.filter((c) => c.level === "Beginner");
        break;
      case "gevorderd":
        list = courseData.filter((c) => c.level === "Gevorderd");
        break;
      case "filter by":
        list = [...courseData].sort((a, b) => {
          switch (sortField.value) {
            case "views":
              return b[sortField.value] - a[sortField.value];
            case "members":
              return b[sortField.value] - a[sortField.value];
            case "durationNum":
              return a[sortField.value] - b[sortField.value];
            default:
              return 0;
          }
        });
        break;
      default:
        list = courseData;
    }
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
      <header className="dashboard-header">
        <FilterTabs
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          sortField={sortField}
          onChangeSort={setSortField}
          categoriesFiltered={categoriesFiltered}
        />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </header>

      <div className="dashboard-content">
        <main className="main-content">
          <h2>
            {activeTab === "all" && "Alle Cursussen"}
            {activeTab === "beginner" && "Cursussen voor Beginners"}
            {activeTab === "gevorderd" && "Gevorderde Cursussen"}
            {activeTab === "filter by" && sortField.label}
          </h2>
          <CourseList courses={filteredCourses()} />
        </main>
        <aside className="sidebar">
          <PopularCourses courses={courseData} />
          <Statistics courses={courseData} />
        </aside>
      </div>
    </section>
  );
}
