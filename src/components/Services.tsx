import { useState, useRef, useEffect } from 'react';
import { Code2, CreditCard, Mail, Palette, Gauge, Server, Check, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Reveal } from '@/components/Reveal';

export function Services() {
  const { t } = useLanguage();

  const allCards = [
    { icon: <Code2 className="w-6 h-6" />, title: t.services.webTitle, desc: t.services.webDesc, featured: true, children: <CodePreview t={t} /> },
    { icon: <CreditCard className="w-6 h-6" />, title: t.services.paymentTitle, desc: t.services.paymentDesc, children: <PaymentSim t={t} /> },
    { icon: <Mail className="w-6 h-6" />, title: t.services.emailTitle, desc: t.services.emailDesc, children: <WorkflowViz t={t} /> },
    { icon: <Palette className="w-6 h-6" />, title: t.services.designTitle, desc: t.services.designDesc, children: <DesignCanvas /> },
    { icon: <Gauge className="w-6 h-6" />, title: t.services.seoTitle, desc: t.services.seoDesc, children: <LighthouseBadge t={t} /> },
    { icon: <Server className="w-6 h-6" />, title: t.services.enterpriseTitle, desc: t.services.enterpriseDesc, children: <EnterpriseViz t={t} />, wide: true },
  ];

  return (
    <section id="services" className="relative py-12 sm:py-16 lg:py-24 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t.services.title}
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/50 max-w-2xl mx-auto">{t.services.subtitle}</p>
        </Reveal>

        {/* Desktop: Bento grid (unchanged) */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-5 auto-rows-[minmax(260px,auto)]">
          <Reveal delay={0} className="md:col-span-2 md:row-span-2">
            <ServiceCard icon={allCards[0].icon} title={allCards[0].title} desc={allCards[0].desc} className="h-full" featured>
              {allCards[0].children}
            </ServiceCard>
          </Reveal>
          {allCards.slice(1, 5).map((c, i) => (
            <Reveal key={c.title} delay={(i + 1) * 100}>
              <ServiceCard icon={c.icon} title={c.title} desc={c.desc}>
                {c.children}
              </ServiceCard>
            </Reveal>
          ))}
          <Reveal delay={500} className="md:col-span-2">
            <ServiceCard icon={allCards[5].icon} title={allCards[5].title} desc={allCards[5].desc}>
              {allCards[5].children}
            </ServiceCard>
          </Reveal>
        </div>

        {/* Mobile: horizontal snap carousel */}
        <div className="md:hidden">
          <ServiceCarousel cards={allCards} />
        </div>
      </div>
    </section>
  );
}

interface MobileCardData {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children?: React.ReactNode;
  featured?: boolean;
  wide?: boolean;
}

function ServiceCarousel({ cards }: { cards: MobileCardData[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / cards.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIdx(idx);
  };

  const scrollTo = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / cards.length;
    el.scrollTo({ left: cardWidth * idx, behavior: 'smooth' });
  };

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar snap-carousel pb-2 -mx-4 px-4"
      >
        {cards.map((card, i) => (
          <div key={i} className="snap-center shrink-0 w-[78%]">
            <MobileServiceCard
              icon={card.icon}
              title={card.title}
              desc={card.desc}
              featured={card.featured}
            >
              {card.children}
            </MobileServiceCard>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIdx === i ? 'w-6 bg-emerald-400' : 'w-1.5 bg-white/20'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function MobileServiceCard({ icon, title, desc, children, featured = false }: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children?: React.ReactNode;
  featured?: boolean;
}) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-panel glass-panel-hover p-5 overflow-hidden min-h-[280px] flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${featured ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/5 text-white/70'}`}>
          {icon}
        </div>
        <ArrowUpRight className="w-5 h-5 text-white/20" />
      </div>

      <h3 className="font-bold text-white mb-1.5 text-base break-words">{title}</h3>
      <p className="text-white/50 text-xs leading-relaxed mb-3">{desc}</p>

      {children && (
        <div className="mt-auto">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-emerald-400 font-medium mb-2"
          >
            {expanded ? t.ui.hideDetails : t.ui.showDetails}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
          <div className={`min-w-0 overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'}`}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children?: React.ReactNode;
  className?: string;
  featured?: boolean;
}

function ServiceCard({ icon, title, desc, children, className = '', featured = false }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setGlowPos({ x: x * 100, y: y * 100 });
    setTilt({ x: -(y - 0.5) * 6, y: (x - 0.5) * 6 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setGlowPos({ x: 50, y: 50 }); }}
      className={`group relative glass-panel glass-panel-hover p-6 overflow-hidden h-full transition-transform duration-300 ease-out ${className}`}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, rgba(16,185,129,0.08), transparent 70%)` }}
      />
      <div className="relative z-10 flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${featured ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/5 text-white/70'}`}>
          {icon}
        </div>
        <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-emerald-400 group-hover:rotate-45 transition-all duration-300" />
      </div>
      <h3 className={`relative z-10 font-bold text-white mb-2 ${featured ? 'text-xl lg:text-2xl' : 'text-lg'}`}>{title}</h3>
      <p className="relative z-10 text-white/50 text-sm leading-relaxed mb-4">{desc}</p>
      {children && <div className="relative z-10 mt-auto">{children}</div>}
    </div>
  );
}

function CodePreview({ t }: { t: ReturnType<typeof useLanguage>['t'] }) {
  const messages = [
    t.services.bookingReceived,
    t.services.appointmentBooked,
    t.services.orderPlaced,
    t.services.trialRequested,
  ];
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveLine((p) => (p + 1) % messages.length), 2000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-full min-w-0 rounded-xl bg-obsidian-100 border border-white/5 p-4 space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-white/40">{t.services.liveBookings}</span>
      </div>
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`min-w-0 break-words py-1.5 px-2 rounded-lg text-xs leading-relaxed transition-all duration-300 ${
            activeLine === i ? 'bg-emerald-500/10 text-emerald-400 font-medium' : 'text-white/30'
          }`}
        >
          {msg}
        </div>
      ))}
    </div>
  );
}

function PaymentSim({ t }: { t: ReturnType<typeof useLanguage>['t'] }) {
  return (
    <div className="w-full min-w-0 rounded-xl bg-obsidian-100 border border-white/5 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="text-white/40 text-xs">{t.services.yourWebsite}</span>
        <span className="text-xs text-emerald-400 font-medium">{t.services.directToYou}</span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span className="text-white/40 text-xs">{t.services.booking}</span>
        <span className="text-white font-bold text-sm">{t.services.zeroCommission}</span>
      </div>
      <div className="h-8 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center gap-2">
        <Check className="w-3 h-3 text-emerald-400" />
        <span className="text-xs text-emerald-400 font-medium">{t.services.bookingConfirmed}</span>
      </div>
    </div>
  );
}

function WorkflowViz({ t }: { t: ReturnType<typeof useLanguage>['t'] }) {
  return (
    <div className="w-full min-w-0 rounded-xl bg-obsidian-100 border border-white/5 p-4">
      <div className="space-y-2">
        {[t.services.clientBooks, t.services.instantConfirmation, t.services.notifiedAutomatically].map((step, i) => (
          <div key={step} className="flex min-w-0 items-start gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
              {i + 1}
            </div>
            <span className="min-w-0 break-words text-xs leading-relaxed text-white/60">{step}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-white/40">{t.services.runningAutomatically}</span>
      </div>
    </div>
  );
}

function DesignCanvas() {
  return (
    <div className="rounded-xl bg-obsidian-100 border border-white/5 p-4 h-20 flex items-center justify-around">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 animate-float" />
      <div className="w-10 h-10 rounded-full border-2 border-white/20 animate-float-slow" />
      <div className="w-10 h-10 rotate-45 border-2 border-emerald-400/40 animate-float" />
      <div className="w-10 h-10 rounded-lg border-2 border-dashed border-white/15" />
    </div>
  );
}

function LighthouseBadge({ t }: { t: ReturnType<typeof useLanguage>['t'] }) {
  return (
    <div className="rounded-xl bg-obsidian-100 border border-white/5 p-4 flex flex-col items-center justify-center gap-2">
      <div className="relative">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="url(#grad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="2.5" />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">99</span>
        </div>
      </div>
      <span className="text-xs text-white/40 text-center">{t.services.foundOnGoogle}</span>
    </div>
  );
}

function EnterpriseViz({ t }: { t: ReturnType<typeof useLanguage>['t'] }) {
  const features = [t.services.website, t.services.bookings, t.services.payments, t.services.emails, t.services.seo, t.services.mobile, t.services.reviews, t.services.analytics];
  return (
    <div className="rounded-xl bg-obsidian-100 border border-white/5 p-4">
      <div className="flex flex-wrap gap-2">
        {features.map((feature, i) => (
          <div key={feature} className="flex min-w-0 flex-1 basis-[calc(50%-0.5rem)] items-center justify-center gap-1 rounded-lg border border-white/5 bg-white/5 px-2 py-1.5 text-center text-xs font-mono text-white/50 sm:basis-[calc(25%-0.5rem)]" style={{ animation: `glowPulse 3s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
            <Check className="w-3 h-3 text-emerald-400" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}
