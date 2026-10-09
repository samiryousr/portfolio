'use client';

import dynamic from 'next/dynamic';

const PixelBlast = dynamic(() => import('./PixelBlast'), { ssr: false });

export default function InteractiveBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
      }}
    >
      <PixelBlast
        variant="circle"
        pixelSize={6}
        color="#6b1d28"
        patternScale={2.5}
        patternDensity={1.2}
        pixelSizeJitter={0.5}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.6}
        noiseAmount={0}
        edgeFade={0}
        transparent
        className="w-full h-full"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay pixel-blast-grain" />
    </div>
  );
}
