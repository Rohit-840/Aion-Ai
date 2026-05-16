import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Hero from '../components/landing/Hero';
import VisualShowcase from '../components/landing/VisualShowcase';
import AionMind from '../components/landing/AionMind';
import FeatureSection from '../components/landing/FeatureSection';
import HowItWorks from '../components/landing/HowItWorks';
import CreditsSection from '../components/landing/CreditsSection';
import UseCases from '../components/landing/UseCases';
import PricingPreview from '../components/landing/PricingPreview';
import Testimonials from '../components/landing/Testimonials';
import FinalCTA from '../components/landing/FinalCTA';

/**
 * Landing page — the full premium marketing experience for Aion AI.
 */
const Home = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <VisualShowcase />
      <AionMind />
      <FeatureSection />
      <HowItWorks />
      <CreditsSection />
      <UseCases />
      <PricingPreview />
      <Testimonials />
      <FinalCTA />
    </main>
    <Footer />
  </>
);

export default Home;
