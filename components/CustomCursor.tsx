'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      const target = event.target;
      const clickable =
        target instanceof Element &&
        target.closest(
          'a, button, [role="button"], [role="link"], input[type="button"], input[type="submit"], label, select, summary, [onclick]',
        );
      const hoveringClickable = Boolean(clickable);

      x.set(event.clientX - (hoveringClickable ? 12 : 0));
      y.set(event.clientY - (hoveringClickable ? 1 : 0));
      opacity.set(1);
      setIsPointer(hoveringClickable);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [opacity, x, y]);

  return (
    <motion.svg
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-[26px] w-[26px] md:block"
      viewBox="0 0 32 32"
      fill="#f5f3ed"
      stroke="rgba(9, 9, 11, 0.85)"
      strokeLinejoin="round"
      strokeWidth="1.5"
      style={{ x, y, opacity }}
    >
      {isPointer ? (
        <path d="M12 1a2 2 0 0 0-2 2v9l-1.3-1.4a2 2 0 0 0-2.9 2.8l5.4 5.6A5 5 0 0 0 14.8 21H17a5 5 0 0 0 5-5v-3a2 2 0 0 0-4 0v-1a2 2 0 0 0-3.5-1.3V3a2 2 0 0 0-2.5-2z" />
      ) : (
        <path d="M0 0v26l6.7-6.7 5.1 10.2 4.2-2.1-5.1-10.2H21L0 0z" />
      )}
    </motion.svg>
  );
}
