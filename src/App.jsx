import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import HeroSection from "./hero/HeroSection";
import AboutSection from "./about/AboutSection";
import BenefitsSection from "./benefits/BenefitsSection";
import DashboardSection from "./dashboard/DashboardSection";
import CtaSection from "./cta/CtaSection";
import Footer from "./footer/Footer";
import AuthPage from "./auth/AuthPage";

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((nextPath) => {
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setPathname(nextPath);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const openAuthPage = useCallback(() => {
    navigate("/auth");
  }, [navigate]);

  const openHomePage = useCallback(() => {
    navigate("/");
  }, [navigate]);

  if (pathname.startsWith("/auth")) {
    return <AuthPage onBackHome={openHomePage} />;
  }

  return (
    <div className="app">
      <Navbar onOpenAuth={openAuthPage} />
      <main className="page-shell">
        <div className="page-stack">
          <HeroSection onOpenAuth={openAuthPage} />
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
