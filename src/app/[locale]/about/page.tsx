import { useTranslations } from 'next-intl';

const teamMembers = [
  {
    name: 'Michael Pratt',
    role: 'Founder & CEO',
    bio: 'Lifelong angler and entrepreneur building Puerto Rico&apos;s fishing future.',
    initials: 'MP',
  },
  {
    name: 'Ana Rodriguez',
    role: 'Tournament Director',
    bio: '15 years of tournament management experience across the Caribbean.',
    initials: 'AR',
  },
  {
    name: 'David Chen',
    role: 'Marketing Director',
    bio: 'Digital marketing strategist connecting brands with the fishing community.',
    initials: 'DC',
  },
];

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-abyssal-navy via-caribbean-teal to-turquoise-catch py-24 text-center">
        <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white">
          {t('title')}
        </h1>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-abyssal-navy mb-8">
            {t('story')}
          </h2>
          <div className="text-abyssal-navy/80 text-lg leading-relaxed space-y-6">
            <p>
              International Fishing Team was founded with a simple mission: to
              showcase Puerto Rico as one of the world&apos;s premier sport fishing
              destinations. What started as a group of passionate anglers has
              grown into an organization that brings together fishing enthusiasts
              from around the globe.
            </p>
            <p>
              We organize world-class tournaments with substantial prize pools,
              curate all-inclusive fishing trip packages, and host an annual
              festival that celebrates the culture, cuisine, and community of
              Puerto Rico&apos;s coastal towns.
            </p>
            <p>
              Our commitment goes beyond the sport. We&apos;re dedicated to marine
              conservation, supporting local businesses, and building a community
              where everyone — from seasoned captains to first-time anglers —
              feels welcome on the water.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-sea-foam">
        <h2 className="font-heading text-3xl font-bold text-abyssal-navy text-center mb-12">
          {t('team')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl p-6 text-center shadow-md"
            >
              <div className="w-20 h-20 rounded-full bg-caribbean-teal/20 mx-auto mb-4 flex items-center justify-center text-caribbean-teal font-bold text-xl">
                {member.initials}
              </div>
              <h3 className="font-heading text-lg font-bold text-abyssal-navy">
                {member.name}
              </h3>
              <p className="text-sm text-caribbean-teal font-semibold mb-2">
                {member.role}
              </p>
              <p className="text-sm text-abyssal-navy/70">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-abyssal-navy text-white text-center">
        <h2 className="font-display text-3xl font-extrabold mb-6">
          {t('contact')}
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
          {/* Email */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-caribbean-teal/20 flex items-center justify-center text-caribbean-teal text-lg">
              ✉
            </div>
            <a
              href="mailto:info@internationalfishingteam.com"
              className="text-white/80 hover:text-turquoise-catch transition-colors text-sm"
            >
              info@internationalfishingteam.com
            </a>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-caribbean-teal/20 flex items-center justify-center text-caribbean-teal text-lg">
              ☎
            </div>
            <span className="text-white/80 text-sm">+1 (787) 000-0000</span>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-caribbean-teal/20 flex items-center justify-center text-caribbean-teal text-lg">
              ◎
            </div>
            <span className="text-white/80 text-sm">San Juan, Puerto Rico</span>
          </div>
        </div>
      </section>
    </div>
  );
}
