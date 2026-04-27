import Hero from "./Hero";
import HeroPreview from "./HeroPreview";
import "./HeroSection.css";
import { useEffect, useRef } from "react"; // ADD THIS LINE

export default function HeroSection() {
  // ADD THIS BLOCK
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("hero-section-visible");
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="hero-section" id="features" ref={sectionRef}> {/* ADD ref={sectionRef} */}
      <Hero />
      <HeroPreview />
    </section>
  );
}