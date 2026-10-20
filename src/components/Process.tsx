import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Hammer, CheckCircle, Rocket, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';

const BOOKING_URL = 'https://calendar.app.google/HFVcLXQeyJjAro8y8';

export function Process() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const steps = [
    { icon: <MessageCircle className="w-6 h-6" />, title: t.process.step1Title, desc: t.process.step1Desc },
    { icon: <Hammer className="w-6 h-6" />, title: t.process.step2Title, desc: t.process.step2Desc },
    { icon: <CheckCircle className="w-6 h-6" />, title: t.process.step3Title, desc: t.process.step3Desc },
    { icon: <Rocket className="w-6 h-6" />, title: t.process.step4Title, desc: t.process.step4Desc },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section id="process" ref={sectionRef} className="relative py-12 sm:py-16 lg:py-24 overflow-hidden max-w-full">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Reveal className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t.process.title}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-white/50 max-w-2xl mx-auto">{t.process.subtitle}</p>
        </Reveal>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-white/5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-700 ease-out"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {steps.map((step, i) => (
                <Reveal key={i} delay={i * 150}>
                  <button
                    onClick={() => setActiveStep(i)}
                    className="group w-full text-center"
                  >
                    <div className="relative mb-6 inline-block">
                      <div
                        className={`w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          activeStep === i
                            ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-obsidian shadow-xl shadow-emerald-500/30 scale-110'
                            : activeStep < i
                            ? 'glass-panel text-white/40'
                            : 'glass-panel text-emerald-400 bg-emerald-500/10'
                        }`}
                      >
                        {activeStep < i ? (
                          <span className="text-2xl font-bold">{i + 1}</span>
                        ) : (
                          step.icon
                        )}
                      </div>
                      {activeStep === i && (
                        <div className="absolute inset-0 rounded-2xl bg-emerald-400/30 blur-xl -z-10 animate-glow-pulse" />
                      )}
                    </div>
                    <h3
                      className={`font-bold text-sm lg:text-base mb-2 transition-colors duration-300 ${
                        activeStep === i ? 'text-white' : 'text-white/50'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-xs lg:text-sm leading-relaxed transition-all duration-300 ${
                        activeStep === i ? 'text-white/60 opacity-100 max-h-24' : 'text-white/30 opacity-70 max-h-16'
                      }`}
                    >
                      {step.desc}
                    </p>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden">
          <div className="relative pl-10">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-white/5" />
            <div
              className="absolute left-3 top-2 w-0.5 bg-gradient-to-b from-emerald-500 to-cyan-500 transition-all duration-700"
              style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
            <div className="space-y-6">
              {steps.map((step, i) => (
                <Reveal key={i} delay={i * 100}>
                  <button
                    onClick={() => setActiveStep(i)}
                    className="group w-full min-w-0 text-left flex items-start gap-4"
                  >
                    <div
                      className={`absolute left-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                        activeStep === i
                          ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-obsidian scale-125'
                          : activeStep < i
                          ? 'bg-white/5 text-white/40'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {activeStep < i ? (
                        <span className="text-xs font-bold">{i + 1}</span>
                      ) : (
                        <span className="scale-50">{step.icon}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 pl-8 pt-0.5">
                      <h3
                        className={`font-bold text-sm mb-1 transition-colors ${
                          activeStep === i ? 'text-white' : 'text-white/50'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed transition-all ${
                          activeStep === i ? 'text-white/60' : 'text-white/30'
                        }`}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={400} className="text-center mt-10 sm:mt-14">
          <MagneticButton
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian font-semibold text-sm shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40"
          >
            <Rocket className="w-4 h-4" />
            {t.hero.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
