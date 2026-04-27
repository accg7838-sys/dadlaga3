import Hero from "./Hero";
import HeroPreview from "./HeroPreview";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero-section" id="features">
      <Hero />
      <HeroPreview />
    </section>
  );
}
