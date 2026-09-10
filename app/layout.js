import './globals.css';
import { Tajawal, Playfair_Display, Cormorant_Garamond } from 'next/font/google';

const tajawal = Tajawal({ 
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
});

export const metadata = {
  title: 'Sugarmoon | Luxury Sudanese Bakery',
  description: 'مخبوزات وحلويات سودانية فاخرة في مصر',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} ${playfair.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}
