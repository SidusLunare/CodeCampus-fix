import Select from 'react-select';
import '../styles/SortDropdown.css';
import { lowercaseFirst, setFilterLocalStorage, getFilterLocalStorage } from '../extra/functions';

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
    setFilterLocalStorage(option)
    
    onChange({
      value: option.value,
      label: `Gefilterd op ${lowercaseFirst(option.label)}`,
    })
  }

  const filterValueFunction = () => {
      options.find(o => o.value === value)
  }

  const filterPlaceholderFunction = () => {
    const fromLS = getFilterLocalStorage();
    if (fromLS !== null) {
      return fromLS.filter.label
    } else {
      return
    }
  }

  return (
    <div className="sort-container">
      <Select
        value={filterValueFunction()}
        onChange={filterOnChange}
        options={options}
        classNamePrefix="sort-select"
        unstyled
        isSearchable={false}
        placeholder={filterPlaceholderFunction()}
      />
    </div>
  );
}
