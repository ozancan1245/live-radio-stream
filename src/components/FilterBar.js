'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FilterBar({ onSearch, onSelectGenre }) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  const handleCountryClick = (code) => {
    if (!code) {
      router.push('/');
    } else {
      router.push(`/country/${code.toLowerCase()}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
      {/* Arama Çubuğu */}
      <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
        <input 
          type="text" 
          placeholder="Search radio by name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-800 text-white placeholder-zinc-500 px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-red-500 text-sm"
        />
        <button 
          type="submit" 
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
        >
          Search
        </button>
      </form>

      {/* Ülke Filtresi (Yönlendirmeli) */}
      <div className="flex gap-2 items-center overflow-x-auto pb-1 md:pb-0">
        <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Countries:</span>
        <button onClick={() => handleCountryClick('')} className="bg-zinc-800 hover:bg-zinc-700 text-xs text-white px-3 py-1.5 rounded-md border border-zinc-700">Global</button>
        <button onClick={() => handleCountryClick('tr')} className="bg-zinc-800 hover:bg-zinc-700 text-xs text-white px-3 py-1.5 rounded-md border border-zinc-700">🇹🇷 TR</button>
        <button onClick={() => handleCountryClick('us')} className="bg-zinc-800 hover:bg-zinc-700 text-xs text-white px-3 py-1.5 rounded-md border border-zinc-700">🇺🇸 US</button>
        <button onClick={() => handleCountryClick('de')} className="bg-zinc-800 hover:bg-zinc-700 text-xs text-white px-3 py-1.5 rounded-md border border-zinc-700">🇩🇪 DE</button>
        <button onClick={() => handleCountryClick('gb')} className="bg-zinc-800 hover:bg-zinc-700 text-xs text-white px-3 py-1.5 rounded-md border border-zinc-700">🇬🇧 UK</button>
      </div>

      {/* Tür Filtresi */}
      <div className="flex gap-2 items-center overflow-x-auto pb-1 md:pb-0">
        <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Genres:</span>
        <button onClick={() => onSelectGenre('pop')} className="bg-zinc-800 hover:bg-zinc-700 text-xs text-white px-3 py-1.5 rounded-md border border-zinc-700">Pop</button>
        <button onClick={() => onSelectGenre('rock')} className="bg-zinc-800 hover:bg-zinc-700 text-xs text-white px-3 py-1.5 rounded-md border border-zinc-700">Rock</button>
        <button onClick={() => onSelectGenre('jazz')} className="bg-zinc-800 hover:bg-zinc-700 text-xs text-white px-3 py-1.5 rounded-md border border-zinc-700">Jazz</button>
        <button onClick={() => onSelectGenre('news')} className="bg-zinc-800 hover:bg-zinc-700 text-xs text-white px-3 py-1.5 rounded-md border border-zinc-700">News</button>
      </div>
    </div>
  );
}