import Select from 'react-select';
import '../styles/SortDropdown.css';

export default function SortDropdown({ value, onChange }) {
    const tabs = [
    { key: 'views', label: 'Totaal weergaven' },
    { key: 'members', label: 'Totaal leden' },
    { key: 'rating', label: 'Gemiddelde beoordeling' },
  ];

  const options = tabs.map(tab => ({
    value: tab.key,
    label: tab.label,
  }));

  return (
    <div className="sort-container">
      {/* <select
        className="sort-select"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
      </select> */}
      <Select
      value={options.find(o => o.value === value)}
      onChange={option => onChange(option.value)}
      options={options}
      classNamePrefix="sort-select"
      />
    </div>
  );
}
