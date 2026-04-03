import { Link } from '@/i18n/navigation';

type Event = {
  date: string;
  name: string;
  location: string;
  href: string;
};

const EVENTS: Event[] = [
  {
    date: 'Jun 15, 2026',
    name: 'Summer Slam Tournament',
    location: 'San Juan, PR',
    href: '/tournaments',
  },
  {
    date: 'Aug 22, 2026',
    name: 'Blue Marlin Classic',
    location: 'Fajardo, PR',
    href: '/tournaments',
  },
  {
    date: 'Nov 14, 2026',
    name: 'IFT Festival 2026',
    location: 'Isla Verde, PR',
    href: '/festival',
  },
];

export function UpcomingEvents() {
  return (
    <section className="py-20 px-6">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-abyssal-navy text-center mb-12">
        Upcoming Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {EVENTS.map((event) => (
          <div
            key={event.name}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <span className="inline-block bg-caribbean-teal text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {event.date}
            </span>
            <h3 className="font-heading text-xl font-bold text-abyssal-navy mb-2">
              {event.name}
            </h3>
            <p className="text-sm text-abyssal-navy/60 mb-4">{event.location}</p>
            <Link
              href={event.href}
              className="text-caribbean-teal font-semibold hover:text-turquoise-catch transition-colors"
            >
              Register
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
