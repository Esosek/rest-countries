import ThemeContextProvider from '../../context/Theme';
import styles from './Header.module.css';
import ThemeSwitch from './ThemeSwitch';

export default function Header() {
  return (
    <ThemeContextProvider>
      <header className={styles.header}>
        <a href="/rest-countries" className={styles.title}>
          Where in the world?
        </a>
        <ThemeSwitch />
      </header>
    </ThemeContextProvider>
  );
}
