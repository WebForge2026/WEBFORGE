import { useState, useMemo } from 'react';
import { X, Check, ChevronRight, ChevronLeft, Zap, CalendarCheck, Loader2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { supabase } from '@/lib/supabase';

interface QuoteData {
  websiteType: string;
  numPages: number;
  numImages: number;
  onlinePayments: boolean;
  notifications: boolean;
  multilingual: boolean;
  languages: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
}

const PRICE_PER_PAGE = 50;
const PRICE_PER_IMAGE = 5;
const PRICE_ONLINE_PAYMENTS = 200;
const PRICE_NOTIFICATIONS = 100;
const PRICE_MULTILINGUAL = 150;

const CALENDAR_URL = 'https://calendar.app.google/CKAcrtzWwcHRPGSq7';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[0-9+() .-]{5,40}$/;

export function InstantQuoteModal({ onClose }: { onClose: () => void }) {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedPrice, setSubmittedPrice] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [data, setData] = useState<QuoteData>({
    websiteType: '',
    numPages: 3,
    numImages: 10,
    onlinePayments: false,
    notifications: false,
    multilingual: false,
    languages: language === 'bg' ? 'Български' : '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: '',
  });

  const totalSteps = 5;

  const price = useMemo(() => {
    const typeData = t.quote.websiteTypes.find((wt) => wt.value === data.websiteType);
    const basePrice = typeData?.price ?? 0;
    const pagesPrice = data.numPages * PRICE_PER_PAGE;
    const imagesPrice = data.numImages * PRICE_PER_IMAGE;
    const featuresPrice =
      (data.onlinePayments ? PRICE_ONLINE_PAYMENTS : 0) +
      (data.notifications ? PRICE_NOTIFICATIONS : 0) +
      (data.multilingual ? PRICE_MULTILINGUAL : 0);
    return basePrice + pagesPrice + imagesPrice + featuresPrice;
  }, [data, t.quote.websiteTypes]);

  const getContactError = () => {
    if (data.customerName.trim().length < 1 || data.customerName.trim().length > 120) {
      return t.quote.invalidName;
    }
    if (!emailPattern.test(data.customerEmail.trim()) || data.customerEmail.trim().length > 254) {
      return t.quote.invalidEmail;
    }
    if (data.customerPhone.trim() && !phonePattern.test(data.customerPhone.trim())) {
      return t.quote.invalidPhone;
    }
    if (data.notes.length > 2000) return t.quote.invalidNotes;
    return '';
  };

  const canProceed = () => {
    if (step === 1) return data.websiteType !== '';
    if (step === 4) return getContactError() === '';
    return true;
  };

  const handleSubmit = async () => {
    if (submitting || submitted) return;
    const contactError = getContactError();
    if (contactError || !data.websiteType || data.numPages < 1 || data.numPages > 20 || data.numImages < 0 || data.numImages > 100) {
      setError(contactError || t.quote.error);
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const { data: serverPrice, error: submitError } = await supabase.rpc('submit_quote', {
        p_website_type: data.websiteType,
        p_num_pages: data.numPages,
        p_num_images: data.numImages,
        p_online_payments: data.onlinePayments,
        p_notifications: data.notifications,
        p_multilingual: data.multilingual,
        p_languages: data.languages,
        p_customer_name: data.customerName,
        p_customer_email: data.customerEmail,
        p_customer_phone: data.customerPhone,
        p_notes: data.notes,
        p_honeypot: honeypot,
      });

      const confirmedPrice = Number(serverPrice);
      if (submitError || !Number.isFinite(confirmedPrice) || confirmedPrice < 0) {
        console.error('Quote submission failed', submitError);
        throw new Error('Quote submission failed');
      }
      setSubmittedPrice(confirmedPrice);
      setSubmitted(true);
    } catch {
      setError(t.quote.error);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedType = t.quote.websiteTypes.find((wt) => wt.value === data.websiteType);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 bg-brand-dark shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-brand-dark/95 backdrop-blur-md px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-brand-400" />
              {t.quote.title}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{t.quote.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress bar */}
        {!submitted && (
          <div className="px-6 pt-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <span>{t.quote.step} {step} {t.quote.of} {totalSteps}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-brand-500 transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <input
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-px w-px opacity-0"
          />
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
                <Check className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t.quote.success}</h3>
              <p className="max-w-md text-slate-400 mb-8">{t.quote.successDesc}</p>
              <div className="mb-8 rounded-2xl border border-brand-500/30 bg-brand-500/10 px-8 py-4">
                <p className="text-sm text-slate-400">{t.quote.estimatedPrice}</p>
                <p className="text-4xl font-extrabold text-brand-400">€{submittedPrice ?? price}</p>
              </div>
              <a
                href={CALENDAR_URL}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-4 font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600"
              >
                <CalendarCheck className="h-5 w-5" />
                {t.quote.bookCall}
              </a>
            </div>
          ) : (
            <>
              {/* Step 1: Website type */}
              {step === 1 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{t.quote.websiteType}</h3>
                  <p className="text-sm text-slate-400 mb-5">{t.quote.websiteTypeDesc}</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {t.quote.websiteTypes.map((wt) => (
                      <button
                        key={wt.value}
                        onClick={() => setData({ ...data, websiteType: wt.value })}
                        className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                          data.websiteType === wt.value
                            ? 'border-brand-500 bg-brand-500/10'
                            : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                        }`}
                      >
                        <span className="font-medium text-white">{wt.label}</span>
                        <span className="text-sm text-slate-400">€{wt.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Pages & Images */}
              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{t.quote.numPages}</h3>
                    <p className="text-sm text-slate-400 mb-4">{t.quote.numPagesDesc}</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setData({ ...data, numPages: Math.max(1, data.numPages - 1) })}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-white transition hover:bg-slate-700"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <div className="flex-1 text-center">
                        <span className="text-3xl font-extrabold text-white">{data.numPages}</span>
                        <span className="text-sm text-slate-400 ml-2">{t.quote.pages}</span>
                      </div>
                      <button
                        onClick={() => setData({ ...data, numPages: Math.min(20, data.numPages + 1) })}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-white transition hover:bg-slate-700"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-center">€{PRICE_PER_PAGE} {t.quote.perPage}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{t.quote.numImages}</h3>
                    <p className="text-sm text-slate-400 mb-4">{t.quote.numImagesDesc}</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setData({ ...data, numImages: Math.max(0, data.numImages - 5) })}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-white transition hover:bg-slate-700"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <div className="flex-1 text-center">
                        <span className="text-3xl font-extrabold text-white">{data.numImages}</span>
                        <span className="text-sm text-slate-400 ml-2">{t.quote.images}</span>
                      </div>
                      <button
                        onClick={() => setData({ ...data, numImages: Math.min(100, data.numImages + 5) })}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-white transition hover:bg-slate-700"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-center">€{PRICE_PER_IMAGE} {t.quote.perImage}</p>
                  </div>
                </div>
              )}

              {/* Step 3: Features */}
              {step === 3 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{t.quote.features}</h3>
                  <p className="text-sm text-slate-400 mb-5">{t.quote.featuresDesc}</p>
                  <div className="space-y-3">
                    <button
                      onClick={() => setData({ ...data, onlinePayments: !data.onlinePayments })}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                        data.onlinePayments
                          ? 'border-brand-500 bg-brand-500/10'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      <div>
                        <p className="font-medium text-white">{t.quote.onlinePayments}</p>
                        <p className="text-xs text-slate-400">{t.quote.onlinePaymentsDesc}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-400">+€{PRICE_ONLINE_PAYMENTS}</span>
                        <div className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center transition ${
                          data.onlinePayments ? 'border-brand-500 bg-brand-500' : 'border-slate-600'
                        }`}>
                          {data.onlinePayments && <Check className="h-4 w-4 text-white" />}
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setData({ ...data, notifications: !data.notifications })}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                        data.notifications
                          ? 'border-brand-500 bg-brand-500/10'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      <div>
                        <p className="font-medium text-white">{t.quote.notifications}</p>
                        <p className="text-xs text-slate-400">{t.quote.notificationsDesc}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-400">+€{PRICE_NOTIFICATIONS}</span>
                        <div className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center transition ${
                          data.notifications ? 'border-brand-500 bg-brand-500' : 'border-slate-600'
                        }`}>
                          {data.notifications && <Check className="h-4 w-4 text-white" />}
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setData({ ...data, multilingual: !data.multilingual })}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                        data.multilingual
                          ? 'border-brand-500 bg-brand-500/10'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      <div>
                        <p className="font-medium text-white">{t.quote.multilingual}</p>
                        <p className="text-xs text-slate-400">{t.quote.multilingualDesc}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-400">+€{PRICE_MULTILINGUAL}</span>
                        <div className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center transition ${
                          data.multilingual ? 'border-brand-500 bg-brand-500' : 'border-slate-600'
                        }`}>
                          {data.multilingual && <Check className="h-4 w-4 text-white" />}
                        </div>
                      </div>
                    </button>
                    {data.multilingual && (
                      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                        <label className="text-sm font-medium text-white block mb-2">{t.quote.languagesLabel}</label>
                        <input
                          type="text"
                          value={data.languages}
                          onChange={(e) => setData({ ...data, languages: e.target.value })}
                          placeholder={t.quote.languagesPlaceholder}
                          maxLength={200}
                          className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Contact info */}
              {step === 4 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{t.quote.contactInfo}</h3>
                  <p className="text-sm text-slate-400 mb-5">{t.quote.contactInfoDesc}</p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300 block mb-1.5">{t.quote.yourName} *</label>
                      <input
                        type="text"
                        value={data.customerName}
                        onChange={(e) => setData({ ...data, customerName: e.target.value })}
                        maxLength={120}
                        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300 block mb-1.5">{t.quote.yourEmail} *</label>
                      <input
                        type="email"
                        value={data.customerEmail}
                        onChange={(e) => setData({ ...data, customerEmail: e.target.value })}
                        maxLength={254}
                        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300 block mb-1.5">{t.quote.yourPhone}</label>
                      <input
                        type="tel"
                        value={data.customerPhone}
                        onChange={(e) => setData({ ...data, customerPhone: e.target.value })}
                        maxLength={40}
                        pattern="[0-9+() .-]{5,40}"
                        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300 block mb-1.5">{t.quote.notes}</label>
                      <textarea
                        value={data.notes}
                        onChange={(e) => setData({ ...data, notes: e.target.value })}
                        placeholder={t.quote.notesPlaceholder}
                        rows={3}
                        maxLength={2000}
                        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Summary */}
              {step === 5 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{t.quote.summary}</h3>
                  <p className="text-sm text-slate-400 mb-5">{t.quote.summaryDesc}</p>
                  <div className="space-y-2 rounded-xl border border-slate-700 bg-slate-800/50 p-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">{t.quote.websiteType}</span>
                      <span className="font-medium text-white">{selectedType?.label}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">{t.quote.numPages}</span>
                      <span className="font-medium text-white">{data.numPages} {t.quote.pages}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">{t.quote.numImages}</span>
                      <span className="font-medium text-white">{data.numImages} {t.quote.images}</span>
                    </div>
                    {data.onlinePayments && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">{t.quote.onlinePayments}</span>
                        <span className="font-medium text-brand-400">+€{PRICE_ONLINE_PAYMENTS}</span>
                      </div>
                    )}
                    {data.notifications && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">{t.quote.notifications}</span>
                        <span className="font-medium text-brand-400">+€{PRICE_NOTIFICATIONS}</span>
                      </div>
                    )}
                    {data.multilingual && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">{t.quote.multilingual}</span>
                        <span className="font-medium text-brand-400">+€{PRICE_MULTILINGUAL}</span>
                      </div>
                    )}
                    {data.multilingual && data.languages && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">{t.quote.languagesLabel}</span>
                        <span className="font-medium text-white">{data.languages}</span>
                      </div>
                    )}
                    <div className="border-t border-slate-700 pt-3 flex justify-between items-center">
                      <span className="text-base font-bold text-white">{t.quote.estimatedPrice}</span>
                      <span className="text-3xl font-extrabold text-brand-400">€{price}</span>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">{t.quote.yourName}</span>
                      <span className="font-medium text-white">{data.customerName}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">{t.quote.yourEmail}</span>
                      <span className="font-medium text-white">{data.customerEmail}</span>
                    </div>
                    {data.customerPhone && (
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">{t.quote.yourPhone}</span>
                        <span className="font-medium text-white">{data.customerPhone}</span>
                      </div>
                    )}
                  </div>
                  {error && (
                    <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>
                  )}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="mt-8 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {t.quote.back}
                  </button>
                ) : (
                  <div />
                )}
                {step < 5 ? (
                  <button
                    onClick={() => canProceed() && setStep(step + 1)}
                    disabled={!canProceed()}
                    className="flex items-center gap-1.5 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {t.quote.next}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600 disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t.quote.submitting}
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        {t.quote.submit}
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
