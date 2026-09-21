'use client';

import { useState } from 'react';
import RadioPlayer from './RadioPlayer';
import FilterBar from './FilterBar';
import { searchRadios, getRadiosByCountry, getRadiosByGenre, getTopRadios } from '@/services/radioApi';

export default function RadioList({ initialRadios }) {
  const [radios, setRadios] = useState(initialRadios);
  const [currentStation, setCurrentStation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query) {
      const top = await getTopRadios(25);
      setRadios(top);
      return;
    }
    setLoading(true);
    const results = await searchRadios(query);
    setRadios(results);
    setLoading(false);
  };

  return (
    <>
      <FilterBar onSearch={handleSearch} />

      {loading ? (
        <div className="text-center py-20 text-zinc-500 animate-pulse font-medium">
          Loading radio stations...
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {radios.map((station) => {
            const hasValidFavicon = station.favicon && station.favicon.startsWith('http');
            const firstLetter = station.name ? station.name.charAt(0).toUpperCase() : 'R';

            return (
              <div 
                key={station.stationuuid} 
                onClick={() => setCurrentStation(station)}
                className="bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 hover:border-red-500 hover:bg-zinc-800/80 transition-all cursor-pointer flex flex-col justify-between group shadow-lg"
              >
                <div className="w-full h-32 rounded-lg bg-zinc-800 flex items-center justify-center mb-3 overflow-hidden relative border border-zinc-800/80 group-hover:scale-[1.02] transition-transform">
                  {hasValidFavicon ? (
                    <img 
                      src={station.favicon} 
                      alt={station.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}

                  {/* Logosu olmayan veya kırık olan radyolar için özel renkli Kapak Tasarımı */}
                  <div 
                    className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-900/60 via-zinc-900 to-black p-2 text-center ${hasValidFavicon ? 'hidden' : 'flex'}`}
                  >
                    <span className="text-4xl font-extrabold text-red-500/80 mb-1 group-hover:scale-110 transition-transform select-none">
                      {firstLetter}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest line-clamp-1 px-2">
                      {station.tags ? station.tags.split(',')[0] : 'RADIO'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-sm truncate text-zinc-100 group-hover:text-red-400 transition-colors">
                    {station.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-zinc-400 truncate max-w-[70%]">
                      {station.country || 'Global'}
                    </span>
                    {station.bitrate > 0 && (
                      <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700">
                        {station.bitrate}k
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <RadioPlayer currentStation={currentStation} />
    </>
  );
}