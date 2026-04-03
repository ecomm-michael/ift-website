import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const tiers: {
  name: string;
  price: string;
  containerClass: string;
  priceClass: string;
  nameClass?: string;
  benefitClass?: string;
  benefits: string[];
}[] = [
  {
    name: 'Bronze',
    price: '[TBD]',
    containerClass: 'bg-sea-foam rounded-xl p-8',
    priceClass: 'font-display text-3xl font-extrabold text-abyssal-navy mb-4',
    benefits: [
      'Logo on website',
      'Social media mention',
      'Festival booth (standard)',
    ],
  },
  {
    name: 'Silver',
    price: '[TBD]',
    containerClass:
      'bg-gradient-to-br from-sea-foam to-white rounded-xl p-8 shadow-md',
    priceClass: 'font-display text-3xl font-extrabold text-abyssal-navy mb-4',
    benefits: [
      'All Bronze benefits',
      'Logo on event materials',
      'Email newsletter feature',
      'Priority booth location',
    ],
  },
  {
    name: 'Gold',
    price: '[TBD]',
    containerClass:
      'bg-white rounded-xl p-8 shadow-lg border-2 border-sunrise-gold',
    priceClass:
      'font-display text-3xl font-extrabold text-sunrise-gold mb-4',
    benefits: [
      'All Silver benefits',
      'Speaking opportunity',
      'VIP tickets (4)',
      'Co-branded content',
      'Banner placement',
    ],
  },
  {
    name: 'Title',
    price: '[TBD]',
    containerClass: 'bg-caribbean-teal text-white rounded-xl p-8 shadow-xl',
    priceClass: 'font-display text-3xl font-extrabold text-white mb-4',
    nameClass: 'font-heading text-xl font-bold text-white mb-2',
    benefitClass: 'flex items-start gap-2 text-sm text-white/90',
    benefits: [
      'All Gold benefits',
      'Naming rights',
      'Unlimited VIP tickets',
      'Exclusive media coverage',
      'Custom activation space',
      'Year-round brand presence',
    ],
  },
];

const comparisonRows = [
  { benefit: 'Website logo', bronze: true, silver: true, gold: true, title: true },
  { benefit: 'Social mentions', bronze: true, silver: true, gold: true, title: true },
  { benefit: 'Festival booth', bronze: true, silver: true, gold: true, title: true },
  { benefit: 'Event materials', bronze: false, silver: true, gold: true, title: true },
  { benefit: 'Email feature', bronze: false, silver: true, gold: true, title: true },
  { benefit: 'Speaking slot', bronze: false, silver: false, gold: true, title: true },
  { benefit: 'VIP tickets', bronze: false, silver: false, gold: true, title: true },
  { benefit: 'Naming rights', bronze: false, silver: false, gold: false, title: true },
  { benefit: 'Custom activation', bronze: false, silver: false, gold: false, title: true },
];

export default function SponsorsPage() {
  const t = useTranslations('sponsors');

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-sandy-shore py-24 text-center">
        <h1 className="font-display text-5xl md:text-7xl font-extrabold text-abyssal-navy">
          {t('title')}
        </h1>
        <p className="text-lg text-abyssal-navy/70 max-w-2xl mx-auto mt-4">
          Support Puerto Rico&apos;s premier fishing community and get your brand
          in front of thousands
        </p>
      </section>

      {/* Tier Cards */}
      <section className="py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier) => {
            const isTitle = tier.name === 'Title';
            return (
              <div key={tier.name} className={tier.containerClass}>
                <h3
                  className={
                    tier.nameClass ??
                    'font-heading text-xl font-bold text-abyssal-navy mb-2'
                  }
                >
                  {tier.name}
                </h3>
                <p className={tier.priceClass}>{tier.price}</p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className={
                        tier.benefitClass ??
                        `flex items-start gap-2 text-sm ${isTitle ? 'text-white/90' : 'text-abyssal-navy/80'}`
                      }
                    >
                      <span className="mt-0.5 shrink-0">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Comparison Table */}
      <section className="py-20 px-6 bg-sea-foam">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-center mb-10 text-abyssal-navy">
            {t('benefits')}
          </h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-heading font-bold text-abyssal-navy">
                    Benefit
                  </TableHead>
                  <TableHead className="text-center font-heading font-bold text-abyssal-navy">
                    Bronze
                  </TableHead>
                  <TableHead className="text-center font-heading font-bold text-abyssal-navy">
                    Silver
                  </TableHead>
                  <TableHead className="text-center font-heading font-bold text-sunrise-gold">
                    Gold
                  </TableHead>
                  <TableHead className="text-center font-heading font-bold text-caribbean-teal">
                    Title
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonRows.map((row) => (
                  <TableRow key={row.benefit}>
                    <TableCell className="font-medium text-abyssal-navy">
                      {row.benefit}
                    </TableCell>
                    {(['bronze', 'silver', 'gold', 'title'] as const).map(
                      (col) => (
                        <TableCell key={col} className="text-center">
                          {row[col] ? (
                            <span className="text-caribbean-teal font-bold">
                              ✓
                            </span>
                          ) : (
                            <span className="text-abyssal-navy/30">—</span>
                          )}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-abyssal-navy text-center">
        <h2 className="font-display text-3xl font-extrabold text-white mb-4">
          Ready to Partner?
        </h2>
        <p className="text-white/70 mb-8">
          Contact us to discuss sponsorship opportunities
        </p>
        <a
          href="mailto:info@brsskiandtours.com"
          className="inline-block bg-caribbean-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-turquoise-catch transition-colors"
        >
          {t('inquire')}
        </a>
        <p className="mt-6 text-white/50 text-sm">
          info@brsskiandtours.com
        </p>
      </section>
    </div>
  );
}
