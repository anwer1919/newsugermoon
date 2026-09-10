import './globals.css';
import { Tajawal, Playfair_Display } from 'next/font/google';

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

export const metadata = {
  title: 'Sugarmoon | طعم البيت الفاخر',
  description: 'مخبوزات وحلويات سودانية أصيلة في مصر',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
