export type Country = {
  name: string;
  nativeName: string;
  alpha3Code: string;
  capital: string;
  topLevelDomain: string[];
  subregion: string;
  region: string;
  population: number;
  borders: string[];
  flags: {
    svg: string;
    png: string;
  };
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  flag: string;
  languages: { name: string; [key: string]: any }[];
  [key: string]: any; // Allow additional properties
};
