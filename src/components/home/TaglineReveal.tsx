'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export function TaglineReveal() {
  const t = useTranslations('hero');
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div
          ref={ref}
          className={[
            'transition-all duration-700 ease-out',
            visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8',
          ].join(' ')}
        >
          <p className="font-display font-extrabold text-4xl md:text-6xl text-abyssal-navy text-center leading-tight">
            {t('tagline')}
          </p>
        </div>
      </div>
    </section>
  );
}
