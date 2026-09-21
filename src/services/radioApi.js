const API_BASE_URL = 'https://de1.api.radio-browser.info/json';

// En çok oy alan popüler radyoları çeker
export async function getTopRadios(limit = 30) {
  const res = await fetch(`${API_BASE_URL}/stations/topvote/${limit}`, {
    next: { revalidate: 3600 } // 1 saat önbellek
  });
  return res.json();
}

// İsimle radyo arama
export async function searchRadios(query) {
  if (!query) return [];
  const res = await fetch(`${API_BASE_URL}/stations/byname/${encodeURIComponent(query)}?limit=25`);
  return res.json();
}

// Ülke koduna göre radyo çekme (Örn: TR, US, DE)
export async function getRadiosByCountry(countryCode, limit = 25) {
  const res = await fetch(`${API_BASE_URL}/stations/bycountrycodeexact/${countryCode}?limit=${limit}`);
  return res.json();
}

// Müzik türüne (Tag) göre radyo çekme (Örn: pop, rock, jazz)
export async function getRadiosByGenre(genre, limit = 25) {
  const res = await fetch(`${API_BASE_URL}/stations/bytag/${encodeURIComponent(genre)}?limit=${limit}`);
  return res.json();
}