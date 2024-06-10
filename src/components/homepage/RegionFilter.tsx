import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './RegionFilter.module.css';
import { setUrlParam, clearUrlParam } from '../../utils/urlParams';
import arrowUpIcon from '../../assets/images/arrow_up_icon.svg';
import type { Country } from '../../types/country';

type RegionFilterProps = {
  countries: Country[];
  onChange: (value: string) => void;
};

export default function RegionFilter({
  countries,
  onChange,
}: RegionFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('none');
  const selectRef = useRef<HTMLSelectElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getFilter();
  }, []);

  function getFilter() {
    const filter = new URL(document.URL).searchParams.get('filter');
    if (filter) {
      handleOptionSelect(filter);
    }
  }

  const regions = useMemo(() => {
    const regionSet = new Set<string>();
    countries.forEach((country) => regionSet.add(country.region));
    return Array.from(regionSet);
  }, [countries]);

  function toggleSelect() {
    setIsOpen(!isOpen);
  }

  function handleOptionSelect(selectedOption: string) {
    setSelectedOption(selectedOption);
    setIsOpen(false);
    onChange(selectedOption);

    if (selectedOption === 'none') {
      clearUrlParam('filter');
    } else {
      setUrlParam('filter', selectedOption);
    }

    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    }
  }

  return (
    <div className={styles.selectWrapper} onKeyDown={handleKeyDown}>
      <label htmlFor="filter-select" defaultValue="none" className="sr-only">
        Filter by Region
      </label>
      <select
        id="filter-select"
        ref={selectRef}
        onChange={(e) => handleOptionSelect(e.target.value)}
        value={selectedOption}
        className="sr-only"
      >
        <option value="none">None</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <div>
        <button
          ref={buttonRef}
          onClick={toggleSelect}
          className={styles.select}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby="filter-select"
        >
          <span>
            {selectedOption === 'none' ? 'Filter by Region' : selectedOption}
          </span>
          <svg
            className={styles.arrow}
            style={{ transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)' }}
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
          >
            <path d="M480-525 291-336l-51-51 240-240 240 240-51 51-189-189Z" />
          </svg>
        </button>
        {isOpen && (
          <ul
            className={styles.optionList}
            role="listbox"
            aria-activedescendant={selectedOption}
            tabIndex={-1}
            style={{ transform: isOpen ? 'scaleY(1)' : 'scaleY(0)' }}
          >
            <li>
              <button
                onClick={() => handleOptionSelect('none')}
                className={styles.option}
                role="option"
                aria-selected={selectedOption === 'none'}
              >
                None
              </button>
            </li>
            {regions.map((region) => (
              <li key={region}>
                <button
                  onClick={() => handleOptionSelect(region)}
                  className={styles.option}
                  role="option"
                  aria-selected={selectedOption === region}
                >
                  {region}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
