'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';

export function EmailCapture() {
  const t = useTranslations('email');

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Auto-clear success message after 3 seconds
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(false), 3000);
    return () => clearTimeout(timer);
  }, [success]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    // Simulated submission — will be replaced with a server action
    setTimeout(() => {
      setSuccess(true);
      setEmail('');
      setLoading(false);
    }, 1000);
  }

  return (
    <section className="bg-abyssal-navy text-white py-20 px-6">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-6">
          {t('heading')}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Input
            type="email"
            placeholder={t('placeholder')}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-turquoise-catch sm:w-80"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-caribbean-teal text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-turquoise-catch transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? '...' : t('submit')}
          </button>
        </form>

        {success && (
          <p className="mt-4 text-green-400 text-sm font-medium">
            {t('success')}
          </p>
        )}

        {error && (
          <p className="mt-4 text-coral-heat text-sm font-medium">{error}</p>
        )}
      </div>
    </section>
  );
}
