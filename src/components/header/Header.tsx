import ThemeContextProvider from '../../context/Theme';
import styles from './Header.module.css';
import ThemeSwitch from './ThemeSwitch';

export default function Header() {
  return (
    <ThemeContextProvider>
      <header className={styles.header}>
        <p className={styles.title}>Where in the world?</p>
        <ThemeSwitch />
      </header>
    </ThemeContextProvider>
  );
}
