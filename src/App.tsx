import { useState, useEffect, useCallback } from 'react';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { AuthProvider } from '@/admin/AuthContext';
import { BackgroundMesh, CursorGlow } from '@/components/Background';
import { LandingPage } from '@/pages/LandingPage';
import { AdminPage } from '@/pages/AdminPage';

function usePathname() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);

    // Intercept all in-page hash navigation so the app never reloads
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      // Hash links — smooth scroll, never change URL
      if (href.startsWith('#')) {
        e.preventDefault();
        e.stopPropagation();
        if (href === '#' || href === '#/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      // Same-page links — prevent reload
      if (href === window.location.pathname || href === window.location.href) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick, true);
    };
  }, []);

  return path;
}

function App() {
  const path = usePathname();
  const isAdmin = path.startsWith('/admin');

  return (
    <LanguageProvider>
      <AuthProvider>
        <BackgroundMesh />
        <CursorGlow />
        {isAdmin ? <AdminPage /> : <LandingPage />}
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
