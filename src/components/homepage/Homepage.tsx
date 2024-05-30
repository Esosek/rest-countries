import styles from './Homepage.module.css';

import Header from '../header/Header';
import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';

export default function Homepage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.flex}>
          <SearchBar />
          <RegionFilter />
        </div>
      </main>
    </>
  );
}
