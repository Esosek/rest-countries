import styles from './Header.module.css';
import ThemeSwitch from './ThemeSwitch';

type HeaderProps = {};

export default function Header(props: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Where in the world?</h1>
      <ThemeSwitch />
    </header>
  );
}
