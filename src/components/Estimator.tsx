import { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, Check, Calendar, Rocket, Globe, ShoppingCart, AppWindow, Workflow, Layout, CreditCard, Mail, Search, Sparkles, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';
import { supabase } from '@/lib/supabase';
import { estimatorFormSchema } from '@/lib/validation';
import type { ProjectScope, LanguageRequirement, AddOn } from '@/types';

const BOOKING_URL = 'https://calendar.app.google/HFVcLXQeyJjAro8y8';

const SCOPE_PRICES: Record<ProjectScope, { min: number; max: number; weeks: number }> = {
  brand_site: { min: 600, max: 700, weeks: 2 },
  ecommerce: { min: 1200, max: 1400, weeks: 4 },
  web_app: { min: 2000, max: 3500, weeks: 6 },
  automation_portal: { min: 3000, max: 5000, weeks: 7 },
};

const ADDON_PRICES: Record<AddOn, { price: number; weeks: number }> = {
  admin_dashboard: { price: 250, weeks: 1 },
  payment_gateway: { price: 200, weeks: 1 },
  email_automation: { price: 150, weeks: 1 },
  seo_package: { price: 100, weeks: 1 },
};

const MULTI_LANG_MULTIPLIER = 1.15;

export function Estimator() {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(0);
  const [scope, setScope] = useState<ProjectScope | null>(null);
  const [langReq, setLangReq] = useState<LanguageRequirement | null>(null);
  const [addons, setAddons] = useState<AddOn[]>([]);
  const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const totalSteps = 4;

  const estimate = useMemo(() => {
    if (!scope) return null;
    const base = SCOPE_PRICES[scope];
    let min = base.min;
    let max = base.max;
    let weeks = base.weeks;

    if (langReq === 'multi') {
      min = Math.round(min * MULTI_LANG_MULTIPLIER);
      max = Math.round(max * MULTI_LANG_MULTIPLIER);
      weeks += 1;
    }

    addons.forEach((addon) => {
      min += ADDON_PRICES[addon].price;
      max += ADDON_PRICES[addon].price;
      weeks += ADDON_PRICES[addon].weeks;
    });

    return { min, max, weeks };
  }, [scope, langReq, addons]);

  const toggleAddon = (addon: AddOn) => {
    setAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const nextStep = () => {
    if (step === 0 && !scope) return;
    if (step === 1 && !langReq) return;
    setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    const formData = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      project_scope: scope!,
      language_requirement: langReq!,
      addons,
      message: contact.message,
    };

    const result = estimatorFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = String(issue.path[0] ?? '');
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (honeypot) {
      setShowSuccess(true);
      return;
    }

    setSubmitting(true);
    setErrors({});

    const budgetStr = estimate ? `€${estimate.min.toLocaleString()} – €${estimate.max.toLocaleString()}` : '';

    try {
      const { error } = await supabase.from('leads').insert({
        name: contact.name,
        email: contact.email,
        phone: contact.phone || null,
        project_type: scope!,
        features_selected: addons,
        estimated_budget: budgetStr,
        message: contact.message || null,
        language,
      });

      if (error) {
        setErrors({ submit: 'error' });
        return;
      }

      setShowSuccess(true);
    } catch {
      setErrors({ submit: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep(0);
    setScope(null);
    setLangReq(null);
    setAddons([]);
    setContact({ name: '', email: '', phone: '', message: '' });
    setErrors({});
    setShowSuccess(false);
  };

  const scopeOptions: { key: ProjectScope; label: string; desc: string; icon: React.ReactNode }[] = [
    { key: 'brand_site', label: t.estimator.brandSite, desc: t.estimator.brandSiteDesc, icon: <Globe className="w-5 h-5" /> },
    { key: 'ecommerce', label: t.estimator.ecommerce, desc: t.estimator.ecommerceDesc, icon: <ShoppingCart className="w-5 h-5" /> },
    { key: 'web_app', label: t.estimator.webApp, desc: t.estimator.webAppDesc, icon: <AppWindow className="w-5 h-5" /> },
    { key: 'automation_portal', label: t.estimator.automationPortal, desc: t.estimator.automationPortalDesc, icon: <Workflow className="w-5 h-5" /> },
  ];

  const addonOptions: { key: AddOn; label: string; desc: string; icon: React.ReactNode; price: string }[] = [
    { key: 'admin_dashboard', label: t.estimator.adminDashboard, desc: t.estimator.adminDashboardDesc, icon: <Layout className="w-5 h-5" />, price: `+€${ADDON_PRICES.admin_dashboard.price.toLocaleString()}` },
    { key: 'payment_gateway', label: t.estimator.paymentGateway, desc: t.estimator.paymentGatewayDesc, icon: <CreditCard className="w-5 h-5" />, price: `+€${ADDON_PRICES.payment_gateway.price.toLocaleString()}` },
    { key: 'email_automation', label: t.estimator.emailAutomation, desc: t.estimator.emailAutomationDesc, icon: <Mail className="w-5 h-5" />, price: `+€${ADDON_PRICES.email_automation.price.toLocaleString()}` },
    { key: 'seo_package', label: t.estimator.seoPackage, desc: t.estimator.seoPackageDesc, icon: <Search className="w-5 h-5" />, price: `+€${ADDON_PRICES.seo_package.price.toLocaleString()}` },
  ];

  return (
    <section id="estimator" className="relative py-12 sm:py-16 lg:py-24 overflow-hidden max-w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-3 sm:mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm text-white/70 font-medium">WebForge Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t.estimator.title}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-white/50">{t.estimator.subtitle}</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="glass-panel rounded-3xl p-4 sm:p-6 lg:p-10">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                      i < step
                        ? 'bg-emerald-500 text-obsidian'
                        : i === step
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian shadow-lg shadow-emerald-500/30'
                        : 'bg-white/5 text-white/30'
                    }`}
                  >
                    {i < step ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div className={`flex-1 h-0.5 mx-1.5 sm:mx-2 transition-colors duration-300 ${i < step ? 'bg-emerald-500' : 'bg-white/5'}`} />
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-white/40 mb-4 sm:mb-6">
              {t.estimator.step} {step + 1} {t.estimator.of} {totalSteps}
            </p>

            {step === 0 && (
              <div className="animate-fade-in-up">
                <h3 className="text-xl font-semibold text-white mb-6">{t.estimator.projectScope}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {scopeOptions.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setScope(opt.key)}
                      className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
                        scope === opt.key
                          ? 'bg-emerald-500/10 border-emerald-500/40'
                          : 'glass-panel glass-panel-hover'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${scope === opt.key ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/60'}`}>
                        {opt.icon}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{opt.label}</p>
                        <p className="text-white/40 text-xs mt-1">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="animate-fade-in-up">
                <h3 className="text-xl font-semibold text-white mb-6">{t.estimator.languageReq}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { key: 'single' as const, label: t.estimator.singleLang, desc: t.estimator.singleLangDesc, icon: <Globe className="w-5 h-5" /> },
                    { key: 'multi' as const, label: t.estimator.multiLang, desc: t.estimator.multiLangDesc, icon: <Globe className="w-5 h-5" /> },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setLangReq(opt.key)}
                      className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
                        langReq === opt.key
                          ? 'bg-emerald-500/10 border-emerald-500/40'
                          : 'glass-panel glass-panel-hover'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${langReq === opt.key ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/60'}`}>
                        {opt.icon}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{opt.label}</p>
                        <p className="text-white/40 text-xs mt-1">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in-up">
                <h3 className="text-xl font-semibold text-white mb-6">{t.estimator.addons}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {addonOptions.map((opt) => {
                    const selected = addons.includes(opt.key);
                    return (
                      <button
                        key={opt.key}
                        onClick={() => toggleAddon(opt.key)}
                        className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
                          selected ? 'bg-emerald-500/10 border-emerald-500/40' : 'glass-panel glass-panel-hover'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/60'}`}>
                          {opt.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-white font-medium text-sm">{opt.label}</p>
                            <span className="text-emerald-400/60 text-xs font-mono">{opt.price}</span>
                          </div>
                          <p className="text-white/40 text-xs mt-1">{opt.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'}`}>
                          {selected && <Check className="w-3 h-3 text-obsidian" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && estimate && (
              <div className="animate-fade-in-up">
                <h3 className="text-xl font-semibold text-white mb-6">{t.estimator.yourInfo}</h3>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="glass-panel rounded-2xl p-5 text-center">
                    <p className="text-white/40 text-xs mb-2">{t.estimator.estimatedBudget}</p>
                    <p className="text-2xl lg:text-3xl font-bold gradient-text-static">
                      €{estimate.min.toLocaleString()} – €{estimate.max.toLocaleString()}
                    </p>
                  </div>
                  <div className="glass-panel rounded-2xl p-5 text-center">
                    <p className="text-white/40 text-xs mb-2">{t.estimator.estimatedTimeline}</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">
                      {estimate.weeks} <span className="text-base text-white/40">{t.estimator.weeks}</span>
                    </p>
                  </div>
                </div>

                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label={t.estimator.name} error={errors.name}>
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                      className="form-input"
                    />
                  </FormField>
                  <FormField label={t.estimator.email} error={errors.email}>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      className="form-input"
                    />
                  </FormField>
                  <FormField label={t.estimator.phone}>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      className="form-input"
                    />
                  </FormField>
                  <FormField label={t.estimator.message}>
                    <input
                      type="text"
                      value={contact.message}
                      onChange={(e) => setContact({ ...contact, message: e.target.value })}
                      className="form-input"
                      placeholder={t.estimator.messagePlaceholder}
                    />
                  </FormField>
                </div>

                {errors.submit && (
                  <p className="mt-4 text-sm text-red-400">{t.contact.error}</p>
                )}
              </div>
            )}

            <div className="flex items-center justify-between mt-6 sm:mt-8">
              <button
                onClick={prevStep}
                disabled={step === 0}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  step === 0 ? 'opacity-30 pointer-events-none' : 'glass-panel glass-panel-hover text-white'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                {t.estimator.back}
              </button>

              {step < totalSteps - 1 ? (
                <button
                  onClick={nextStep}
                  disabled={(step === 0 && !scope) || (step === 1 && !langReq)}
                  className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    (step === 0 && !scope) || (step === 1 && !langReq)
                      ? 'bg-white/5 text-white/30 pointer-events-none'
                      : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian shadow-lg shadow-emerald-500/20'
                  }`}
                >
                  {t.estimator.next}
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  {submitting ? '...' : <><Rocket className="w-4 h-4" /> {t.estimator.submitLead}</>}
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {showSuccess && (
        <SuccessModal onClose={reset} />
      )}

      <style>{`
        .form-input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .form-input:focus {
          outline: none;
          border-color: rgba(16,185,129,0.5);
          background: rgba(255,255,255,0.05);
        }
        .form-input::placeholder {
          color: rgba(255,255,255,0.3);
        }
      `}</style>
    </section>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-white/50 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-scale-in">
      <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-xl" onClick={onClose} />

      <div className="relative glass-panel rounded-3xl p-8 lg:p-10 max-w-md w-full text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full glass-panel flex items-center justify-center hover:bg-white/10"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <div className="relative mb-6 inline-block">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-obsidian" strokeWidth={3} />
          </div>
          <div className="absolute inset-0 rounded-full bg-emerald-400/30 blur-2xl -z-10 animate-glow-pulse" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-3">{t.estimator.successTitle}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-8">{t.estimator.successMessage}</p>

        <MagneticButton
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian font-semibold shadow-xl shadow-emerald-500/25"
        >
          <Calendar className="w-5 h-5" />
          {t.estimator.bookConsultation}
        </MagneticButton>

        <button
          onClick={onClose}
          className="mt-3 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          {t.estimator.close}
        </button>
      </div>
    </div>
  );
}
