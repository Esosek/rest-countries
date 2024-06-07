import styles from './Homepage.module.css';

import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';
import type { Country } from '../../types/country';
import CountryCard from './CountryCard';
import { useEffect, useState } from 'react';

type HomepageProps = {
  countries: Country[];
};

export default function Homepage({ countries }: HomepageProps) {
  const [filteredCountries, setFilteredCountries] = useState(countries);

  countries.sort((a, b) => b.population - a.population);

  function handleFilterChange(filteredRegion: string) {
    setFilteredCountries(
      countries.filter((country) => country.region === filteredRegion)
    );
  }
  return (
    <main className={styles.main}>
      <div className={styles.flex}>
        <SearchBar />
        <RegionFilter countries={countries} onChange={handleFilterChange} />
      </div>
      <div className={styles.grid}>
        {filteredCountries.map((country) => (
          <CountryCard key={country.alpha3Code} country={country} />
        ))}
      </div>
    </main>
  );
}
