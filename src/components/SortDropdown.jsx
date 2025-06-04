import Select from 'react-select';
import '../styles/SortDropdown.css';
import { lowercaseFirst } from '../extra/functions';

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

  const filterOnChange = (option) => {

    onChange({
      value: option.value,
      label: `Gefilterd op ${lowercaseFirst(option.label)}`,
    })
  }

  const filterValue = () => {
    
    options.find(o => o.value === value)
  }

  return (
    <div className="sort-container">
      <Select
        value={filterValue()}
        onChange={filterOnChange}
        options={options}
        classNamePrefix="sort-select"
        unstyled
        isSearchable={false}
      />
    </div>
  );
}
