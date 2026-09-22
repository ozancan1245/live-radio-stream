import { supabase } from '@/lib/supabase'; // <-- supabase.js dosyanızın yolunu kontrol edin

export const revalidate = 0; // Verilerin canlı çekilmesini sağlar

// Google SEO için Dinamik Meta Etiketleri
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) return { title: 'Radyo Bulunamadı' };

  const { data: radio } = await supabase
    .from('radios')
    .select('name, seo_title, description')
    .eq('slug', slug)
    .maybeSingle();

  if (!radio) return { title: 'Radyo Bulunamadı - Live Radio Stream' };

  return {
    title: radio.seo_title || `${radio.name} Canlı Dinle - Live Radio Stream`,
    description: radio.description?.slice(0, 160) || `${radio.name} canlı yayınını kesintisiz ve yüksek kalitede dinleyin.`,
  };
}

// Radyo Detay Sayfası Bileşeni
export default async function RadioDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  // Supabase'den slug değerine göre radyoyu çekiyoruz
  const { data: radio, error } = await supabase
    .from('radios')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  // Veritabanı bağlantı hatası varsa ekrana yazdırır
  if (error) {
    return (
      <div className="container mx-auto p-8 text-red-600">
        <h1 className="text-xl font-bold">Veritabanı Bağlantı Hatası:</h1>
        <pre className="bg-gray-100 p-4 rounded mt-2 text-sm">{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  // Slug veritabanında bulunamazsa bilgi verir
  if (!radio) {
    return (
      <div className="container mx-auto p-8 text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800">Radyo Bulunamadı</h1>
        <p className="text-gray-600 mt-2">
          Aradığınız <strong>"{slug}"</strong> slug değerine ait bir radyo veritabanında tanımlı değil.
        </p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Radyo Başlık ve Logo */}
      <div className="flex items-center gap-4 mb-6">
        {radio.logo_url && (
          <img 
            src={radio.logo_url} 
            alt={radio.name} 
            className="w-20 h-20 rounded-lg object-cover shadow"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{radio.name} Canlı Dinle</h1>
          {radio.category && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded mt-2">
              {radio.category}
            </span>
          )}
        </div>
      </div>

      {/* Ses Oynatıcı */}
      <div className="bg-gray-100 p-6 rounded-xl mb-8 shadow-inner">
        <audio controls className="w-full" src={radio.stream_url}>
          Tarayıcınız ses oynatıcıyı desteklemiyor.
        </audio>
      </div>

      {/* Google SEO Açıklaması */}
      <article className="prose max-w-none bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">{radio.name} Hakkında</h2>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {radio.description || `${radio.name} radyosunun canlı yayın akışı ve en çok çalınan şarkıları bu sayfada.`}
        </div>
      </article>
    </main>
  );
}