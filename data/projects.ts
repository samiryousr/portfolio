import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'cvg',
    title: 'CVG — CV Builder',
    description:
      'An Arabic-first CV builder with professional templates, live editing and preview, ATS-friendly layouts, and PDF export.',
    tags: ['CV Builder', 'Arabic RTL', 'Live Preview', 'PDF Export'],
    image: '/projects/cvg-preview.png',
    liveDemoUrl: 'https://cvg-six.vercel.app/',
    featured: true,
  },
  {
    id: 'famex',
    title: 'FameX — Arcade Studio',
    description:
      'An Arabic-first digital studio website with an arcade-inspired identity, presenting strategy, design, development, and growth services through an interactive experience.',
    tags: ['Next.js', 'Arabic RTL', 'Interactive UI', 'Digital Studio'],
    image: '/projects/famex-preview.png',
    liveDemoUrl: 'https://fame-x-two.vercel.app/#home',
    featured: true,
  },
  {
    id: 'neora-tech-store',
    title: 'Neora – Tech Store',
    description:
      'A modern technology store for browsing premium gadgets, accessories, and smart devices, with product categories, product pages, and cart and checkout interfaces.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Firebase'],
    image: '/projects/neora-tech-store.png',
    githubUrl: 'https://github.com/samiryousr/tech-store',
    liveDemoUrl: 'https://tech-store-amber-nine.vercel.app/',
    featured: true,
  },
  {
    id: 'zoex',
    title: 'Zoex',
    description:
      'A movie and TV discovery app for exploring trending titles, searching for favorites, and viewing ratings, overviews, and details.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'TMDB API'],
    image: '/projects/zoex-movie-world.jpg',
    githubUrl: 'https://github.com/samiryousr/Zoex',
    liveDemoUrl: 'https://zoex-ewrvp1d9x-samir-s-projects13.vercel.app/',
    featured: true,
  },
];
