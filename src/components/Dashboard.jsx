import { useState } from 'react';
import '../styles/Dashboard.css';

import FilterTabs from './FilterTabs';
import SearchBar  from './SearchBar';
import CourseList from './CourseList';
import PopularCourses from './PopularCourses';
import Statistics   from './Statistics';

export default function Dashboard({ courseData }) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState({
    value: 'views',
    label: 'Totaal weergaven'
  });
  
  const filterSort = (x, y) => {
    switch (sortField.value) {
      case 'views':
        return y[sortField.value] - x[sortField.value];
      case 'members':
        return y[sortField.value] - x[sortField.value];
      case 'durationNum':
        return x[sortField.value] - y[sortField.value];
      default:
        return 0;
    }
  }


  const filteredCourses = () => {
    if (!Array.isArray(courseData)) return [];
    let list;
    switch (activeTab) {
      case 'beginner':
        list = courseData.filter(c => c.level === 'Beginner');
        break;
      case 'gevorderd':
        list = courseData.filter(c => c.level === 'Gevorderd');
        break;
      case 'filter by':
        list = [...courseData].sort((a, b) => {filterSort(a,b)});
        break;
      default:
        list = courseData;
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(c =>
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
        />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </header>

      <div className="dashboard-content">
        <main className="main-content">
          <h2>
            {activeTab === 'all'        && 'Alle Cursussen'}
            {activeTab === 'beginner'   && 'Cursussen voor Beginners'}
            {activeTab === 'gevorderd'  && 'Gevorderde Cursussen'}
            {activeTab === 'filter by'  &&  sortField.label}
          </h2>
          <CourseList courses={filteredCourses()} />
        </main>
        <aside className="sidebar">
          <PopularCourses courses={courseData} />
          <Statistics    courses={courseData} />
        </aside>
      </div>
    </section>
  );
}
