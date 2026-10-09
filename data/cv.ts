export const cvData = {
  name: 'Samir Yousri',
  title: 'Frontend Developer | React & Next.js',
  email: 'samiryousri972@gmail.com',
  emailUrl: 'mailto:samiryousri972@gmail.com',
  github: 'github.com/samiryousr',
  githubUrl: 'https://github.com/samiryousr',
  linkedIn: 'LinkedIn',
  linkedInUrl: 'https://www.linkedin.com/in/samir-yousri-9335692b5/',
  summary:
    'Frontend developer focused on building responsive, user-friendly web applications with React, Next.js, TypeScript, and Tailwind CSS. Hands-on project work includes e-commerce experiences, reusable interface components, client-side state management, and applications powered by external APIs and cloud services. Values clear structure, accessible interactions, and layouts that work consistently across screen sizes.',
  experience: {
    title: 'Freelance Frontend Developer',
    employer: 'Self-employed',
    dates: '2026',
    project: 'Zakhrafa Home',
    bullets: [
      'Built a responsive furniture and home decor storefront with product search, category discovery, and promotional offers.',
      'Connected Supabase-powered catalog and homepage content with Cloudinary imagery using Next.js, TypeScript, and Tailwind CSS.',
    ],
  },
  skills: [
    {
      category: 'Languages',
      items: 'JavaScript (ES6+), TypeScript, HTML5, CSS3',
    },
    {
      category: 'Frontend',
      items: 'React, Next.js, Tailwind CSS, responsive layouts, reusable components',
    },
    {
      category: 'UI & Product',
      items: 'Responsive design, product discovery, search and filtering, product detail views',
    },
    {
      category: 'State management',
      items: 'Redux Toolkit, React Context API',
    },
    {
      category: 'Backend & cloud',
      items: 'Supabase, Firebase, Cloudinary, Next.js API routes',
    },
    {
      category: 'APIs & data',
      items: 'REST APIs, Fetch API, paginated data fetching, TMDB API',
    },
    {
      category: 'Tools & delivery',
      items: 'Git, GitHub, npm, Vercel',
    },
  ],
  projects: [
    {
      name: 'Zakhrafa Home',
      technologies: 'Next.js · TypeScript · Tailwind CSS · Supabase · Cloudinary',
      description:
        'Furniture and home decor storefront that helps visitors explore products through searchable and filterable catalog views, category browsing, and promotional offers. The homepage brings together product, category, offer, and hero content from Supabase, while Cloudinary provides the product imagery for a cohesive shopping experience.',
      liveUrl: 'https://zakhrafa-home-j7zxtjh8j-zakhrafa.vercel.app/',
      githubUrl: 'https://github.com/EL-3raby/zakhrafa-home',
    },
    {
      name: 'Tech Store',
      technologies:
        'Next.js · React · TypeScript · Tailwind CSS · Redux Toolkit · Firebase',
      description:
        'Responsive electronics storefront with product browsing, category filtering, and dedicated product details. Redux Toolkit keeps cart and wishlist interactions in sync, supporting item quantity changes and automatically derived cart totals across the shopping flow.',
      liveUrl: 'https://tech-store-amber-nine.vercel.app/',
      githubUrl: 'https://github.com/samiryousr/tech-store',
    },
    {
      name: 'Zoex',
      technologies: 'Next.js · React · Tailwind CSS · TMDB API',
      description:
        'Movie and TV discovery experience for popular, animated, and genre-based titles, with search and title detail views backed by TMDB data. Paginated API routes support browsing, alongside trailer selection and browser-stored favorites for a practical discovery flow.',
      liveUrl: 'https://zoex-ewrvp1d9x-samir-s-projects13.vercel.app/',
      githubUrl: 'https://github.com/samiryousr/Zoex',
    },
  ],
  education: {
    institution: 'Thebes Academy',
    program: 'Computer Science',
    dates: '2023 – Present',
  },
} as const;
