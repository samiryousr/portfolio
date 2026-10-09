'use client';

import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrame = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

      if (Math.abs(targetX - currentX) > 0.2 || Math.abs(targetY - currentY) > 0.2) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        animationFrame = 0;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      targetX = event.clientX;
      targetY = event.clientY;
      spotlight.classList.add('is-active');

      if (!animationFrame) animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <div ref={spotlightRef} aria-hidden="true" className="global-spotlight" />;
}
