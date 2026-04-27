import "./CtaSection.css";
import { useEffect, useRef } from "react"; // ADD THIS LINE

export default function CtaSection() {
  // ADD THIS BLOCK
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("cta-section-visible");
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
    <section className="cta-section" ref={sectionRef}> {/* ADD ref={sectionRef} */}
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