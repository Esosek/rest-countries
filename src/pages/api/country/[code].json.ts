import type { APIContext } from 'astro';
import countryData from '../../../data/data.json';

export async function GET({ params }: APIContext) {
  const selectedCountry = countryData.filter(
    (country) => country.alpha3Code.toLocaleLowerCase() === params.code
  );
  return new Response(JSON.stringify({ body: selectedCountry }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export function getStaticPaths() {
  return countryData.map((country) => ({
    params: {
      code: country.alpha3Code.toLocaleLowerCase(),
    },
  }));
}
