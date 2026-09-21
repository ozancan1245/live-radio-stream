import { getRadiosByCountry } from '@/services/radioApi';
import RadioList from '@/components/RadioList';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const code = resolvedParams?.code || '';
  const countryName = code.toUpperCase();

  return {
    title: `Live Radio Stations in ${countryName} - Live Radio Stream`,
    description: `Listen to top online radio stations from ${countryName} live for free on LiveRadioStream.net.`,
  };
}

export default async function CountryPage({ params }) {
  const resolvedParams = await params;
  const code = resolvedParams?.code || '';
  const radios = await getRadiosByCountry(code, 30);

  return (
    <main className="min-h-screen bg-black text-white p-8 pb-32 max-w-7xl mx-auto">
      <header className="mb-8 border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-red-500 uppercase">
          Live Radios: {code}
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Explore top streaming radio stations from {code ? code.toUpperCase() : 'GLOBAL'}
        </p>
      </header>

      <RadioList initialRadios={radios} />
    </main>
  );
}