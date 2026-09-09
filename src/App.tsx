import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { IntroLoader } from '@/components/IntroLoader';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Portfolio } from '@/components/Portfolio';
import { Booking } from '@/components/Booking';
import { Footer } from '@/components/Footer';
import { InstantQuoteModal } from '@/components/InstantQuoteModal';
import { AdminDashboard } from '@/components/AdminDashboard';
import { PrivacyPolicy } from '@/components/PrivacyPolicy';

function PublicWebsite() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  return (
    <LanguageProvider>
      <IntroLoader />
      <Header />
      <main>
        <Hero onGetQuote={() => setShowQuoteModal(true)} />
        <Services />
        <Portfolio />
        <Booking />
      </main>
      <Footer />
      {showQuoteModal && <InstantQuoteModal onClose={() => setShowQuoteModal(false)} />}
    </LanguageProvider>
  );
}

function AdminRoute() {
  return (
    <LanguageProvider>
      <AdminDashboard />
    </LanguageProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicWebsite />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
