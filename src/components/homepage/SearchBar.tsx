import { useEffect, useRef, type FormEvent } from 'react';
import styles from './SeachBar.module.css';
import { setUrlParam, clearUrlParam } from '../../utils/urlParams';

import searchIcon from '../../assets/images/search_icon.svg';

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
      <img src={searchIcon.src} alt="Search icon" />
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
