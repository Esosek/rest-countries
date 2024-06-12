import { useEffect, useRef, type FormEvent } from 'react';
import styles from './SeachBar.module.css';
import { setUrlParam, clearUrlParam } from '../../utils/urlParams';

type SearchBarProps = {
  onChange: (value: string) => void;
};

export default function SearchBar({ onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  let typingTimer: number;

  useEffect(() => {
    getFilter();
  }, []);

  function getFilter() {
    const searchFilter = new URL(document.URL).searchParams.get('search');
    if (searchFilter) {
      updateSearchFilter(searchFilter);
      inputRef.current!.value = searchFilter;
    }
  }

  function updateSearchFilter(value: string) {
    onChange(value);

    if (value === '') {
      clearUrlParam('search');
    } else {
      setUrlParam('search', value);
    }
  }

  function handleInputChange(event: FormEvent<HTMLInputElement>) {
    const inputValue = event.currentTarget.value;
    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      updateSearchFilter(inputValue);
    }, 500);
  }

  return (
    <div onClick={() => inputRef.current!.focus()} className={styles.searchBar}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          className={styles.searchIcon}
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
      </div>
      <label htmlFor="country-input" className="sr-only">
        Search for a country
      </label>
      <input
        ref={inputRef}
        id="country-input"
        type="text"
        className={styles.input}
        placeholder="Search for a country..."
        onInput={handleInputChange}
      />
    </div>
  );
}
