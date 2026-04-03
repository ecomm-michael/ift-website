import { Link } from '@/i18n/navigation';

const tiers = [
  {
    name: 'Bronze',
    className:
      'bg-abyssal-navy/5 text-abyssal-navy/40',
  },
  {
    name: 'Silver',
    className:
      'bg-abyssal-navy/10 text-abyssal-navy/50',
  },
  {
    name: 'Gold',
    className:
      'bg-sunrise-gold/20 text-sunrise-gold border border-sunrise-gold/30',
  },
  {
    name: 'Title',
    className:
      'bg-caribbean-teal/10 text-caribbean-teal border border-caribbean-teal/30',
  },
] as const;

export function SponsorStrip() {
  return (
    <section className="bg-sandy-shore py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-abyssal-navy mb-10">
          Sponsorship Opportunities
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-10">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`w-32 h-20 md:w-40 md:h-24 rounded-xl flex items-center justify-center ${tier.className}`}
            >
              <span className="text-sm font-semibold uppercase tracking-wider">
                {tier.name}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/sponsors"
          className="inline-flex items-center rounded-lg bg-caribbean-teal text-white px-6 py-3 font-semibold hover:bg-caribbean-teal/80 transition-colors"
        >
          Become a Sponsor
        </Link>
      </div>
    </section>
  );
}
