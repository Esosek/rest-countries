import styles from './DetailPage.module.css';
import type { Country } from '../../types/country';
import Button from '../Button';
import countryData from '../../data/data.json';
import backIcon from '../../assets/images/back_icon.svg';

type DetailPageProps = {
  country: Country;
};

export default function DetailPage({ country }: DetailPageProps) {
  const ATTRIBUTES = [
    ['Native Name', country.nativeName],
    ['Population', country.population.toLocaleString('en-US')],
    ['Region', country.region],
    ['Sub Region', country.subregion],
    ['Capital', country.capital],
    ['Top Level Domain', country.topLevelDomain.join(', ')],
    ['Currencies', country.currencies.map((cur) => cur.name).join(', ')],
    ['Languages', country.languages.map((lang) => lang.name).join(', ')],
  ];

  function handleBackButton() {
    window.history.back();
  }

  function getCountryNameByCode(code: string) {
    const country = countryData.find((c) => c.alpha3Code === code);
    if (country === undefined) {
      return null;
    } else return country.name;
  }

  return (
    <main className={styles.main}>
      <Button onClick={handleBackButton}>
        <div className={styles.backButton}>
          <img src={backIcon.src} alt="Back icon" />
          Back
        </div>
      </Button>
      <div className={styles.flex}>
        <img src={country.flag} alt={`Flag of ${country.name}`} />
        <div>
          <h1>{country.name}</h1>
          <ul className={styles.grid}>
            {ATTRIBUTES.map(([key, value]) => (
              <li key={key}>
                <span className={styles.label}>{key}: </span>
                {value}
              </li>
            ))}
          </ul>
          <ul className={styles.borders}>
            <li className={styles.label}>Border Countries:</li>
            {country.borders.map((border) => {
              const countryName = getCountryNameByCode(border);
              return countryName === undefined ? null : (
                <li key={border}>
                  <a href={`/country/${border.toLowerCase()}`}>{countryName}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
