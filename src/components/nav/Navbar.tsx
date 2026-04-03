'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Menu } from 'lucide-react';
import { MobileNav } from './MobileNav';

const navLinks = [
  { href: '/tournaments', key: 'tournaments' },
  { href: '/trips', key: 'trips' },
  { href: '/festival', key: 'festival' },
  { href: '/sponsors', key: 'sponsors' },
  { href: '/about', key: 'about' },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const otherLocale = locale === 'en' ? 'es' : 'en';

  function switchLocale() {
    router.replace(pathname, { locale: otherLocale });
  }

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-border"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-12 md:h-16">
          {/* Left — Wordmark */}
          <Link
            href="/"
            className="font-display font-extrabold text-xl text-abyssal-navy tracking-tight whitespace-nowrap"
          >
            IFT
          </Link>

          {/* Center — Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, key }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/');
              return (
                <li key={key}>
                  <Link
                    href={href}
                    className={`text-sm transition-colors ${
                      isActive
                        ? 'text-caribbean-teal font-semibold'
                        : 'text-abyssal-navy hover:text-caribbean-teal'
                    }`}
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right — Language switcher + CTA + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Language switcher (desktop) */}
            <button
              onClick={switchLocale}
              className="hidden md:inline-flex text-sm text-abyssal-navy hover:text-caribbean-teal transition-colors font-medium"
              aria-label={`Switch to ${otherLocale === 'en' ? 'English' : 'Spanish'}`}
            >
              <span className={locale === 'en' ? 'font-bold' : ''}>EN</span>
              <span className="mx-0.5">|</span>
              <span className={locale === 'es' ? 'font-bold' : ''}>ES</span>
            </button>

            {/* Register Now (desktop) */}
            <Link
              href="/tournaments"
              className="hidden md:inline-flex items-center justify-center rounded-lg bg-caribbean-teal text-white text-sm font-medium px-4 py-2 hover:bg-caribbean-teal/80 transition-colors"
            >
              {t('register')}
            </Link>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-abyssal-navy hover:text-caribbean-teal transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer so content is not hidden behind the fixed nav */}
      <div className="h-12 md:h-16" aria-hidden="true" />

      {/* Mobile overlay */}
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        pathname={pathname}
        onSwitchLocale={switchLocale}
        locale={locale}
        otherLocale={otherLocale}
      />
    </>
  );
}
