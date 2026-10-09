import Image from 'next/image';
import dynamic from 'next/dynamic';
import { projects } from '@/data/projects';
import type { Project } from '@/types';
import ProjectTimelineConnector from '@/components/ProjectTimelineConnector';
import ScrollHighlightText from '@/components/ScrollHighlightText';
import PortfolioTicker from '@/components/PortfolioTicker';
import ScrollShimmerHeading from '@/components/ScrollShimmerHeading';

const SkillsGrid = dynamic(() => import('@/components/SkillsGrid'));

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.id}`}
      className="
        group relative flex flex-col
        bg-[#101014]/90
        border border-[#1c1c22] hover:border-[#D83A43]/60
        rounded-2xl overflow-hidden
        shadow-sm hover:shadow-[0_0_25px_rgba(216,58,67,0.12)]
        transition-all duration-300 ease-in-out
      "
    >
      <a
        href={project.liveDemoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title} live demo`}
        className="project-preview group/preview relative block h-28 overflow-hidden border-b border-[#1a1a20] bg-[#09090b] sm:h-36 lg:h-40"
      >
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          sizes="(max-width: 767px) 88vw, (max-width: 1279px) 46vw, 464px"
          loading="lazy"
          className="project-preview-image object-cover transition-transform duration-500 md:group-hover:scale-[1.04]"
        />
        <span className="project-preview-label absolute bottom-3 left-3 z-10 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
          Project preview
        </span>
        {project.featured && (
          <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-[#D83A43] text-white border border-[#D83A43]/40 shadow-sm shadow-[#D83A43]/25 tracking-wide">
            Featured
          </span>
        )}
      </a>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-1.5 p-2 sm:gap-2 sm:p-5">
        <h3 className="text-base font-bold text-white transition-colors duration-200 group-hover:text-[#D83A43] sm:text-lg">
          {project.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-xs leading-5 text-neutral-400 sm:line-clamp-3 sm:text-sm sm:leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <ul className="mt-1 flex flex-wrap gap-1.5" role="list">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[#22222a] bg-[#16161c] px-2 py-0.5 text-[10px] font-medium text-neutral-300 sm:px-2.5 sm:text-xs"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Links */}
        <div className="mt-1 flex items-center gap-3 border-t border-[#1a1a20] pt-2 sm:mt-2 sm:pt-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-${project.id}-github`}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </a>
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-${project.id}-demo`}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#D83A43] hover:text-[#f2656d] transition-colors duration-200 ml-auto"
          >
            Live Demo
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* ─── Hero ─── */}
      <section
        id="hero"
        className="hero-section editorial-hero relative mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-6 overflow-hidden px-5 py-7 text-left sm:px-8 sm:py-10 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-8 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-12 lg:py-0 xl:gap-24"
      >
        <div className="relative z-30">
          <p className="hero-eyebrow mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#d83a43] sm:text-xs">
            Samir Yousri <span className="px-2 text-white/30">/</span> Digital
            Craft
          </p>
          <h1 className="hero-title editorial-display">
            <span className="editorial-display-light">FULL STACK</span>
            <span className="editorial-display-red">DEVELOPER.</span>
          </h1>

          <p className="hero-accent mt-4 font-serif text-lg italic text-[#e7e1d8] sm:text-xl">
            Thoughtfully built. Made to matter.
          </p>

          <p className="hero-description mt-4 max-w-lg text-sm leading-7 text-neutral-400 sm:mt-5 sm:text-base sm:leading-8">
            I build thoughtful digital experiences that make ideas real.
          </p>

          {/* Hero CTAs */}
          <div className="hero-actions mt-6 flex flex-col items-start gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3">
            <a
              href="#projects"
              id="hero-cta-projects"
              className="
              hero-button hero-button-outline
            "
            >
              <span className="hero-button-dot" aria-hidden="true" />
              View the Projects
            </a>
            <a
              href="#contact"
              id="hero-cta-contact"
              className="
              hero-button hero-button-solid
            "
            >
              Contact Me
            </a>
          </div>
        </div>

        <figure className="hero-dossier-card relative z-10 mx-auto w-full max-w-[22rem] p-3 text-left md:ml-auto md:mr-0 md:max-w-[16rem] lg:my-10 lg:max-w-[17rem]">
          <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
            <span>Dossier / 001</span>
            <span>Private record</span>
          </div>

          <div className="hero-dossier-photo relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#09090b]">
            <Image
              src="/WhatsApp%20Image%202026-09-03%20at%2017.05.35.jpeg"
              alt="Samir Yousri"
              fill
              priority
              sizes="(max-width: 1023px) 256px, 300px"
              className="hero-portrait-image object-cover object-[center_30%]"
            />
            <div aria-hidden="true" className="hero-photo-texture absolute inset-0" />
            <div className="absolute inset-x-3 top-3 z-10 flex justify-between font-mono text-[8px] uppercase tracking-[0.18em] text-white/65">
              <span>Subject</span>
              <span>Ref. 24-A</span>
            </div>
          </div>

          <figcaption className="pt-3">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#D83A43]">
                  Subject name
                </p>
                <p className="mt-1 text-sm font-semibold tracking-[0.16em] text-neutral-100">
                  Samir Yousri
                </p>
              </div>
              <div className="text-right font-mono text-[8px] uppercase tracking-[0.14em] text-neutral-500">
                <p>Last seen</p>
                <p className="mt-1 text-neutral-300">Building the web</p>
                <p className="mt-1 text-white/55">Identity: unknown</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-2 font-mono text-[8px] uppercase tracking-[0.18em] text-neutral-600">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D83A43] shadow-[0_0_8px_rgba(216,58,67,0.8)]" />
              <span>Archive status: active</span>
            </div>
          </figcaption>
        </figure>
      </section>

      <ScrollHighlightText />
      <PortfolioTicker />

      {/* ─── Projects ─── */}
      <section
        id="projects"
        className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6"
        aria-labelledby="projects-heading"
      >
        <div className="section-heading-group mb-12 text-left sm:mb-16 sm:text-center">
          <ScrollShimmerHeading
            id="projects-heading"
            className="editorial-heading section-heading-shimmer mobile-section-heading ml-0 sm:mx-auto"
            shimmerText="Featured Projects"
          >
            Featured Projects
          </ScrollShimmerHeading>
          <p className="mt-3 max-w-lg text-xs leading-relaxed text-neutral-400 sm:mx-auto sm:text-sm">
            A selection of my recent work spanning AI, SaaS, fintech, and beyond.
          </p>
        </div>

        <ProjectTimelineConnector>
          {featured.map((project, index) => (
            <li
              key={project.id}
              className={`project-timeline-item project-timeline-item-${index + 1}`}
            >
              <ProjectCard project={project} />
            </li>
          ))}
        </ProjectTimelineConnector>
      </section>

      {/* ─── Skills ─── */}
      <section
        id="skills"
        className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 lg:px-12"
        aria-labelledby="skills-heading"
      >
        <div className="section-heading-group mb-10 max-w-3xl text-left sm:mb-12">
          <p className="section-heading-kicker font-mono text-xs uppercase tracking-[0.24em] text-[#D83A43]">
            Tools in my stack
          </p>
          <ScrollShimmerHeading
            id="skills-heading"
            className="editorial-heading section-heading-shimmer mobile-section-heading ml-0 mt-3"
            shimmerText="Skills & Technologies"
          >
            Skills &amp; Technologies
          </ScrollShimmerHeading>
          <p className="mt-3 text-xs leading-relaxed text-neutral-400 sm:text-sm">
            A growing toolkit across frontend, backend, APIs, and web
            optimization.
          </p>
        </div>

        <SkillsGrid />
      </section>

      {/* ─── Contact ─── */}
      <section
        id="contact"
        className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16 sm:px-8 lg:px-12"
        aria-labelledby="contact-heading"
      >
        <div className="relative overflow-hidden rounded-3xl border border-[#302126] bg-[#0d0b0e]/90 px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#D83A43]/10 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#D83A43]">
                Have a project in mind?
              </p>
              <h2
                id="contact-heading"
                className="editorial-heading mt-4 max-w-2xl text-4xl sm:text-5xl"
              >
                Let&apos;s Work Together.
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-neutral-400">
                I&apos;m open to discussing thoughtful digital products and
                meaningful collaborations.
              </p>
            </div>

            <a
              href="mailto:samiryousri972@gmail.com"
              className="inline-flex w-fit items-center gap-3 rounded-xl bg-[#D83A43] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_2px_16px_rgba(216,58,67,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#C92F3A]"
            >
              Get In Touch by Email
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="relative mt-10 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
            <a
              href="https://github.com/samiryousr"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-black/20 p-4 transition-colors hover:border-[#D83A43]/50"
            >
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                GitHub
              </span>
              <span className="mt-2 block text-sm font-medium text-neutral-200">
                View my GitHub ↗
              </span>
            </a>
            <a
              href="mailto:samiryousri972@gmail.com"
              className="rounded-xl border border-white/10 bg-black/20 p-4 transition-colors hover:border-[#D83A43]/50"
            >
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                Email
              </span>
              <span className="mt-2 block break-all text-sm font-medium text-neutral-200">
                Send me an email ↗
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/samir-yousri-9335692b5/?isSelfProfile=true"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-black/20 p-4 transition-colors hover:border-[#D83A43]/50"
            >
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                LinkedIn
              </span>
              <span className="mt-2 block text-sm font-medium text-neutral-200">
                Samir Yousri ↗
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
