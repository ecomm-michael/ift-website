'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { X } from 'lucide-react';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  navLinks: ReadonlyArray<{ href: string; key: string }>;
  pathname: string;
  onSwitchLocale: () => void;
  locale: string;
  otherLocale: string;
}

export function MobileNav({
  open,
  onClose,
  navLinks,
  pathname,
  onSwitchLocale,
  locale,
  otherLocale,
}: MobileNavProps) {
  const t = useTranslations('nav');
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus the close button when the overlay opens
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-white flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Header with close button */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-border">
        <span className="font-display font-extrabold text-xl text-abyssal-navy tracking-tight">
          IFT
        </span>
        <button
          ref={closeRef}
          onClick={onClose}
          className="p-2 text-abyssal-navy hover:text-caribbean-teal transition-colors"
          aria-label="Close navigation menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 flex flex-col items-center justify-center gap-8">
        {navLinks.map(({ href, key }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={key}
              href={href}
              onClick={onClose}
              className={`text-2xl font-display transition-colors ${
                isActive
                  ? 'text-caribbean-teal font-semibold'
                  : 'text-abyssal-navy hover:text-caribbean-teal'
              }`}
            >
              {t(key)}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="flex flex-col items-center gap-4 px-6 pb-10">
        {/* Language switcher */}
        <button
          onClick={() => {
            onSwitchLocale();
            onClose();
          }}
          className="text-sm text-abyssal-navy hover:text-caribbean-teal transition-colors font-medium"
          aria-label={`Switch to ${otherLocale === 'en' ? 'English' : 'Spanish'}`}
        >
          <span className={locale === 'en' ? 'font-bold' : ''}>EN</span>
          <span className="mx-0.5">|</span>
          <span className={locale === 'es' ? 'font-bold' : ''}>ES</span>
        </button>

        {/* Register Now */}
        <Link
          href="/tournaments"
          onClick={onClose}
          className="w-full max-w-xs inline-flex items-center justify-center rounded-lg bg-caribbean-teal text-white text-sm font-medium px-4 py-2.5 hover:bg-caribbean-teal/80 transition-colors"
        >
          {t('register')}
        </Link>
      </div>
    </div>
  );
}
