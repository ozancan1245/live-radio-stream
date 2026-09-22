import { supabase } from '@/lib/supabase';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function RadioDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  // Supabase'den veriyi çekmeyi deneyelim
  const { data: radio, error } = await supabase
    .from('radios')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl text-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Radyo Detay Sayfası
        </h1>
        <p className="text-gray-500 mb-6">
          Aranan Slug: <code className="bg-gray-100 px-2 py-1 rounded text-blue-600 font-mono">{slug}</code>
        </p>

        {radio ? (
          <div className="mt-6 p-6 bg-green-50 rounded-xl border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-2">{radio.name}</h2>
            <p className="text-green-700 mb-4">{radio.description || 'Açıklama yok'}</p>
            {radio.stream_url && (
              <audio controls className="w-full mt-4" src={radio.stream_url}>
                Tarayıcınız ses oynatıcıyı desteklemiyor.
              </audio>
            )}
          </div>
        ) : (
          <div className="mt-6 p-6 bg-amber-50 rounded-xl border border-amber-200 text-amber-800">
            <p className="font-semibold">⚠️ Sayfa Yapısı Çalışıyor!</p>
            <p className="text-sm mt-1">
              Ancak Supabase <strong>radios</strong> tablosunda <code>slug = "{slug}"</code> olan bir kayıt bulunamadı veya RLS kısıtlaması var.
            </p>
            {error && <p className="text-xs text-red-500 mt-2">Hata Detayı: {error.message}</p>}
          </div>
        )}
      </div>
    </main>
  );
}