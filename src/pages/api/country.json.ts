import countryData from '../../data/data.json';

export async function GET() {
  return new Response(JSON.stringify({ body: countryData }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
