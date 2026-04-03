'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

// ---------------------------------------------------------------------------
// OdometerNumber
// ---------------------------------------------------------------------------

interface OdometerNumberProps {
  /** The numeric portion as a string, may include leading $ or , separators */
  value: string;
  /** Trailing suffix rendered as static text, e.g. "+" */
  suffix?: string;
  /** Whether the counter animation has been triggered */
  triggered: boolean;
}

/**
 * Renders a mechanical odometer-style number where each digit is a vertically
 * scrolling strip of 0–9. Non-digit characters ($, ,) render as static glyphs
 * inline with the digit slots.
 */
function OdometerNumber({ value, suffix = '', triggered }: OdometerNumberProps) {
  // Height of one digit in em units — must match the CSS height on digit spans
  const DIGIT_HEIGHT_EM = 1.15;

  const chars = value.split('');

  return (
    <span
      className="inline-flex items-baseline font-mono font-bold text-3xl sm:text-4xl md:text-6xl text-caribbean-teal"
      aria-label={value + suffix}
    >
      {chars.map((char, charIdx) => {
        const digit = parseInt(char, 10);
        const isDigit = !isNaN(digit);

        if (!isDigit) {
          // Render prefix/separator characters ($, ,) as static text
          return (
            <span key={charIdx} className="inline-block leading-none" style={{ height: `${DIGIT_HEIGHT_EM}em` }}>
              {char}
            </span>
          );
        }

        // Each digit gets its own slot with overflow hidden, revealing one
        // number at a time. The strip translates up by (digit × digitHeight)
        // to land on the correct value.
        const targetTranslate = triggered ? -(digit * DIGIT_HEIGHT_EM) : 0;
        // Stagger delay: accumulate only across actual digit characters
        const digitIndex = chars.slice(0, charIdx + 1).filter(c => !isNaN(parseInt(c, 10))).length - 1;

        return (
          <span
            key={charIdx}
            className="inline-block overflow-hidden relative"
            style={{ height: `${DIGIT_HEIGHT_EM}em` }}
          >
            <span
              className="flex flex-col"
              style={{
                transform: `translateY(${targetTranslate}em)`,
                transition: triggered
                  ? `transform 1.5s cubic-bezier(.16,1,.3,1) ${digitIndex * 0.12}s`
                  : 'none',
              }}
            >
              {Array.from({ length: 10 }, (_, d) => (
                <span
                  key={d}
                  className="block text-center"
                  style={{ height: `${DIGIT_HEIGHT_EM}em`, lineHeight: DIGIT_HEIGHT_EM }}
                >
                  {d}
                </span>
              ))}
            </span>
          </span>
        );
      })}

      {/* Static suffix ("+") */}
      {suffix && (
        <span className="inline-block leading-none" style={{ height: `${DIGIT_HEIGHT_EM}em` }}>
          {suffix}
        </span>
      )}
    </span>
  );
}

// ---------------------------------------------------------------------------
// StatsSection
// ---------------------------------------------------------------------------

interface StatConfig {
  value: string;
  suffix: string;
  labelKey: 'prizePool' | 'anglers' | 'events';
}

const STATS: StatConfig[] = [
  { value: '$50,000', suffix: '+', labelKey: 'prizePool' },
  { value: '500',     suffix: '+', labelKey: 'anglers'   },
  { value: '12',      suffix: '',  labelKey: 'events'    },
];

export function StatsSection() {
  const t = useTranslations('stats');
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-sea-foam py-20">
      <div ref={ref} className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6 text-center">
          {STATS.map(({ value, suffix, labelKey }) => (
            <div key={labelKey} className="flex flex-col items-center gap-2">
              <OdometerNumber value={value} suffix={suffix} triggered={triggered} />
              <p className="text-sm text-abyssal-navy/70 uppercase tracking-wider mt-2 font-sans">
                {t(labelKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
