import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#08080a]/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <Link
            href="/#hero"
            className="text-sm font-bold tracking-wide text-white transition-colors hover:text-[#f17a82]"
          >
            Samir Yousri
          </Link>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
            Full Stack Developer
          </p>
        </div>

        <nav
          aria-label="Footer links"
          className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-neutral-400"
        >
          <a
            href="https://github.com/samiryousr"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/samir-yousri-9335692b5/?isSelfProfile=true"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="mailto:samiryousri972@gmail.com"
            className="transition-colors hover:text-white"
          >
            Email
          </a>
          <Link href="/cv" className="transition-colors hover:text-white">
            CV
          </Link>
        </nav>

        <p className="text-xs text-neutral-600">
          © {new Date().getFullYear()} Samir Yousri
        </p>
      </div>
    </footer>
  );
}
