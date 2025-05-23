// src/components/FilterTabs.jsx
import SortDropdown from './SortDropdown';
import '../styles/FilterTabs.css';


export default function FilterTabs({
  activeTab,
  onChangeTab,
  sortField,
  onChangeSort,
}) {
  const tabs = [
    { key: 'all',       label: 'Alle Cursussen' },
    { key: 'beginner',  label: 'Voor Beginners' },
    { key: 'gevorderd', label: 'Gevorderde' },
    { key: 'filter by', label: 'Filter by'}
  ];

  return (
    <nav className="filter-tabs">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={activeTab === tab.key ? 'active' : ''}
          onClick={() => onChangeTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}

      {/* “Meest Bekeken” becomes a dropdown trigger */}
      <div className="filter-dropdown-wrapper">
        {activeTab === 'filter by' && (
          <SortDropdown value={sortField} onChange={onChangeSort} />
        )}
      </div>
    </nav>
  );
}
