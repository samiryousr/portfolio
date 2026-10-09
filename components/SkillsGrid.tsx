'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  SiAxios,
  SiCloudinary,
  SiCss,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNpm,
  SiReact,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiThemoviedatabase,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import {
  FiCheckCircle,
  FiCode,
  FiDownload,
  FiLayers,
  FiSearch,
  FiSmartphone,
  FiZap,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';
import ProjectTimelineConnector from '@/components/ProjectTimelineConnector';
import useFinePointer from '@/hooks/useFinePointer';

interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    name: 'Core Web Fundamentals',
    skills: [
      { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
      { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
      { name: 'CSS3', icon: SiCss, color: '#1572b6' },
    ],
  },
  {
    name: 'Frontend & UI',
    skills: [
      { name: 'React', icon: SiReact, color: '#61dafb' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#f5f5f5' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
    ],
  },
  {
    name: 'State & Data Management',
    skills: [
      { name: 'Redux Toolkit', icon: SiRedux, color: '#764abc' },
      { name: 'Zustand', icon: FiLayers, color: '#f6a54b' },
      { name: 'Context API', icon: SiReact, color: '#61dafb' },
    ],
  },
  {
    name: 'API & Data Fetching',
    skills: [
      { name: 'REST API', icon: FiCode, color: '#f5f3ed' },
      { name: 'Fetch API', icon: FiDownload, color: '#f5f3ed' },
      { name: 'Axios', icon: SiAxios, color: '#671ddf' },
      { name: 'TMDB API', icon: SiThemoviedatabase, color: '#01b4e4' },
    ],
  },
  {
    name: 'Developer Tools',
    skills: [
      { name: 'Git', icon: SiGit, color: '#f05032' },
      { name: 'GitHub', icon: SiGithub, color: '#f5f5f5' },
      { name: 'npm', icon: SiNpm, color: '#cb3837' },
      { name: 'Vercel', icon: SiVercel, color: '#f5f5f5' },
    ],
  },
  {
    name: 'Quality & Optimization',
    skills: [
      { name: 'Responsive Design', icon: FiSmartphone, color: '#f5f3ed' },
      { name: 'SEO', icon: FiSearch, color: '#f5f3ed' },
      { name: 'Web Performance', icon: FiZap, color: '#f5f3ed' },
      { name: 'Testing', icon: FiCheckCircle, color: '#f5f3ed' },
    ],
  },
  {
    name: 'Backend & Cloud Services',
    skills: [
      { name: 'Supabase', icon: SiSupabase, color: '#3ecf8e' },
      { name: 'Firebase', icon: SiFirebase, color: '#ffca28' },
      { name: 'Cloudinary', icon: SiCloudinary, color: '#8c9eff' },
    ],
  },
];

const categoryVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const skillsVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

const skillVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export default function SkillsGrid() {
  const reduceMotion = useReducedMotion() ?? false;
  const hasFinePointer = useFinePointer();

  return (
    <ProjectTimelineConnector
      className="skills-timeline"
      cardSelector=".skills-category-card"
      ariaLabel="Skills and technologies timeline"
    >
      {categories.map((category, categoryIndex) => (
        <li
          key={category.name}
          className="skills-timeline-item"
        >
          <motion.article
            className="skills-category-card relative overflow-hidden rounded-xl border border-[#302126] bg-[#0d0b0e]/90 p-5 sm:p-6"
            initial={reduceMotion || !hasFinePointer ? false : 'hidden'}
            whileInView={hasFinePointer ? 'visible' : undefined}
            viewport={{ once: true, amount: 0.22 }}
            variants={reduceMotion || !hasFinePointer ? undefined : categoryVariants}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'linear-gradient(rgb(255 255 255 / 5%) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 5%) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />
            <div className="relative z-10">
              <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="font-mono text-xs tracking-[0.2em] text-[#f17a82]">
                  {String(categoryIndex + 1).padStart(2, '0')}
                </span>
                <h3 className="text-sm font-semibold tracking-wide text-white sm:text-base">
                  {category.name}
                </h3>
                <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.16em] text-[#f17a82]/80">
                  Verified
                </span>
              </div>

              <motion.ul
                className="flex flex-wrap gap-2"
                role="list"
                variants={hasFinePointer && !reduceMotion ? skillsVariants : undefined}
              >
                {category.skills.map((skill) => {
                  const Icon = skill.icon;

                  return (
                    <motion.li
                      key={skill.name}
                      className="group/skill inline-flex min-h-10 items-center gap-2 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-xs text-neutral-300 transition-[border-color,background-color,color,box-shadow] duration-200 hover:border-[#f17a82]/60 hover:bg-[#d83a43]/10 hover:text-white hover:shadow-[0_0_14px_rgba(255,45,62,0.2)] sm:text-sm"
                      variants={hasFinePointer && !reduceMotion ? skillVariants : undefined}
                    >
                      <Icon
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 transition-transform duration-200 md:group-hover/skill:scale-110"
                        color={skill.color}
                      />
                      <span>{skill.name}</span>
                      <span className="sr-only">Verified</span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </motion.article>
        </li>
      ))}
    </ProjectTimelineConnector>
  );
}
