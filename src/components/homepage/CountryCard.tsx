import styles from './CountryCard.module.css';
import type { Country } from '../../types/country';

type CountryCardProps = {
  country: Country;
};

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <a
      href={`/rest-countries/country/${country.alpha3Code.toLowerCase()}`}
      className={styles.card}
    >
      <img
        src={country.flag}
        alt={`Flag of ${country.name}`}
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{country.name}</h2>
        <p>
          <span className={styles.stronger}>Population: </span>
          {country.population.toLocaleString('en-US')}
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
    </a>
  );
}
