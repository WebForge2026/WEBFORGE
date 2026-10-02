import { useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Language } from '@/types';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'DE', label: 'Deutsch', flag: 'DE' },
  { code: 'EN', label: 'English', flag: 'EN' },
  { code: 'BG', label: 'Български', flag: 'BG' },
];

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = LANGUAGES.find((l) => l.code === language)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2 px-3 py-2 min-w-[112px] rounded-lg glass-panel glass-panel-hover text-sm font-medium whitespace-nowrap"
        aria-label="Language selector"
      >
        <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="text-white/90 flex-1 text-center">{current.label}</span>
        {!compact && <ChevronDown className={`w-3.5 h-3.5 text-white/50 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] glass-panel rounded-xl overflow-hidden z-[70] animate-scale-in origin-top-right">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-white/5 ${
                  language === lang.code ? 'text-emerald-400' : 'text-white/70'
                }`}
              >
                <span className="flex items-center gap-2.5 whitespace-nowrap">
                  <span className="font-mono text-xs opacity-60 w-6">{lang.flag}</span>
                  {lang.label}
                </span>
                {language === lang.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
