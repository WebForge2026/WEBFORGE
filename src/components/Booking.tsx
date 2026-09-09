import { CalendarDays, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function Booking() {
  const { t } = useLanguage();

  return (
    <section id="booking" className="border-t border-slate-800/80 bg-slate-900/50 px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-400">
            {t.booking.badge}
          </span>
          <h2 className="mb-4 mt-2 text-3xl font-bold">{t.booking.title}</h2>
          <p className="mx-auto max-w-xl text-slate-400">
            {t.booking.descriptionPrefix}{' '}
            <span className="font-semibold text-white">{t.booking.duration}</span>
            {t.booking.descriptionSuffix}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-brand-card p-6 shadow-2xl md:p-8">
          <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/20 text-2xl text-brand-400">
              <CalendarDays className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{t.booking.cardTitle}</h3>
            <p className="mb-6 max-w-md text-center text-sm text-slate-400">
              {t.booking.cardDescription}
            </p>
            <a
              href="https://calendar.app.google/CKAcrtzWwcHRPGSq7"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-4 font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600"
            >
              <ExternalLink className="h-5 w-5" />
              {t.booking.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
