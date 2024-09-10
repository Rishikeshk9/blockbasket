'use client';

import localFont from 'next/font/local';
import './globals.css';
import Navigation from '@/components/navigation';
import { usePathname } from 'next/navigation';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// export const metadata = {
//   title: 'BlockBasket',
//   description: 'Create and manage your crypto smallcases',
// };

function RootLayoutInner({ children }) {
  const pathname = usePathname();
  const showNavigation = pathname.startsWith('/home');

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='flex flex-col  '>
          <div className='flex-grow mb-16 p-4'>{children}</div>
          <div className='fixed w-full bottom-0 mt-auto'>
            {showNavigation && <Navigation />}
          </div>
        </div>
      </body>
    </html>
  );
}

export default function RootLayout({ children }) {
  return <RootLayoutInner>{children}</RootLayoutInner>;
}
