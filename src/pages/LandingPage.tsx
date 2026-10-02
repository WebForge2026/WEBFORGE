import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Portfolio } from '@/components/Portfolio';
import { Founders } from '@/components/Founders';
import { Estimator } from '@/components/Estimator';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { MobileTabBar } from '@/components/MobileTabBar';

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden max-w-full">
      <Navbar />
      <main className="overflow-x-hidden max-w-full pb-20 lg:pb-0">
        <Hero />
        <Services />
        <Portfolio />
        <Founders />
        <Estimator />
        <Contact />
      </main>
      <Footer />
      <MobileTabBar />
    </div>
  );
}
