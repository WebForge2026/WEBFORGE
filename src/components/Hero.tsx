import { useState, useEffect, useRef } from 'react';
import { Calendar, Calculator, ArrowRight, Sparkles, TrendingUp, Zap, Users } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { MagneticButton } from '@/components/MagneticButton';

const BOOKING_URL = 'https://calendar.app.google/HFVcLXQeyJjAro8y8';

export function Hero() {
  const { t } = useLanguage();

  const scrollToEstimator = () => {
    const el = document.querySelector('#estimator');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-8 sm:pt-32 sm:pb-20 lg:pt-24 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          <div className="text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-panel mb-4 sm:mb-6 animate-fade-in-up">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span className="text-xs sm:text-sm text-white/70 font-medium">{t.hero.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] sm:leading-[1.05] text-white animate-fade-in-up opacity-0-init delay-100">
              {t.hero.headline}
            </h1>

            <p className="mt-3 sm:mt-6 text-sm sm:text-lg lg:text-xl text-white/60 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in-up opacity-0-init delay-300">
              {t.hero.subheadline}
            </p>

            <div className="mt-6 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center lg:justify-start animate-fade-in-up opacity-0-init delay-500">
              <MagneticButton
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian font-semibold text-sm sm:text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                {t.hero.ctaPrimary}
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton
                onClick={scrollToEstimator}
                className="w-full sm:w-auto px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl glass-panel glass-panel-hover text-white font-semibold text-sm sm:text-base"
              >
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                {t.hero.ctaSecondary}
              </MagneticButton>
            </div>

            <div className="mt-8 sm:mt-16 grid grid-cols-3 gap-2 sm:gap-4 lg:gap-8 animate-fade-in-up opacity-0-init delay-700">
              <Stat value={t.hero.stat1} label={t.hero.stat1Label} icon={<TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />} />
              <Stat value={t.hero.stat2} label={t.hero.stat2Label} icon={<Users className="w-4 h-4 sm:w-5 sm:h-5" />} />
              <Stat value={t.hero.stat3} label={t.hero.stat3Label} icon={<Zap className="w-4 h-4 sm:w-5 sm:h-5" />} />
            </div>
          </div>

          <div className="relative z-10 animate-fade-in-up opacity-0-init delay-500 mt-4 lg:mt-0">
            <DeviceMockup />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/30 font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-emerald-400 animate-bounce-slow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="text-center lg:text-left">
      <div className="flex items-center gap-1.5 sm:gap-2 justify-center lg:justify-start mb-0.5 sm:mb-1">
        <span className="text-emerald-400/70">{icon}</span>
        <span className="text-xl sm:text-3xl lg:text-4xl font-bold gradient-text-static">{value}</span>
      </div>
      <p className="text-[10px] sm:text-xs lg:text-sm text-white/40">{label}</p>
    </div>
  );
}

function DeviceMockup() {
  const { t } = useLanguage();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const [activeStat, setActiveStat] = useState(0);
  const [codeLine, setCodeLine] = useState(0);

  const codeLines = [
    '> forge create --project webforge',
    '> Installing dependencies...',
    '> Setting up Stripe payments...',
    '> Configuring email automation...',
    '> Building UI components...',
    '> Deploying to production...',
    '> Site live at web-forge.dev',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeLine((prev) => (prev + 1) % codeLines.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [codeLines.length]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 12, y: x * 12 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const stats = [
    { label: t.dashboard.revenue, value: '€128,420', change: '+310%', color: 'text-emerald-400' },
    { label: t.dashboard.visitors, value: '84,201', change: '+182%', color: 'text-cyan-400' },
    { label: t.dashboard.conversion, value: '8.7%', change: '+4.2%', color: 'text-emerald-400' },
  ];

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative perspective-1000"
    >
      <div
        className="relative preserve-3d transition-transform duration-300 ease-out"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-3xl rounded-3xl" />

        <div className="relative glass-panel rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-white/30 font-mono">web-forge.dev/dashboard</span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-white font-semibold text-sm">{t.dashboard.analyticsOverview}</h3>
                <p className="text-white/40 text-xs">{t.dashboard.realTimePerformance}</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">{t.dashboard.live}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`p-3 rounded-xl border transition-all duration-500 ${
                    activeStat === i
                      ? 'bg-white/5 border-white/15 scale-105'
                      : 'bg-white/[0.02] border-white/5'
                  }`}
                >
                  <p className="text-white/40 text-xs mb-1">{stat.label}</p>
                  <p className="text-white font-bold text-sm">{stat.value}</p>
                  <p className={`text-xs font-medium ${stat.color}`}>{stat.change}</p>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-obsidian-100 border border-white/5 mb-4">
              <div className="flex items-end justify-between h-24 gap-1.5">
                {[35, 52, 45, 68, 58, 80, 72, 95, 88, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-emerald-500/40 to-cyan-400 transition-all duration-700 ease-out"
                    style={{
                      height: `${activeStat === 0 ? h * 0.9 : activeStat === 1 ? h : h * 1.05}%`,
                      opacity: activeStat === 0 ? 0.7 : 1,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-100 border border-white/5 font-mono text-xs">
              <p className="text-emerald-400">
                {codeLines[codeLine]}
                <span className="inline-block w-2 h-3 bg-emerald-400 ml-1 animate-pulse" />
              </p>
            </div>
          </div>
        </div>

        <div
          className="absolute -top-6 -right-6 glass-panel rounded-xl p-3 animate-float shadow-xl hidden sm:block"
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-white text-xs font-semibold">99/100</p>
              <p className="text-white/40 text-xs">{t.dashboard.lighthouse}</p>
            </div>
          </div>
        </div>

        <div
          className="absolute -bottom-4 -left-6 glass-panel rounded-xl p-3 animate-float-slow shadow-xl hidden sm:block"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-white text-xs font-semibold">+310%</p>
              <p className="text-white/40 text-xs">{t.dashboard.roiGrowth}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
