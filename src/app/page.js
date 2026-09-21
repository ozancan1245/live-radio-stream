import { getTopRadios } from '@/services/radioApi';
import RadioList from '@/components/RadioList';

export default async function HomePage() {
  const initialRadios = await getTopRadios(25);

  return (
    <main className="min-h-screen bg-black text-white p-8 pb-32 max-w-7xl mx-auto">
      <header className="mb-8 border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-red-500">Live Radio Stream</h1>
        <p className="text-zinc-400 text-sm mt-1">Listen to thousands of live radio stations worldwide</p>
      </header>

      <RadioList initialRadios={initialRadios} />
    </main>
  );
}