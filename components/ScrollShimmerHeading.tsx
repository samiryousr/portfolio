'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function ScrollShimmerHeading({
  id,
  children,
  className,
  shimmerText,
}: {
  id: string;
  children: ReactNode;
  className: string;
  shimmerText: string;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isShimmering, setIsShimmering] = useState(false);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsShimmering(true);
      },
      { threshold: 0.65 },
    );

    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  return (
    <h2
      ref={headingRef}
      id={id}
      className={`${className}${isShimmering ? ' is-shimmering' : ''}`}
      data-shimmer={shimmerText}
      onAnimationEnd={() => setIsShimmering(false)}
    >
      {children}
    </h2>
  );
}
