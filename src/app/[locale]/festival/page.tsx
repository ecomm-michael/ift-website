import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const schedule = [
  {
    time: '8:00 AM',
    event: 'Gates Open',
    description: 'Welcome & registration',
  },
  {
    time: '10:00 AM',
    event: 'Tournament Start',
    description: 'Offshore tournament begins',
  },
  {
    time: '2:00 PM',
    event: 'Live Music',
    description: 'Local bands on the main stage',
  },
  {
    time: '5:00 PM',
    event: 'Weigh-In Ceremony',
    description: 'Tournament results & awards',
  },
  {
    time: '7:00 PM',
    event: 'Festival Party',
    description: 'Food, drinks, dancing under the stars',
  },
];

export default function FestivalPage() {
  const t = useTranslations('festival');

  return (
    <div>
      {/* Hero */}
      <section className="h-[60vh] relative flex items-center justify-center bg-gradient-to-br from-abyssal-navy to-caribbean-teal">
        <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white text-center px-6">
          {t('title')}
        </h1>
      </section>

      {/* Event Schedule Timeline */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="font-heading text-3xl font-bold text-abyssal-navy mb-12">
          {t('schedule')}
        </h2>

        <div className="border-l-2 border-caribbean-teal ml-4 pl-8 space-y-12">
          {schedule.map((entry) => (
            <div key={entry.time} className="relative">
              {/* Timeline dot */}
              <span className="absolute -left-[calc(2rem+5px)] top-1 w-3 h-3 rounded-full bg-caribbean-teal" />

              <p className="font-label text-sm font-semibold text-caribbean-teal mb-1">
                {entry.time}
              </p>
              <h3 className="font-heading text-xl font-bold text-abyssal-navy">
                {entry.event}
              </h3>
              <p className="text-abyssal-navy/70 text-sm mt-1">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 px-6 bg-sea-foam text-center">
        <h2 className="font-heading text-2xl font-bold text-abyssal-navy mb-2">
          Isla Verde, San Juan, Puerto Rico
        </h2>
        <p className="text-abyssal-navy/60 text-sm mb-8">
          Event venue location
        </p>
        <div className="w-full max-w-3xl mx-auto h-64 bg-abyssal-navy/10 rounded-xl flex items-center justify-center text-abyssal-navy/40 text-sm">
          Map coming soon
        </div>
      </section>

      {/* CTA */}
      <section className="bg-caribbean-teal py-16 text-center px-6">
        <p className="font-display text-3xl font-extrabold text-white mb-6">
          {t('getCta')}
        </p>
        <Link
          href="/festival"
          className="inline-block bg-white text-caribbean-teal px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
        >
          Get Tickets
        </Link>
      </section>
    </div>
  );
}
