import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Portfolio } from '@/components/Portfolio';
import { Industries } from '@/components/Industries';
import { Founders } from '@/components/Founders';
import { Estimator } from '@/components/Estimator';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { MobileTabBar } from '@/components/MobileTabBar';
import { PlanetSection } from '@/components/PlanetSection';

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden max-w-full">
      <Navbar />
      <main className="overflow-x-hidden max-w-full pb-20 lg:pb-0">
        {/* 1. Hero — no planet */}
        <PlanetSection>
          <Hero />
        </PlanetSection>

        {/* 2. Services (Benefits) — Earth */}
        <PlanetSection planetType="earth" planetSize={480} planetX={18} planetY={50} planetOpacity={0.45}>
          <Services />
        </PlanetSection>

        {/* 3. Process (How it Works) — Jupiter */}
        <PlanetSection planetType="jupiter" planetSize={550} planetX={82} planetY={50} planetOpacity={0.45}>
          <Process />
        </PlanetSection>

        {/* 4. Portfolio (Work) — Saturn */}
        <PlanetSection planetType="saturn" planetSize={520} planetX={20} planetY={50} planetOpacity={0.45}>
          <Portfolio />
        </PlanetSection>

        {/* 5. Industries — Neptune */}
        <PlanetSection planetType="neptune" planetSize={500} planetX={80} planetY={50} planetOpacity={0.45}>
          <Industries />
        </PlanetSection>

        {/* 6. Founders — Mars */}
        <PlanetSection planetType="mars" planetSize={420} planetX={15} planetY={50} planetOpacity={0.45}>
          <Founders />
        </PlanetSection>

        {/* 7. Estimator — Venus */}
        <PlanetSection planetType="venus" planetSize={450} planetX={82} planetY={50} planetOpacity={0.45}>
          <Estimator />
        </PlanetSection>

        {/* 8. Contact — Earth Ultra */}
        <PlanetSection planetType="earth-ultra" planetSize={420} planetX={50} planetY={50} planetOpacity={0.35}>
          <Contact />
        </PlanetSection>
      </main>
      <Footer />
      <MobileTabBar />
    </div>
  );
}
