import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const tournaments = [
  {
    date: 'Jun 15, 2026',
    name: 'Summer Slam',
    location: 'San Juan, PR',
    prize: '$10,000',
    status: 'Registration Open',
  },
  {
    date: 'Aug 22, 2026',
    name: 'Blue Marlin Classic',
    location: 'Fajardo, PR',
    prize: '$25,000',
    status: 'Upcoming',
  },
  {
    date: 'Sep 12, 2026',
    name: 'Dorado Derby',
    location: 'Rincon, PR',
    prize: '$5,000',
    status: 'Upcoming',
  },
  {
    date: 'Oct 3, 2026',
    name: 'Wahoo Open',
    location: 'Cabo Rojo, PR',
    prize: '$8,000',
    status: 'Upcoming',
  },
  {
    date: 'Nov 14, 2026',
    name: 'Festival Championship',
    location: 'Isla Verde, PR',
    prize: '$50,000',
    status: 'Upcoming',
  },
];

const pastResults = [
  {
    value: 'result-2025',
    title: '2025 Championship',
    detail: 'Winner: Carlos Rivera — 487 lbs Blue Marlin',
  },
  {
    value: 'result-2024',
    title: '2024 Summer Slam',
    detail: 'Winner: Maria Santos — 312 lbs Yellowfin Tuna',
  },
  {
    value: 'result-2023',
    title: '2023 Festival Classic',
    detail: 'Winner: James Chen — 256 lbs Mahi-Mahi',
  },
];

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    'Registration Open':
      'bg-caribbean-teal/10 text-caribbean-teal',
    Upcoming: 'bg-sunrise-gold/10 text-sunrise-gold',
    Completed: 'bg-abyssal-navy/10 text-abyssal-navy/60',
  };
  const cls = variants[status] ?? variants['Upcoming'];
  return (
    <span
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${cls}`}
    >
      {status}
    </span>
  );
}

export default function TournamentsPage() {
  const t = useTranslations('tournaments');

  return (
    <div>
      {/* Hero */}
      <section className="h-[60vh] relative flex items-center justify-center bg-abyssal-navy">
        <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white text-center px-6">
          {t('title')}
        </h1>
      </section>

      {/* Tournament Schedule — Desktop Table */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl font-bold text-abyssal-navy mb-8">
          {t('schedule')}
        </h2>

        {/* Desktop table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Tournament</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Prize Pool</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tournaments.map((t) => (
                <TableRow key={t.name}>
                  <TableCell className="text-abyssal-navy/70">{t.date}</TableCell>
                  <TableCell className="font-semibold text-abyssal-navy">{t.name}</TableCell>
                  <TableCell className="text-abyssal-navy/70">{t.location}</TableCell>
                  <TableCell className="font-semibold text-sunrise-gold">{t.prize}</TableCell>
                  <TableCell>
                    <StatusBadge status={t.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile card stack */}
        <div className="md:hidden space-y-4">
          {tournaments.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-xl shadow-sm border border-abyssal-navy/10 p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-heading text-lg font-bold text-abyssal-navy">
                    {item.name}
                  </p>
                  <p className="text-sm text-abyssal-navy/60">{item.date}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-abyssal-navy/70">{item.location}</span>
                <span className="font-semibold text-sunrise-gold">{item.prize}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past Results Accordion */}
      <section className="py-20 px-6 bg-sea-foam">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-abyssal-navy mb-8">
            {t('pastResults')}
          </h2>
          <Accordion className="rounded-xl overflow-hidden border border-abyssal-navy/10 bg-white">
            {pastResults.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="px-6 py-4 text-base font-semibold text-abyssal-navy hover:no-underline">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-abyssal-navy/70">
                  {item.detail}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="bg-caribbean-teal py-16 text-center px-6">
        <p className="font-display text-3xl font-extrabold text-white mb-6">
          {t('registerCta')}
        </p>
        <Link
          href="/tournaments"
          className="inline-block bg-white text-caribbean-teal px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
        >
          Register Now
        </Link>
      </section>
    </div>
  );
}
