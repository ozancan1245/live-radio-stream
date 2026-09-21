'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold group-hover:bg-red-500 transition">
            📻
          </div>
          <span className="font-bold text-lg text-white tracking-wide">
            LiveRadioStream<span className="text-red-500">.net</span>
          </span>
        </Link>

        {/* Sağ Menü Linkleri */}
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/#explore" className="hover:text-white transition">
            Top Stations
          </Link>
          <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full font-semibold">
            LIVE 24/7
          </span>
        </nav>
      </div>
    </header>
  );
}