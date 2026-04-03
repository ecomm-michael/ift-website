'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface CinematicHeroProps {
  frameCount?: number;
  framesPath?: string;
  fallbackImage?: string;
  scrollHeight?: number;
}

export function CinematicHero({
  frameCount = 120,
  framesPath = '/hero/frames/frame-',
  fallbackImage = '/hero/hero-frame.png',
  scrollHeight = 300,
}: CinematicHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef<number>(-1);
  const rafRef = useRef<number | null>(null);
  const pendingFrameRef = useRef<number>(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Pad frame number to 3 digits, e.g. 1 -> "001"
  const getFrameSrc = useCallback(
    (index: number): string => {
      const padded = String(index + 1).padStart(3, '0');
      return `${framesPath}${padded}.jpg`;
    },
    [framesPath]
  );

  // Draw a specific frame to the canvas with cover-fit logic
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = framesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Resize canvas to fill viewport
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Redraw current frame after resize
    if (currentFrameRef.current >= 0) {
      drawFrame(currentFrameRef.current);
    }
  }, [drawFrame]);

  // Preload frames: first 30 immediately, rest lazily
  const preloadFrames = useCallback(() => {
    framesRef.current = new Array(frameCount).fill(null);

    const loadFrame = (index: number) => {
      const img = new Image();
      img.src = getFrameSrc(index);
      img.onload = () => {
        framesRef.current[index] = img;
        // Draw frame 0 as soon as it's ready
        if (index === 0 && currentFrameRef.current < 0) {
          currentFrameRef.current = 0;
          drawFrame(0);
        }
      };
      framesRef.current[index] = img;
    };

    // Load first 30 immediately
    const eagarCount = Math.min(30, frameCount);
    for (let i = 0; i < eagarCount; i++) {
      loadFrame(i);
    }

    // Lazy-load the rest after a short delay
    if (frameCount > 30) {
      setTimeout(() => {
        for (let i = 30; i < frameCount; i++) {
          loadFrame(i);
        }
      }, 500);
    }
  }, [frameCount, getFrameSrc, drawFrame]);

  useEffect(() => {
    // Detect mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // No canvas scrubbing on mobile

    // Size canvas immediately
    resizeCanvas();

    // Preload frames
    preloadFrames();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize, { passive: true });

    const handleScroll = () => {
      // spacerHeight in px = scrollHeight (vh units) * viewport height / 100
      const spacerPx = (scrollHeight / 100) * window.innerHeight;
      const rawProgress = Math.min(1, Math.max(0, window.scrollY / spacerPx));

      setProgress(rawProgress);

      const targetFrame = Math.min(
        frameCount - 1,
        Math.floor(rawProgress * frameCount)
      );
      pendingFrameRef.current = targetFrame;

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          const frame = pendingFrameRef.current;
          if (frame !== currentFrameRef.current) {
            currentFrameRef.current = frame;
            drawFrame(frame);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isMobile, frameCount, scrollHeight, preloadFrames, resizeCanvas, drawFrame]);

  // Overlay opacity fades out in the first 50% of scroll
  const overlayOpacity = Math.max(0, 1 - progress * 2);

  return (
    <>
      {/* ── Fixed hero layer ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: isMobile ? '65vh' : '100vh',
          zIndex: 10,
        }}
        aria-hidden="true"
      >
        {isMobile ? (
          /* Mobile: static fallback image with subtle zoom animation */
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={fallbackImage}
              alt="International Fishing Team hero"
              className="w-full h-full object-cover"
              style={{
                animation: 'heroZoom 8s ease-in-out infinite alternate',
              }}
            />
            {/* Gradient overlay for legibility */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(11,45,69,0.3) 0%, rgba(11,45,69,0.6) 100%)',
              }}
            />
          </div>
        ) : (
          /* Desktop: canvas scrubber */
          <>
            <canvas
              ref={canvasRef}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
              }}
            />
            {/* Canvas gradient overlay for legibility */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(11,45,69,0.25) 0%, rgba(11,45,69,0.55) 100%)',
              }}
            />
          </>
        )}

        {/* ── Text overlay (fades out on scroll) ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: overlayOpacity, transition: 'opacity 0.05s linear' }}
        >
          {/* IFT wordmark */}
          <h1
            className="font-display text-white text-6xl md:text-8xl font-extrabold tracking-tight leading-none select-none"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}
          >
            IFT
          </h1>

          {/* Full name */}
          <p
            className="mt-3 text-white/80 text-lg md:text-2xl font-heading tracking-wide select-none"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}
          >
            International Fishing Team
          </p>
        </div>

        {/* ── Scroll indicator (fades out on scroll) ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
          style={{ opacity: overlayOpacity, transition: 'opacity 0.05s linear' }}
        >
          <span className="text-white/60 text-xs tracking-widest uppercase select-none">
            Scroll
          </span>
          {/* Animated chevron */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white/60"
            style={{ animation: 'scrollBounce 1.4s ease-in-out infinite' }}
            aria-hidden="true"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ── Spacer div — maintains document flow so content below hero is reachable ── */}
      <div
        style={{ height: isMobile ? '100vh' : `${scrollHeight}vh` }}
        aria-hidden="true"
      />

      {/* ── Keyframe animations injected via style tag ── */}
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.05); }
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0);   opacity: 0.6; }
          50%       { transform: translateY(6px); opacity: 1;   }
        }
      `}</style>
    </>
  );
}
