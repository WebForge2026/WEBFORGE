import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { useLanguage } from '@/i18n/LanguageContext';

function PrivacyContent() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-dark px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => navigate('/')}
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-brand-400"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.privacy.backToHome}
          </button>
          <h1 className="mb-10 text-4xl font-bold text-white">{t.privacy.title}</h1>
          <div className="space-y-12">
            {t.privacy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-4 text-xl font-semibold text-brand-400">{section.heading}</h2>
                {section.body.map((block, i) => (
                  <div key={i} className="mb-4">
                    {block.subheading && (
                      <h3 className="mb-2 text-lg font-medium text-white">{block.subheading}</h3>
                    )}
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-400">
                      {block.text}
                    </p>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export function PrivacyPolicy() {
  return (
    <LanguageProvider>
      <PrivacyContent />
    </LanguageProvider>
  );
}
