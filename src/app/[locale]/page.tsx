import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('hero');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-6xl font-extrabold text-abyssal-navy text-center px-4">
        {t('tagline')}
      </h1>
    </div>
  );
}
