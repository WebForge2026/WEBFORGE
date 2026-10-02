import { Mail, Calendar, Quote, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';

const BOOKING_URL = 'https://calendar.app.google/HFVcLXQeyJjAro8y8';

export function Founders() {
  const { t } = useLanguage();

  return (
    <section id="founders" className="relative py-12 sm:py-16 lg:py-24 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-4">
            <span className="text-sm text-emerald-400 font-medium">{t.founders.mindsBehind}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t.founders.title}
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">{t.founders.subtitle}</p>
        </Reveal>

        {/* Desktop: side-by-side grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          <Reveal delay={0} direction="left">
            <FounderCard
              name={t.founders.angelName}
              role={t.founders.angelRole}
              email="kodzhebashev@web-forge.dev"
              quote={t.founders.angelQuote}
              gradient="from-emerald-500/15 to-cyan-500/10"
              initials="AK"
            />
          </Reveal>

          <Reveal delay={150} direction="right">
            <FounderCard
              name={t.founders.todorName}
              role={t.founders.todorRole}
              email="shopov@web-forge.dev"
              quote={t.founders.todorQuote}
              gradient="from-cyan-500/15 to-emerald-500/10"
              initials="TS"
            />
          </Reveal>
        </div>

        {/* Mobile: horizontal carousel */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar snap-carousel pb-2">
            <div className="snap-center shrink-0 w-[85%]">
              <FounderCard
                name={t.founders.angelName}
                role={t.founders.angelRole}
                email="kodzhebashev@web-forge.dev"
                quote={t.founders.angelQuote}
                gradient="from-emerald-500/15 to-cyan-500/10"
                initials="AK"
              />
            </div>
            <div className="snap-center shrink-0 w-[85%]">
              <FounderCard
                name={t.founders.todorName}
                role={t.founders.todorRole}
                email="shopov@web-forge.dev"
                quote={t.founders.todorQuote}
                gradient="from-cyan-500/15 to-emerald-500/10"
                initials="TS"
              />
            </div>
          </div>
        </div>

        <Reveal delay={300} className="text-center mt-12">
          <MagneticButton
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian font-semibold shadow-xl shadow-emerald-500/25"
          >
            <Calendar className="w-5 h-5" />
            {t.founders.bookTeamCall}
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}

interface FounderCardProps {
  name: string;
  role: string;
  email: string;
  quote: string;
  gradient: string;
  initials: string;
}

function FounderCard({ name, role, email, quote, gradient, initials }: FounderCardProps) {
  const { t } = useLanguage();
  return (
    <div className={`group relative glass-panel rounded-3xl p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:border-white/20 hover:scale-[1.02]`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />

      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />

      <div className="relative z-10">
        <div className="flex items-start gap-5 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-obsidian font-bold text-2xl shadow-xl shadow-emerald-500/20">
              {initials}
            </div>
            <div className="absolute inset-0 rounded-2xl bg-emerald-400/30 blur-xl -z-10" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-emerald-400 text-sm font-medium mt-1">{role}</p>
          </div>
        </div>

        <div className="relative mb-6">
          <Quote className="absolute -top-2 -left-1 w-8 h-8 text-white/5" />
          <p className="text-white/60 text-sm leading-relaxed italic pl-6">
            "{quote}"
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`mailto:${email}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl glass-panel glass-panel-hover text-white text-sm font-medium"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            {t.founders.emailButton}
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
