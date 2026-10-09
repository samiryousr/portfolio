'use client';

import dynamic from 'next/dynamic';
import useFinePointer from '@/hooks/useFinePointer';

const InteractiveBackground = dynamic(
  () => import('@/components/InteractiveBackground'),
  { ssr: false },
);
const CursorSpotlight = dynamic(
  () => import('@/components/CursorSpotlight'),
  { ssr: false },
);
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
});

export default function DesktopEffects() {
  const hasFinePointer = useFinePointer();

  if (!hasFinePointer) {
    return <div aria-hidden="true" className="mobile-background-fallback" />;
  }

  return (
    <>
      <InteractiveBackground />
      <CursorSpotlight />
      <CustomCursor />
    </>
  );
}
