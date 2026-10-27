'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const INITIAL_DISPLAY_MS = 1300;
const NAVIGATION_DISPLAY_MS = 1050;
const NAVIGATION_TIMEOUT_MS = 7000;

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const [active, setActive] = useState(true);
  const previousPathRef = useRef<string | null>(null);
  const navigationStartedAtRef = useRef<number | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    hideTimerRef.current = setTimeout(() => {
      if (navigationStartedAtRef.current === null) setActive(false);
    }, INITIAL_DISPLAY_MS);

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (previousPathRef.current === null) {
      previousPathRef.current = pathname;
      return;
    }

    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    const elapsed = navigationStartedAtRef.current
      ? Date.now() - navigationStartedAtRef.current
      : 0;
    hideTimerRef.current = setTimeout(() => {
      navigationStartedAtRef.current = null;
      setActive(false);
    }, Math.max(0, NAVIGATION_DISPLAY_MS - elapsed));
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.pathname === window.location.pathname
      ) {
        return;
      }

      navigationStartedAtRef.current = Date.now();
      setActive(true);

      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        navigationStartedAtRef.current = null;
        setActive(false);
      }, NAVIGATION_TIMEOUT_MS);
    };

    const handlePopState = () => {
      navigationStartedAtRef.current = Date.now();
      setActive(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        navigationStartedAtRef.current = null;
        setActive(false);
      }, NAVIGATION_TIMEOUT_MS);
    };

    document.addEventListener('click', handleClick, true);
    window.addEventListener('popstate', handlePopState);
    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div
      aria-hidden={!active}
      className={`page-loader${active ? ' is-active' : ''}`}
    >
      <div className="page-loader__content" role="status" aria-live="polite">
        <div className="page-loader__mark" aria-hidden="true">
          <span>SY</span>
        </div>
        <p>Loading</p>
        <div className="page-loader__track" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
