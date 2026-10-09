'use client';

import { useEffect, useRef } from 'react';

export default function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
      containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10 bg-[#030712]"
    >
      {/* 1. شبكة الخطوط */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 2. Glow أزرق تفاعلي مع الماوس */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.25), transparent 80%)`,
        }}
      />
    </div>
  );
}
