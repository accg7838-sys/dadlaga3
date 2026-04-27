import "./App.css";
import Navbar from "./navbar/Navbar";
import HeroSection from "./hero/HeroSection";
import AboutSection from "./about/AboutSection";
import BenefitsSection from "./benefits/BenefitsSection";
import DashboardSection from "./dashboard/DashboardSection";
import CtaSection from "./cta/CtaSection";
import Footer from "./footer/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="page-shell">
        <div className="page-stack">
          <HeroSection />
          <AboutSection />
          <BenefitsSection />
          <DashboardSection />
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
