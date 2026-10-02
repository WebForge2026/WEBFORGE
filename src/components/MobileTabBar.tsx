import { useState, useEffect } from 'react';
import { Layers, Briefcase, Calculator, Users, Mail } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function MobileTabBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tabs = [
    { label: t.nav.services, href: '#services', icon: <Layers className="w-5 h-5" /> },
    { label: t.nav.work, href: '#portfolio', icon: <Briefcase className="w-5 h-5" /> },
    { label: t.nav.estimator, href: '#estimator', icon: <Calculator className="w-5 h-5" /> },
    { label: t.nav.founders, href: '#founders', icon: <Users className="w-5 h-5" /> },
    { label: t.nav.contact, href: '#contact', icon: <Mail className="w-5 h-5" /> },
  ];

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="glass-panel rounded-t-2xl border-x-0 border-b-0 px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.href}
              onClick={(e) => handleClick(e, tab.href)}
              className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors active:scale-95"
            >
              <span className="text-white/60">{tab.icon}</span>
              <span className="text-[10px] text-white/50 font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
