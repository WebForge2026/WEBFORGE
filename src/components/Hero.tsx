import { CalendarCheck, Eye, Zap } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function Hero({ onGetQuote }: { onGetQuote: () => void }) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-36 md:pb-32 md:pt-48">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-medium text-brand-400">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          {t.hero.badge}
        </div>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          {t.hero.titlePrefix}{' '}
          <span className="bg-gradient-to-r from-brand-400 to-emerald-200 bg-clip-text text-transparent">
            {t.hero.titleHighlight}
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
          {t.hero.description}
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={onGetQuote}
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-8 py-4 font-semibold text-white shadow-xl shadow-brand-500/25 transition hover:bg-brand-600"
          >
            <Zap className="h-5 w-5" />
            {t.hero.quoteCta}
          </button>
          <a
            href="#booking"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-8 py-4 font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            <CalendarCheck className="h-5 w-5" />
            {t.hero.bookCta}
          </a>
        </div>
        <div className="mt-4">
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-brand-400"
          >
            <Eye className="h-4 w-4" />
            {t.hero.portfolioCta}
          </a>
        </div>
      </div>
    </section>
  );
}
