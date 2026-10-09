import type { Metadata } from 'next';
import { FiDownload } from 'react-icons/fi';
import { cvData } from '@/data/cv';

export const metadata: Metadata = {
  title: 'CV',
  description:
    'Samir Yousri — Frontend Developer specializing in React and Next.js. Resume, selected projects, skills, and education.',
};

export default function CvPage() {
  return (
    <div className="cv-page mx-auto w-full max-w-6xl px-4 pb-16 pt-12 sm:px-8 sm:pt-16">
      <header className="cv-page-heading mx-auto mb-8 flex max-w-[210mm] flex-col items-center text-center sm:mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#f17a82] sm:text-xs">
          Resume &amp; Experience
        </p>
        <h1 className="cv-display-heading mt-3">MY CV</h1>
        <p className="mt-3 text-sm text-neutral-400 sm:text-base">
          {cvData.title}
        </p>
        <a
          href="/cv/download"
          download="Samir_Yousri_CV.pdf"
          className="cv-download-button mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-sm border border-[#D83A43] bg-[#D83A43] px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#f17a82] hover:bg-[#c92f3a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f17a82]"
        >
          <FiDownload aria-hidden="true" className="h-4 w-4" />
          Download CV
        </a>
      </header>

      <article
        id="cv-document"
        className="cv-document mx-auto"
        aria-labelledby="cv-name"
      >
        <header className="cv-document-header">
          <h2 id="cv-name">{cvData.name}</h2>
          <p className="cv-document-title">{cvData.title}</p>
          <address className="cv-contact-list">
            <a href={cvData.emailUrl}>{cvData.email}</a>
            <a href={cvData.githubUrl} target="_blank" rel="noreferrer">
              {cvData.github}
            </a>
            <a href={cvData.linkedInUrl} target="_blank" rel="noreferrer">
              {cvData.linkedIn}
            </a>
          </address>
        </header>

        <section className="cv-section" aria-labelledby="cv-summary-heading">
          <h3 id="cv-summary-heading">Professional Summary</h3>
          <p>{cvData.summary}</p>
        </section>

        <section className="cv-section" aria-labelledby="cv-experience-heading">
          <h3 id="cv-experience-heading">Freelance Experience</h3>
          <article className="cv-experience">
            <div className="cv-experience-heading">
              <h4>{cvData.experience.title}</h4>
              <p>{cvData.experience.employer} · {cvData.experience.dates}</p>
            </div>
            <p className="cv-experience-project">{cvData.experience.project}</p>
            <ul className="cv-experience-bullets">
              {cvData.experience.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="cv-section" aria-labelledby="cv-projects-heading">
          <h3 id="cv-projects-heading">Selected Projects</h3>
          <div className="cv-project-list">
            {cvData.projects.map((project) => (
              <article className="cv-project" key={project.name}>
                <div className="cv-project-heading">
                  <h4>{project.name}</h4>
                  <p>{project.technologies}</p>
                </div>
                <p className="cv-project-description">{project.description}</p>
                <p className="cv-project-links">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                  <span aria-hidden="true">·</span>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section" aria-labelledby="cv-skills-heading">
          <h3 id="cv-skills-heading">Technical Skills</h3>
          <dl className="cv-skills-list">
            {cvData.skills.map((skill) => (
              <div key={skill.category}>
                <dt>{skill.category}</dt>
                <dd>{skill.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="cv-section cv-education" aria-labelledby="cv-education-heading">
          <h3 id="cv-education-heading">Education</h3>
          <div className="cv-education-row">
            <p>
              <strong>{cvData.education.institution}</strong>
              <span>{cvData.education.program}</span>
            </p>
            <time>{cvData.education.dates}</time>
          </div>
        </section>
      </article>
    </div>
  );
}
