import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function RadioDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  return (
    <div className="container mx-auto p-12 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        TEST SAYFASI BAŞARILI! 🎉
      </h1>
      <p className="text-lg text-gray-700">
        Aradığınız radyo adresi (slug): <strong className="underline">{slug}</strong>
      </p>
    </div>
  );
}