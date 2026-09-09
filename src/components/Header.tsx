import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';

export function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-brand-dark/90 backdrop-blur-md border-b border-slate-800'
          : 'bg-brand-dark/85 backdrop-blur-md border-b border-slate-800'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="#" className="text-2xl font-extrabold tracking-tight">
          Web<span className="text-brand-500">Forge</span>.
        </a>
        <nav className="hidden items-center space-x-8 text-sm font-medium text-slate-300 md:flex">
          <a href="#services" className="transition hover:text-brand-500">{t.nav.services}</a>
          <a href="#portfolio" className="transition hover:text-brand-500">{t.nav.portfolio}</a>
          <a href="#booking" className="transition hover:text-brand-500">{t.nav.consultation}</a>
          <a href="#contact" className="transition hover:text-brand-500">{t.nav.contact}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a
            href="#booking"
            className="hidden rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600 sm:inline-block"
          >
            {t.nav.bookAppointment}
          </a>
        </div>
      </div>
    </header>
  );
}
