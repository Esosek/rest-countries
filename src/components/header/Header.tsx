import styles from './Header.module.css';
import ThemeSwitch from './ThemeSwitch';

type HeaderProps = {};

export default function Header(props: HeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.title}>Where in the world?</p>
      <ThemeSwitch />
    </header>
  );
}
