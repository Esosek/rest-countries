import { useRef, useState } from 'react';

import styles from './RegionFilter.module.css';
import arrowUpIcon from '../../assets/images/arrow_up_icon.svg';

type RegionFilterProps = {};

export default function RegionFilter(props: RegionFilterProps) {
  const REGIONS = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('none');
  const selectRef = useRef(null);

  function toggleSelect() {
    setIsOpen(!isOpen);
  }

  function handleOptionSelect(selectedOption: string) {
    setSelectedOption(selectedOption);
    setIsOpen(false);

    if (selectedOption === 'none') {
      clearUrlParam('filter');
    } else {
      setUrlParam('filter', selectedOption);
    }
  }

  function setUrlParam(key: string, value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState(null, '', url.toString());
  }

  function clearUrlParam(key: string) {
    const url = new URL(window.location.href);
    url.searchParams.delete(key);
    window.history.replaceState(null, '', url.toString());
  }

  return (
    <div className={styles.selectWrapper}>
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
        {REGIONS.map((region) => {
          return (
            <option key={region} value={region}>
              {region}
            </option>
          );
        })}
      </select>
      <div>
        <button
          onClick={toggleSelect}
          className={styles.select}
          aria-hidden={true}
        >
          <span>
            {selectedOption === 'none' ? 'Filter by Region' : selectedOption}
          </span>
          <img
            src={arrowUpIcon.src}
            alt="Arrow icon"
            className={styles.arrow}
            style={{
              rotate: isOpen ? '-180deg' : '0deg',
            }}
          />
        </button>
        <ul
          className={styles.optionList}
          style={{ transform: isOpen ? 'scaleY(1)' : 'scaleY(0)' }}
        >
          <li>
            <button
              onClick={() => handleOptionSelect('none')}
              className={styles.option}
            >
              None
            </button>
          </li>
          {REGIONS.map((region) => {
            return (
              <li>
                <button
                  onClick={() => handleOptionSelect(region)}
                  className={styles.option}
                >
                  {region}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
