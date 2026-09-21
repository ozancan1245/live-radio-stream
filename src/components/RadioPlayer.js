'use client';

export default function RadioPlayer({ currentStation }) {
  if (!currentStation) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 text-white p-4 border-t border-zinc-800 flex items-center justify-between z-50">
      <div className="flex items-center gap-4">
        <img 
          src={currentStation.favicon || 'https://via.placeholder.com/48'} 
          alt={currentStation.name}
          className="w-12 h-12 rounded object-cover"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/48'; }}
        />
        <div>
          <h4 className="font-bold text-sm">{currentStation.name}</h4>
          <p className="text-xs text-zinc-400">{currentStation.country}</p>
        </div>
      </div>

      <audio 
        controls 
        autoPlay 
        src={currentStation.url_resolved || currentStation.url} 
        className="w-1/2 max-w-md h-10"
      />
    </div>
  );
}