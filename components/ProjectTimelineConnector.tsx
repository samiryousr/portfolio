'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface TimelinePoint {
  x: number;
  y: number;
}

export default function ProjectTimelineConnector({
  children,
  className = 'project-timeline',
  cardSelector = 'article',
  ariaLabel = 'Featured projects timeline',
}: {
  children: ReactNode;
  className?: string;
  cardSelector?: string;
  ariaLabel?: string;
}) {
  const timelineRef = useRef<HTMLOListElement>(null);
  const [points, setPoints] = useState<TimelinePoint[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [lineProgress, setLineProgress] = useState(0);

  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    let frame = 0;
    const cards = Array.from(
      timeline.querySelectorAll<HTMLElement>(cardSelector),
    );

    const measure = () => {
      frame = 0;
      const bounds = timeline.getBoundingClientRect();
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const isSkillsTimeline = timeline.classList.contains('skills-timeline');
      const nextPoints = cards.map((card) => {
        const cardBounds = card.getBoundingClientRect();
        return {
          x: isMobile || isSkillsTimeline
            ? 8
            : cardBounds.left - bounds.left + cardBounds.width / 2,
          y: cardBounds.top - bounds.top + cardBounds.height / 2,
        };
      });

      setSize({ width: bounds.width, height: bounds.height });
      setPoints(nextPoints);

      const firstPoint = nextPoints[0];
      const lastPoint = nextPoints[nextPoints.length - 1];
      if (!firstPoint || !lastPoint || nextPoints.length < 2) {
        setLineProgress(0);
        return;
      }

      const firstPointDocumentY = bounds.top + window.scrollY + firstPoint.y;
      const lastPointDocumentY = bounds.top + window.scrollY + lastPoint.y;
      const scrollMarker = window.scrollY + window.innerHeight * 0.62;
      const range = lastPointDocumentY - firstPointDocumentY;
      const progress =
        range > 0
          ? Math.max(
              0,
              Math.min((scrollMarker - firstPointDocumentY) / range, 1),
            )
          : 0;

      setLineProgress(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 0
          : progress,
      );
    };

    const scheduleMeasure = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(timeline);
    timeline
      .querySelectorAll(cardSelector)
      .forEach((card) => resizeObserver.observe(card));
    window.addEventListener('scroll', scheduleMeasure, { passive: true });
    window.addEventListener('resize', scheduleMeasure);
    measure();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', scheduleMeasure);
      window.removeEventListener('resize', scheduleMeasure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [cardSelector]);

  return (
    <ol
      ref={timelineRef}
      className={className}
      aria-label={ariaLabel}
    >
      <svg
        className="project-timeline-path"
        width={size.width}
        height={size.height}
        viewBox={`0 0 ${size.width} ${size.height}`}
        aria-hidden="true"
      >
        {points.slice(1).map((point, index) => (
          <path
            key={`base-${index}`}
            d={`M ${points[index].x} ${points[index].y} L ${point.x} ${point.y}`}
          />
        ))}
        {points.slice(1).map((point, index) => {
          const segmentProgress =
            lineProgress * (points.length - 1) - index;
          const visibleProgress = Math.max(
            0,
            Math.min(segmentProgress, 1),
          );

          return (
            <path
              key={`glow-${index}`}
              className="project-timeline-shimmer"
              d={`M ${points[index].x} ${points[index].y} L ${point.x} ${point.y}`}
              pathLength="1"
              strokeDasharray="0.18 0.82"
              strokeDashoffset={1 - visibleProgress}
              opacity={segmentProgress > 0 && segmentProgress < 1 ? 1 : 0}
            />
          );
        })}
      </svg>
      {points.map((point, index) => (
        <span
          key={index}
          className="project-timeline-node"
          style={{
            left: point.x,
            top: point.y,
          }}
          aria-hidden="true"
        />
      ))}
      {children}
    </ol>
  );
}
