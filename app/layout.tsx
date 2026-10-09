import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import DesktopEffects from '@/components/DesktopEffects';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Samir Yousri — Full-Stack Developer',
    template: '%s | Samir Yousri',
  },
  description:
    'Portfolio of Samir Yousri — a full-stack developer crafting modern web experiences with Next.js, TypeScript, and AI-powered tools.',
  authors: [{ name: 'Samir Yousri' }],
  keywords: [
    'developer',
    'portfolio',
    'Next.js',
    'TypeScript',
    'full-stack',
    'React',
  ],
};

/**
 * Inline script that runs synchronously before the first paint, reading
 * the persisted theme from localStorage and adding/removing the `dark`
 * class on <html>.  This prevents a flash of the wrong theme on page load.
 * `suppressHydrationWarning` on <html> tells React to accept whatever class
 * the script set instead of throwing a hydration mismatch error.
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&true)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Flash-prevention: apply saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <DesktopEffects />
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
