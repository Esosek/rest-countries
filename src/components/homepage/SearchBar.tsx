import styles from './SeachBar.module.css';

import searchIcon from '../../assets/images/search_icon.svg';
import { useRef } from 'react';

type SearchBarProps = {
  onChange: (value: string) => void;
};

export default function SearchBar({ onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
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
        onInput={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
}
