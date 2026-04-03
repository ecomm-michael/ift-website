import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { key: 'tournaments', href: '/tournaments' },
  { key: 'trips', href: '/trips' },
  { key: 'festival', href: '/festival' },
  { key: 'sponsors', href: '/sponsors' },
  { key: 'about', href: '/about' },
] as const;

// lucide-react v1.7.0 does not export Instagram, Facebook, or Youtube.
// These are inline SVG implementations matching the Lucide icon style.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const socialLinks = [
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: FacebookIcon, label: 'Facebook', href: '#' },
  { icon: YoutubeIcon, label: 'YouTube', href: '#' },
] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-abyssal-navy text-white">
      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Wordmark + Tagline */}
          <div>
            <span className="font-display font-bold text-white text-xl leading-tight">
              International Fishing Team
            </span>
            <p className="mt-3 text-sm text-white/60">
              {t('tagline')}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              {t('quickLinks')}
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 transition-colors hover:text-caribbean-teal"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              {t('contact')}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:info@brsskiandtours.com"
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-caribbean-teal"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  info@brsskiandtours.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+17875550123"
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-caribbean-teal"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  (787) 555-0123
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-sm text-white/70">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  San Juan, Puerto Rico
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              {t('followUs')}
            </h3>
            <div className="mt-4 flex gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/70 transition-colors hover:text-caribbean-teal"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-white/50">
            {t('copyright')}
          </p>
          <Link
            href="/privacy"
            className="text-xs text-white/50 transition-colors hover:text-caribbean-teal"
          >
            {t('privacy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
