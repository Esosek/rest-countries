import styles from './Homepage.module.css';

import Header from '../header/Header';
import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';
import type { Country } from '../../types/country';
import CountryCard from './CountryCard';

type HomepageProps = {
  countries: Country[];
};

export default function Homepage({ countries }: HomepageProps) {
  countries.sort((a, b) => b.population - a.population);
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.flex}>
          <SearchBar />
          <RegionFilter />
        </div>
        <div className={styles.grid}>
          {countries.map((country) => (
            <CountryCard key={country.alpha3Code} country={country} />
          ))}
        </div>
      </main>
    </>
  );
}
