import styles from './Homepage.module.css';

import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';
import type { Country } from '../../types/country';
import CountryCard from './CountryCard';

type HomepageProps = {
  countries: Country[];
};

export default function Homepage({ countries }: HomepageProps) {
  countries.sort((a, b) => b.population - a.population);

  function handleFilterChange(value: string) {}
  return (
    <main className={styles.main}>
      <div className={styles.flex}>
        <SearchBar />
        <RegionFilter countries={countries} onChange={handleFilterChange} />
      </div>
      <div className={styles.grid}>
        {countries.map((country) => (
          <CountryCard key={country.alpha3Code} country={country} />
        ))}
      </div>
    </main>
  );
}
