'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

const text =
  'Building fast, modern, and immersive web experiences with clean code, thoughtful design, and a passion for turning ideas into digital products.';
const words = text.split(' ');

function ScrollWord({
  word,
  index,
  progress,
}: {
  word: string;
  index: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const start = index / words.length;
  const end = (index + 1) / words.length;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const color = useTransform(progress, [start, end], ['#848484', '#f5f3ed']);
  const backgroundImage = useTransform(
    color,
    (value) =>
      'repeating-linear-gradient(to bottom, transparent 0 5px, ' +
      'rgb(9 9 11 / 7%) 5px 6px), ' +
      `linear-gradient(${value}, ${value})`,
  );

  return (
    <motion.span
      data-scroll-word
      aria-hidden="true"
      style={{
        opacity,
        backgroundImage,
      }}
    >
      {word}
      {index < words.length - 1 ? ' ' : ''}
    </motion.span>
  );
}

export default function ScrollHighlightText() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end 130%'],
  });

  return (
    <section
      ref={sectionRef}
      className="scroll-highlight-section mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-12"
      aria-label="About my approach"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <p
          className="scroll-highlight-copy text-center"
          aria-label={text}
        >
          {words.map((word, index) => (
            <ScrollWord
              key={`${word}-${index}`}
              word={word}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
