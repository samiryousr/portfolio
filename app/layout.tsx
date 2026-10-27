import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import DesktopEffects from '@/components/DesktopEffects';
import PageTransitionLoader from '@/components/PageTransitionLoader';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen flex flex-col">
        <DesktopEffects />
        <PageTransitionLoader />
        <Navbar />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
