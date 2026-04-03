import { useTranslations } from 'next-intl';

export default function SponsorsPage() {
  const t = useTranslations('sponsors');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-5xl font-bold text-abyssal-navy">
        {t('title')}
      </h1>
    </div>
  );
}
