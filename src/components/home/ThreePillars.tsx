import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Pillar = {
  key: 'tournaments' | 'trips' | 'festival';
  href: string;
  bg: string;
  ctaClass: string;
  zIndex: string;
  top: string;
};

const PILLARS: Pillar[] = [
  {
    key: 'tournaments',
    href: '/tournaments',
    bg: 'bg-abyssal-navy text-white',
    ctaClass: 'bg-white text-abyssal-navy hover:bg-white/90',
    zIndex: 'z-10',
    top: 'top-20',
  },
  {
    key: 'trips',
    href: '/trips',
    bg: 'bg-caribbean-teal text-white',
    ctaClass: 'bg-white text-abyssal-navy hover:bg-white/90',
    zIndex: 'z-20',
    top: 'top-[6.25rem]',
  },
  {
    key: 'festival',
    href: '/festival',
    bg: 'bg-sunrise-gold text-abyssal-navy',
    ctaClass: 'bg-abyssal-navy text-white hover:bg-abyssal-navy/90',
    zIndex: 'z-30',
    top: 'top-[7.5rem]',
  },
];

export function ThreePillars() {
  const t = useTranslations('pillars');

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-6 pb-20 md:pb-40">
        {PILLARS.map((pillar) => (
          <div
            key={pillar.key}
            className={[
              'sticky mb-8',
              pillar.top,
              pillar.zIndex,
              pillar.bg,
              'rounded-3xl min-h-[320px] md:min-h-[400px] p-6 md:p-12 shadow-xl',
              'flex flex-col justify-end',
            ].join(' ')}
          >
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">
              {t(`${pillar.key}.title`)}
            </h2>
            <p className="text-lg max-w-lg mb-6 opacity-90">
              {t(`${pillar.key}.description`)}
            </p>
            <div>
              <Link
                href={pillar.href}
                className={[
                  'inline-flex items-center rounded-lg px-6 py-3 font-semibold transition-colors',
                  pillar.ctaClass,
                ].join(' ')}
              >
                {t(`${pillar.key}.cta`)}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
