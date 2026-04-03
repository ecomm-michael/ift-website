import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { geistSans, geistMono, barlowCondensed, barlow } from '@/lib/fonts';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "../globals.css";

export const metadata: Metadata = {
  title: "International Fishing Team — Puerto Rico's Premier Fishing Experience",
  description: "Tournaments, all-inclusive trips, and community festivals across Puerto Rico's best waters.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} ${barlow.variable}`}>
      <body className="font-sans antialiased bg-white text-abyssal-navy">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <main id="main-content">
            {children}
          </main>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
