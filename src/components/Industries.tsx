import { useState } from 'react';
import { UtensilsCrossed, Scissors, Dumbbell, Wrench, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';

const BOOKING_URL = 'https://calendar.app.google/HFVcLXQeyJjAro8y8';

type IndustryKey = 'gastronomy' | 'barber' | 'fitness' | 'localServices';

export function Industries() {
  const { t } = useLanguage();
  const [active, setActive] = useState<IndustryKey>('gastronomy');

  const industries: {
    key: IndustryKey;
    label: string;
    icon: React.ReactNode;
    gradient: string;
    benefits: [string, string, string];
    mockup: React.ReactNode;
  }[] = [
    {
      key: 'gastronomy',
      label: t.industries.gastronomy,
      icon: <UtensilsCrossed className="w-5 h-5" />,
      gradient: 'from-amber-500/15 to-orange-500/10',
      benefits: [
        t.industries.gastronomyBenefit1,
        t.industries.gastronomyBenefit2,
        t.industries.gastronomyBenefit3,
      ],
      mockup: <GastronomyMockup t={t} />,
    },
    {
      key: 'barber',
      label: t.industries.barber,
      icon: <Scissors className="w-5 h-5" />,
      gradient: 'from-emerald-500/15 to-cyan-500/10',
      benefits: [
        t.industries.barberBenefit1,
        t.industries.barberBenefit2,
        t.industries.barberBenefit3,
      ],
      mockup: <BarberMockup t={t} />,
    },
    {
      key: 'fitness',
      label: t.industries.fitness,
      icon: <Dumbbell className="w-5 h-5" />,
      gradient: 'from-cyan-500/15 to-emerald-500/10',
      benefits: [
        t.industries.fitnessBenefit1,
        t.industries.fitnessBenefit2,
        t.industries.fitnessBenefit3,
      ],
      mockup: <FitnessMockup t={t} />,
    },
    {
      key: 'localServices',
      label: t.industries.localServices,
      icon: <Wrench className="w-5 h-5" />,
      gradient: 'from-emerald-500/15 to-cyan-500/10',
      benefits: [
        t.industries.localServicesBenefit1,
        t.industries.localServicesBenefit2,
        t.industries.localServicesBenefit3,
      ],
      mockup: <LocalServicesMockup t={t} />,
    },
  ];

  const current = industries.find((ind) => ind.key === active)!;

  return (
    <section id="industries" className="relative py-12 sm:py-16 lg:py-24 overflow-hidden max-w-full">
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Reveal className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t.industries.title}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-white/50 max-w-2xl mx-auto">{t.industries.subtitle}</p>
        </Reveal>

        {/* Tab selector */}
        <Reveal delay={100} className="mb-8 sm:mb-12">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar snap-carousel pb-1 md:flex-wrap md:justify-center -mx-4 px-4 md:mx-0 md:px-0">
            {industries.map((ind) => (
              <button
                key={ind.key}
                onClick={() => setActive(ind.key)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  active === ind.key
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian shadow-lg shadow-emerald-500/20'
                    : 'glass-panel glass-panel-hover text-white/60'
                }`}
              >
                {ind.icon}
                {ind.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Content area: benefits + visual mockup */}
        <Reveal delay={200}>
          <div
            key={active}
            className={`glass-panel rounded-3xl overflow-hidden relative animate-fade-in-up`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient} opacity-40 pointer-events-none`} />

            <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-center">
              {/* Benefits list */}
              <div className="p-6 sm:p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-obsidian shadow-lg shadow-emerald-500/20">
                    {current.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{current.label}</h3>
                </div>

                <div className="space-y-4">
                  {current.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 animate-fade-in-up"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-emerald-400" strokeWidth={3} />
                      </div>
                      <p className="text-white/70 text-sm sm:text-base leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <MagneticButton
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian font-semibold text-sm shadow-lg shadow-emerald-500/20"
                  >
                    {t.hero.ctaPrimary}
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </div>
              </div>

              {/* Visual mockup */}
              <div className="relative p-6 sm:p-8 lg:p-10 hidden sm:block">
                {current.mockup}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Visual mockups per industry --- */

function MockupShell({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div
      className="relative glass-panel rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10 animate-fade-in-up"
      style={{ transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)' }}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-white/30 font-mono">{label}</span>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function GastronomyMockup({ t }: { t: ReturnType<typeof useLanguage>['t'] }) {
  return (
    <MockupShell label="restaurant.com/reserve">
      <div className="space-y-3">
        <div className="text-center mb-4">
          <UtensilsCrossed className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <p className="text-white font-semibold text-sm">{t.industries.reservationTitle}</p>
          <p className="text-white/40 text-xs">{t.industries.noCommission}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[`${t.industries.today} 19:00`, `${t.industries.today} 20:30`, `${t.industries.tomorrow} 18:00`, `${t.industries.tomorrow} 21:00`].map((slot) => (
            <div
              key={slot}
              className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center text-xs text-emerald-400 font-medium hover:bg-emerald-500/20 transition-colors cursor-pointer"
            >
              {slot}
            </div>
          ))}
        </div>
        <div className="p-2.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center gap-2">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs text-emerald-400 font-medium">{t.industries.reserveFree}</span>
        </div>
      </div>
    </MockupShell>
  );
}

function BarberMockup({ t }: { t: ReturnType<typeof useLanguage>['t'] }) {
  return (
    <MockupShell label="barber.shop/book">
      <div className="space-y-3">
        <div className="text-center mb-4">
          <Scissors className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <p className="text-white font-semibold text-sm">{t.industries.appointmentTitle}</p>
          <p className="text-white/40 text-xs">{t.industries.openAllDay}</p>
        </div>
        {[`${t.industries.fadeCut} — €25`, `${t.industries.beardTrim} — €15`, `${t.industries.hotTowelShave} — €20`].map((service) => (
          <div
            key={service}
            className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/5"
          >
            <span className="text-white/70 text-xs">{service}</span>
            <div className="w-6 h-6 rounded-md bg-emerald-500/15 flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-emerald-400" />
            </div>
          </div>
        ))}
        <div className="p-2.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center gap-2">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs text-emerald-400 font-medium">{t.industries.pickTime}</span>
        </div>
      </div>
    </MockupShell>
  );
}

function FitnessMockup({ t }: { t: ReturnType<typeof useLanguage>['t'] }) {
  return (
    <MockupShell label="fitstudio.com/trial">
      <div className="space-y-3">
        <div className="text-center mb-4">
          <Dumbbell className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
          <p className="text-white font-semibold text-sm">{t.industries.trialTitle}</p>
          <p className="text-white/40 text-xs">{t.industries.requestFromPhone}</p>
        </div>
        <div className="space-y-2">
          {[
            { day: t.industries.monday, time: '10:00 — 11:00', spots: `3 ${t.industries.spots}` },
            { day: t.industries.wednesday, time: '18:00 — 19:00', spots: `1 ${t.industries.spots}` },
            { day: t.industries.saturday, time: '09:00 — 10:00', spots: `5 ${t.industries.spots}` },
          ].map((slot) => (
            <div
              key={slot.day}
              className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/5"
            >
              <div>
                <p className="text-white/70 text-xs font-medium">{slot.day}</p>
                <p className="text-white/40 text-xs">{slot.time}</p>
              </div>
              <span className="text-cyan-400 text-xs font-medium">{slot.spots}</span>
            </div>
          ))}
        </div>
        <div className="p-2.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/20 flex items-center justify-center gap-2">
          <Check className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs text-cyan-400 font-medium">{t.industries.claimTrial}</span>
        </div>
      </div>
    </MockupShell>
  );
}

function LocalServicesMockup({ t }: { t: ReturnType<typeof useLanguage>['t'] }) {
  return (
    <MockupShell label="localservice.com">
      <div className="space-y-3">
        <div className="text-center mb-4">
          <Wrench className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <p className="text-white font-semibold text-sm">{t.services.foundOnGoogle}</p>
          <p className="text-white/40 text-xs">{t.industries.customersNearYou}</p>
        </div>
        <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-xs">{t.industries.googleSearch}</span>
            <span className="text-emerald-400 text-xs font-medium">{t.industries.rankOne}</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-[92%] bg-gradient-to-r from-emerald-500 to-cyan-500" />
          </div>
        </div>
        {[`5.0 ★★★★★ (${t.industries.reviewsCount})`, `${t.industries.openNow} — ${t.industries.callToday}`, `2 km ${t.industries.away}`].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-white/70 text-xs">{item}</span>
          </div>
        ))}
        <div className="p-2.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center gap-2">
          <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs text-emerald-400 font-medium">{t.industries.requestQuote}</span>
        </div>
      </div>
    </MockupShell>
  );
}
