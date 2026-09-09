import { useLanguage } from '@/i18n/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800 p-1">
      <Globe className="ml-1.5 h-4 w-4 text-slate-400" />
      <button
        onClick={() => setLanguage('en')}
        className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
          language === 'en'
            ? 'bg-brand-500 text-white'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('bg')}
        className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
          language === 'bg'
            ? 'bg-brand-500 text-white'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        BG
      </button>
    </div>
  );
}
