import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// Google SEO için Dinamik Meta Etiketleri (Başlık ve Açıklama)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const { data: radio } = await supabase
    .from('radios')
    .select('name, seo_title, description')
    .eq('slug', slug)
    .single();

  if (!radio) return { title: 'Radyo Bulunamadı' };

  return {
    title: radio.seo_title || `${radio.name} Canlı Dinle - Live Radio Stream`,
    description: radio.description?.slice(0, 160) || `${radio.name} canlı yayınını kesintisiz ve yüksek kalitede dinleyin.`,
  };
}

// Radyo Detay Sayfası Bileşeni
export default async function RadioDetailPage({ params }) {
  const { slug } = await params;

  // Supabase'den gelen slug değerine göre doğru radyoyu çekiyoruz
  const { data: radio, error } = await supabase
    .from('radios')
    .select('*')
    .eq('slug', slug)
    .single();

  // Radyo veritabanında bulunamazsa 404 sayfasına yönlendir
  if (error || !radio) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Radyo Başlığı ve Logosu */}
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
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded mt-2">
            {radio.category || 'Genel'}
          </span>
        </div>
      </div>

      {/* Canlı Ses Oynatıcı (Audio Player) */}
      <div className="bg-gray-100 p-6 rounded-xl mb-8 shadow-inner">
        <audio controls className="w-full" src={radio.stream_url}>
          Tarayıcınız ses oynatıcıyı desteklemiyor.
        </audio>
      </div>

      {/* Google SEO İçin Özgün Açıklama Alanı */}
      <article className="prose max-w-none bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">{radio.name} Hakkında</h2>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {radio.description}
        </div>
      </article>
    </main>
  );
}