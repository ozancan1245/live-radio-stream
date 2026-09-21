export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://live-radio-stream.vercel.app/sitemap.xml',
  };
}