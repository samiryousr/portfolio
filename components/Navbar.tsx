'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { href: '/#hero', label: 'Home' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
  { href: '/cv', label: 'CV' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSectionHref, setActiveSectionHref] = useState('/#hero');
  const activeHref =
    pathname === '/cv'
      ? '/cv'
      : pathname === '/'
        ? activeSectionHref
        : '';

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24);

    window.addEventListener('scroll', updateScrolled, { passive: true });
    updateScrolled();

    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  useEffect(() => {
    if (pathname !== '/') return;

    const sectionLinks = [
      { id: 'hero', href: '/#hero' },
      { id: 'skills', href: '/#skills' },
      { id: 'projects', href: '/#projects' },
      { id: 'contact', href: '/#contact' },
    ];

    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      const activeSection = sectionLinks
        .map(({ id, href }) => ({
          href,
          top:
            (document.getElementById(id)?.getBoundingClientRect().top ??
              Infinity) + window.scrollY,
        }))
        .filter(({ top }) => top <= marker)
        .sort((first, second) => first.top - second.top)
        .at(-1);

      setActiveSectionHref(activeSection?.href ?? '/#hero');
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('hashchange', updateActiveSection);
    updateActiveSection();
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('hashchange', updateActiveSection);
    };
  }, [pathname]);

  return (
    <header
      id="navbar"
      className={`navbar-signal sticky z-50 mx-auto border-b border-white/10 bg-[#080808]/80 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? 'top-2 w-[calc(100%-1.5rem)] rounded-sm border-x md:top-3 md:w-[70%]'
          : 'top-0 w-full'
      }`}
    >
      <nav
        className="relative z-10 mx-auto flex min-h-14 max-w-7xl flex-wrap items-center justify-between gap-x-6 px-5 sm:min-h-16 sm:px-8 lg:px-10"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          id="nav-logo"
          onClick={closeMenu}
          className="font-mono text-lg font-bold tracking-tight text-[#d83a43] transition-colors hover:text-[#f05b63]"
        >
          &lt;Samir /&gt;
        </Link>

        <ul
          className="hidden items-center gap-4 lg:flex xl:gap-6"
          role="list"
        >
          {navLinks.map(({ href, label }, index) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={activeHref === href ? 'page' : undefined}
                className={`nav-link-indicator relative inline-flex items-baseline gap-1.5 py-2 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors hover:text-white xl:text-[10px] ${
                  activeHref === href ? 'is-active text-white' : 'text-neutral-400'
                }`}
              >
                <span className="text-[8px] text-[#d83a43]">
                  0{index + 1}
                </span>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:ml-0">
          <Link
            href="/#contact"
            id="nav-cta"
            onClick={closeMenu}
            className="hidden border border-[#a8232c] bg-[#a8232c] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white transition-colors hover:border-[#c92f3a] hover:bg-[#c92f3a] sm:inline-flex xl:px-4"
          >
            Hire Me
          </Link>
          <ThemeToggle />
        </div>

        <button
          id="nav-index-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="nav-index-menu"
          aria-label={menuOpen ? 'Close index menu' : 'Open index menu'}
          onClick={() => setMenuOpen((open) => !open)}
          className="group inline-flex h-9 items-center gap-3 border border-white/20 px-3 text-neutral-200 transition-colors hover:border-[#d83a43]/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d83a43] lg:hidden"
        >
          <span className="flex w-4 flex-col gap-[5px]" aria-hidden="true">
            <span
              className={`h-px w-4 bg-current transition-transform ${
                menuOpen ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-px w-4 bg-current transition-transform ${
                menuOpen ? '-translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em]">
            Index
          </span>
        </button>

        <div
          id="nav-index-menu"
          className={`w-full overflow-hidden transition-[max-height,opacity,padding] duration-300 lg:hidden ${
            menuOpen
              ? 'max-h-96 border-t border-white/10 pb-5 pt-4 opacity-100'
              : 'max-h-0 border-t border-transparent p-0 opacity-0'
          }`}
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <ul
            className="grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8"
            role="list"
          >
            {navLinks.map(({ href, label }, index) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMenu}
                  aria-current={activeHref === href ? 'page' : undefined}
                  className={`nav-link-indicator relative inline-flex items-baseline gap-2 py-1 font-mono text-xs uppercase tracking-[0.16em] transition-colors hover:text-white ${
                    activeHref === href ? 'is-active text-white' : 'text-neutral-400'
                  }`}
                >
                  <span className="text-[9px] text-[#d83a43]">
                    0{index + 1}
                  </span>
                  {label}
                </Link>
              </li>
            ))}
            <li className="col-span-2">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
