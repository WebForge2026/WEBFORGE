import { useState } from 'react';
import { Mail, Calendar, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';
import { supabase } from '@/lib/supabase';
import { contactFormSchema } from '@/lib/validation';

const BOOKING_URL = 'https://calendar.app.google/HFVcLXQeyJjAro8y8';

const SERVICES = [
  { value: 'brand_site', label: 'Web Development' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'payment_integration', label: 'Payment Integration' },
  { value: 'email_automation', label: 'Email Automation' },
  { value: 'ui_ux_design', label: 'UI/UX Design' },
  { value: 'seo_performance', label: 'SEO & Performance' },
  { value: 'enterprise_software', label: 'Enterprise Software' },
  { value: 'other', label: 'Other' },
];

export function Contact() {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactFormSchema.safeParse(form);
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
      setStatus('success');
      return;
    }

    setStatus('submitting');

    try {
      const { error } = await supabase.from('leads').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        project_type: form.service,
        features_selected: [],
        estimated_budget: null,
        message: form.message,
        language,
      });

      if (error) {
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-12 sm:py-16 lg:py-24 overflow-hidden max-w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t.contact.title}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-white/50 max-w-2xl mx-auto">{t.contact.subtitle}</p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          <Reveal delay={0} direction="left" className="lg:col-span-2">
            <div className="glass-panel rounded-3xl p-6 lg:p-8 h-full">
              <h3 className="text-lg font-semibold text-white mb-6">{t.contact.directContacts}</h3>

              <div className="space-y-4">
                <ContactCard
                  name={t.founders.angelName}
                  role={t.founders.angelRole}
                  email="kodzhebashev@web-forge.dev"
                />
                <ContactCard
                  name={t.founders.todorName}
                  role={t.founders.todorRole}
                  email="shopov@web-forge.dev"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-white/40 text-sm mb-4">{t.contact.bookingLink}</p>
                <MagneticButton
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian font-semibold text-sm shadow-lg shadow-emerald-500/20"
                >
                  <Calendar className="w-4 h-4" />
                  {t.contact.bookCallNow}
                </MagneticButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} direction="right" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 lg:p-8">
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute -left-[9999px] h-px w-px opacity-0"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <ContactField label={t.contact.name} icon={<User className="w-4 h-4" />} error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="contact-input"
                    placeholder="John Doe"
                  />
                </ContactField>
                <ContactField label={t.contact.email} icon={<Mail className="w-4 h-4" />} error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="contact-input"
                    placeholder="john@example.com"
                  />
                </ContactField>
                <ContactField label={t.contact.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="contact-input"
                    placeholder="+49 ..."
                  />
                </ContactField>
                <ContactField label={t.contact.service} error={errors.service}>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="contact-input cursor-pointer"
                  >
                    <option value="" className="bg-obsidian-100">{t.contact.servicePlaceholder}</option>
                    {SERVICES.map((service) => (
                      <option key={service.value} value={service.value} className="bg-obsidian-100">{service.label}</option>
                    ))}
                  </select>
                </ContactField>
              </div>

              <ContactField label={t.contact.message} icon={<MessageSquare className="w-4 h-4" />} error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="contact-input resize-none"
                  placeholder={t.contact.messagePlaceholder}
                />
              </ContactField>

              {status === 'success' && (
                <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 animate-fade-in-up">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-sm text-emerald-400">{t.contact.success}</p>
                </div>
              )}

              {status === 'error' && (
                <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 animate-fade-in-up">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <p className="text-sm text-red-400">{t.contact.error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-obsidian font-semibold text-sm shadow-lg shadow-emerald-500/25 disabled:opacity-50 transition-all hover:shadow-emerald-500/40"
              >
                {status === 'submitting' ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                    {t.contact.sending}
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t.contact.send}
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>

      <style>{`
        .contact-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .contact-input:focus {
          outline: none;
          border-color: rgba(16,185,129,0.5);
          background: rgba(255,255,255,0.05);
        }
        .contact-input::placeholder {
          color: rgba(255,255,255,0.25);
        }
        .contact-input option {
          background: #0f0f12;
          color: white;
        }
      `}</style>
    </section>
  );
}

function ContactCard({ name, role, email }: { name: string; role: string; email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="group flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex items-center justify-center shrink-0">
        <Mail className="w-4 h-4 text-emerald-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{name}</p>
        <p className="text-white/40 text-xs truncate">{role}</p>
        <p className="text-emerald-400/70 text-xs truncate mt-0.5">{email}</p>
      </div>
    </a>
  );
}

function ContactField({ label, icon, error, children }: { label: string; icon?: React.ReactNode; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs text-white/50 mb-1.5">
        {icon && <span className="text-white/30">{icon}</span>}
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
