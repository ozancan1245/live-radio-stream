export default async function sitemap() {
  const baseUrl = 'https://live-radio-stream.vercel.app';

  // Önemli Ülkeler
  const countries = ['tr', 'us', 'de', 'gb', 'fr', 'es', 'it', 'nl', 'br', 'ca'];
  // Önemli Müzik Türleri
  const genres = ['pop', 'rock', 'jazz', 'news', 'classical', 'dance', 'hiphop', 'top40'];

  const countryUrls = countries.map((code) => ({
    url: `${baseUrl}/country/${code}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const genreUrls = genres.map((tag) => ({
    url: `${baseUrl}/genre/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0,
    },
    ...countryUrls,
    ...genreUrls,
  ];
}