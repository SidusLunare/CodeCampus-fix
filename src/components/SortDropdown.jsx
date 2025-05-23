import Select from 'react-select';
import '../styles/SortDropdown.css';

export default function SortDropdown({ value, onChange }) {
    const filters = [
    { key: 'views', label: 'Totaal weergaven' },
    { key: 'members', label: 'Totaal leden' },
    { key: 'durationNum', label: 'Lengte (kort -> lang)' },
  ];

  const options = filters.map(filter => ({
    value: filter.key,
    label: filter.label,
  }));

  function lowercaseFirst(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  return (
    <div className="sort-container">
      <Select
        value={options.find(o => o.value === value)}
        onChange={option => onChange({
              value: option.value,
              label: `Gefilterd op ${lowercaseFirst(option.label)}`,
        })}
        options={options}
        classNamePrefix="sort-select"
        unstyled
        isSearchable={false}
      />
    </div>
  );
}
