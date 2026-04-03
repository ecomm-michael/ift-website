import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-5xl font-bold text-abyssal-navy">
        {t('title')}
      </h1>
    </div>
  );
}
