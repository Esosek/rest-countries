import type { Country } from '../../types/country';

type CountryCardProps = {
  country: Country;
};

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <div>
      <p>{country.alpha3Code}</p>
    </div>
  );
}
