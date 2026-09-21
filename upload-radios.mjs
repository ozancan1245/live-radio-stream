import { createClient } from '@supabase/supabase-js';

// 1. Supabase Bilgilerini Gir (Supabase Dashboard > Settings > API kısmından al)
const SUPABASE_URL = 'https://xxx.supabase.co'; // Kendi Supabase URL'in
const SUPABASE_KEY = 'eyJhbGciOi...'; // Kendi Supabase anon/public anahtarın

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Aktarılacak Radyo Verilerin
const radioData = [
  {
    name: 'Radyo Fenomen',
    stream_url: 'https://stream.radyofenomen.com/fenomen/mp3/mid/',
    logo_url: 'https://example.com/logos/fenomen.png',
    category: 'Pop',
  },
  {
    name: 'Kral FM',
    stream_url: 'https://dogus.daioncdn.net/kralfm/kralfm.m3u8',
    logo_url: 'https://example.com/logos/kralfm.png',
    category: 'Arabesk',
  },
  // Kendi radyo listeni buraya ekleyebilirsin
];

async function uploadData() {
  console.log('Veriler Supabase\'e aktarılıyor...');

  const { data, error } = await supabase
    .from('radios') // Supabase'deki tablo adın
    .insert(radioData);

  if (error) {
    console.error('Aktarım hatası:', error.message);
  } else {
    console.log('Tüm radyo kanalları başarıyla Supabase\'e yüklendi!');
  }
}

uploadData();