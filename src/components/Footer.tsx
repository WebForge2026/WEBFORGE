import { Mail } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="border-t border-slate-800 bg-brand-dark px-6 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">{t.footer.title}</h2>
          <p className="mb-6 max-w-md text-sm text-slate-400">{t.footer.description}</p>
          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-brand-400">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-white">Angel Kodzhebashev</span>
                <span className="text-xs text-slate-500">Sales Manager</span>
                <a href="mailto:kodzhebashev@web-forge.dev" className="transition hover:text-brand-400">
                  kodzhebashev@web-forge.dev
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-brand-400">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-white">Todor Shopov</span>
                <span className="text-xs text-slate-500">IT Operative Manager</span>
                <a href="mailto:shopov@web-forge.dev" className="transition hover:text-brand-400">
                  shopov@web-forge.dev
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-left md:text-right">
          <p className="mb-2 text-xs text-slate-500">{t.footer.copyright}</p>
          <p className="mb-3 text-xs text-slate-500">{t.footer.tagline}</p>
          <a
            href="/privacy"
            className="text-xs text-slate-500 underline transition hover:text-brand-400"
          >
            {t.footer.privacyLink}
          </a>
        </div>
      </div>
    </footer>
  );
}
