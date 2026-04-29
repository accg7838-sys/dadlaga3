import "./CtaSection.css";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

export default function CtaSection() {
  const sectionRef = useRevealOnScroll("cta-section-visible");

  return (
    <section className="cta-section" ref={sectionRef}>
      <div className="cta-title-wrap">
        <h2 className="cta-title">
          Системийг туршиж
          <br/>
          үзэх үү?
        </h2>
      </div>

      <div className="cta-description-wrap">
        <p className="cta-description">
          Үнэ төлбөргүй demo хэсгийг нээж, таны байгууллагын хэрэгцээнд
          тохируулан үзэх боломжтой.
        </p>
      </div>

      <div className="cta-actions">
        <button className="cta-btn cta-btn-primary">DEMO ҮЗЭХ</button>
        <button className="cta-btn cta-btn-secondary">ХОЛБОО БАРИХ</button>
      </div>
    </section>
  );
}
