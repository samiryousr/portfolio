import type { Project } from '@/types';

export const projects: Project[] = [
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
    id: 'zakhrafa-home',
    title: 'Zakhrafa Home',
    description:
      'An online home and furniture store with product search, department browsing, promotional offers, and category collections.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Cloudinary'],
    image: '/projects/zakhrafa-home.png',
    githubUrl: 'https://github.com/EL-3raby/zakhrafa-home',
    liveDemoUrl: 'https://zakhrafa-home-j7zxtjh8j-zakhrafa.vercel.app/',
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
