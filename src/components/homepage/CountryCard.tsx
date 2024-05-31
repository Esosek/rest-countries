import styles from './CountryCard.module.css';
import type { Country } from '../../types/country';

type CountryCardProps = {
  country: Country;
};

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>{country.name}</h2>
        <p>
          <span className={styles.stronger}>Population: </span>
          {country.population}
        </p>
        <p>
          <span className={styles.stronger}>Region: </span>
          {country.region}
        </p>
        {country.capital && (
          <p>
            <span className={styles.stronger}>Capital: </span>
            {country.capital}
          </p>
        )}
      </div>
    </div>
  );
}
