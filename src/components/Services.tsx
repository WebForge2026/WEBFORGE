import { Code2, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const icons: LucideIcon[] = [Code2, SlidersHorizontal, ShieldCheck];

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="border-y border-slate-800/80 bg-slate-900/50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">{t.services.title}</h2>
          <p className="text-slate-400">{t.services.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-800 bg-brand-card p-8 transition hover:border-brand-500/50"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-xl text-brand-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
