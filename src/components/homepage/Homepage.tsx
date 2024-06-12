import styles from './Homepage.module.css';

import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';
import type { Country } from '../../types/country';
import CountryCard from './CountryCard';
import { useReducer } from 'react';
import Header from '../header/Header';
import ThemeContextProvider from '../../context/Theme';

type HomepageProps = {
  countries: Country[];
};

enum CountriesActionKind {
  SET_REGION_FILTER = 'setRegionFilter',
  SET_SEARCH_FILTER = 'setSearchFilter',
}

type CountriesState = {
  initialCountries: Country[];
  currentCountries: Country[];
  regionFilter: string;
  searchFilter: string;
};

type CountriesAction = {
  type: CountriesActionKind;
  payload: string;
};

function filterReducer(state: CountriesState, action: CountriesAction) {
  const { type, payload } = action;

  let updatedCountries = [...state.initialCountries];

  switch (type) {
    case CountriesActionKind.SET_REGION_FILTER:
      if (payload !== 'none') {
        updatedCountries = updatedCountries.filter(
          (country) => country.region === payload
        );
      }
      updatedCountries = updatedCountries.filter((country) =>
        country.name.toLowerCase().includes(state.searchFilter)
      );

      return {
        ...state,
        currentCountries: updatedCountries,
        regionFilter: payload,
      };

    case CountriesActionKind.SET_SEARCH_FILTER:
      if (state.regionFilter !== 'none') {
        updatedCountries = updatedCountries.filter(
          (country) => country.region === state.regionFilter
        );
      }
      updatedCountries = updatedCountries.filter((country) =>
        country.name.toLowerCase().includes(payload.toLowerCase())
      );

      return {
        ...state,
        currentCountries: updatedCountries,
        searchFilter: payload.toLowerCase(),
      };
    default:
      return state;
  }
}

export default function Homepage(props: HomepageProps) {
  const sortedCountries = [...props.countries].sort(
    (a, b) => b.population - a.population
  );
  const [state, dispatch] = useReducer(filterReducer, {
    initialCountries: sortedCountries,
    currentCountries: sortedCountries,
    searchFilter: '',
    regionFilter: 'none',
  });

  function handleSearchChange(searchText: string) {
    dispatch({
      type: CountriesActionKind.SET_SEARCH_FILTER,
      payload: searchText,
    });
  }

  function handleFilterChange(region: string) {
    dispatch({ type: CountriesActionKind.SET_REGION_FILTER, payload: region });
  }
  return (
    <ThemeContextProvider>
      <Header />
      <main className={styles.main}>
        <div className={styles.flex}>
          <SearchBar onChange={handleSearchChange} />
          <RegionFilter
            countries={props.countries}
            onChange={handleFilterChange}
          />
        </div>
        {props.countries.length > 0 ? (
          <div className={styles.grid}>
            {state.currentCountries.map((country) => (
              <CountryCard key={country.alpha3Code} country={country} />
            ))}
          </div>
        ) : (
          <div className={styles.errorMessage}>
            <p>Sorry, something went wrong. Try again later.</p>
          </div>
        )}
      </main>
    </ThemeContextProvider>
  );
}
