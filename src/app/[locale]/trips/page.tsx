import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const packages = [
  {
    id: 'half-day',
    name: 'Half Day',
    price: '$500',
    duration: '4 hours',
    featured: false,
    inclusions: [
      'Gear included',
      'Captain + mate',
      'Drinks included',
    ],
  },
  {
    id: 'full-day',
    name: 'Full Day',
    price: '$850',
    duration: '8 hours',
    featured: true,
    inclusions: [
      'Gear included',
      'Captain + mate',
      'Lunch + drinks',
      'Photo package',
    ],
  },
  {
    id: 'multi-day',
    name: 'Multi-Day',
    price: '$2,200',
    duration: '3 days',
    featured: false,
    inclusions: [
      'Gear included',
      'Captain + mate',
      'All meals + drinks',
      'Photo + video',
      'Hotel coordination',
    ],
  },
];

export default function TripsPage() {
  const t = useTranslations('trips');

  return (
    <div>
      {/* Hero */}
      <section className="h-[60vh] relative flex items-center justify-center bg-abyssal-navy">
        <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white text-center px-6">
          {t('title')}
        </h1>
      </section>

      {/* Package Cards */}
      <section className="py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-xl shadow-lg p-8 flex flex-col${
                pkg.featured
                  ? ' border-2 border-caribbean-teal relative'
                  : ''
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-caribbean-teal text-white text-sm font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </span>
              )}

              <h3 className="font-heading text-xl font-bold text-abyssal-navy mb-2">
                {pkg.name}
              </h3>

              <div className="mb-1">
                <span className="font-display text-4xl font-extrabold text-caribbean-teal">
                  {pkg.price}
                </span>
              </div>
              <p className="text-sm text-abyssal-navy/60 mb-1">per person</p>
              <p className="text-sm text-abyssal-navy/60 mb-2">{pkg.duration}</p>

              <ul className="space-y-2 my-6 flex-1">
                {pkg.inclusions.map((item) => (
                  <li key={item} className="text-sm text-abyssal-navy/80 flex items-start">
                    <span className="text-caribbean-teal mr-2 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/trips"
                className="w-full inline-flex justify-center items-center rounded-lg bg-caribbean-teal text-white py-3 font-semibold hover:bg-turquoise-catch transition-colors"
              >
                {t('inquire')}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Trip Inquiry Placeholder */}
      <section className="py-20 px-6 bg-sea-foam text-center">
        <h2 className="font-heading text-3xl font-bold text-abyssal-navy mb-4">
          Ready to Book?
        </h2>
        <p className="text-abyssal-navy/70 mb-8 text-lg max-w-xl mx-auto">
          Contact us to plan your perfect fishing trip.
        </p>
        <a
          href="mailto:info@internationalfishingteam.com"
          className="inline-block bg-caribbean-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-turquoise-catch transition-colors"
        >
          info@internationalfishingteam.com
        </a>
      </section>
    </div>
  );
}
