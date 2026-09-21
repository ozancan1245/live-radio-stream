import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Live Radio Stream - Global Online Radio Stations',
  description: 'Listen to thousands of live radio stations worldwide for free. Pop, Rock, Jazz, News, and country-specific online radio streams.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}