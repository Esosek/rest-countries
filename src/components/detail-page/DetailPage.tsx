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
    ['Native Name', country.nativeName ?? ''],
    ['Population', country.population.toLocaleString('en-US') ?? ''],
    ['Region', country.region ?? ''],
    ['Sub Region', country.subregion ?? ''],
    ['Capital', country.capital ?? ''],
    ['Top Level Domain', country.topLevelDomain?.join(', ')],
    ['Currencies', country.currencies?.map((cur) => cur.name).join(', ')],
    ['Languages', country.languages?.map((lang) => lang.name).join(', ')],
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
      <div className={styles.content}>
        <img src={country.flag} alt={`Flag of ${country.name}`} />
        <div>
          <h1>{country.name}</h1>
          <ul className={styles.grid}>
            {ATTRIBUTES.map(([key, value]) => (
              <li key={key} className={styles.light}>
                <span className={styles.label}>{key}: </span>
                {value}
              </li>
            ))}
          </ul>

          <ul className={styles.borders}>
            <h2 className={styles.label}>Border Countries:</h2>
            {country.borders?.map((border) => {
              const countryName = getCountryNameByCode(border);
              return countryName === undefined ? null : (
                <li key={border}>
                  <Button
                    isLink={true}
                    href={`/country/${border.toLowerCase()}`}
                  >
                    {countryName}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
