import Hero from "./Hero";
import HeroPreview from "./HeroPreview";
import "./HeroSection.css";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

export default function HeroSection({ onOpenAuth }) {
  const sectionRef = useRevealOnScroll("hero-section-visible");

  return (
    <section className="hero-section" id="features" ref={sectionRef}>
      <Hero onOpenAuth={onOpenAuth} />
      <HeroPreview />
    </section>
  );
}
