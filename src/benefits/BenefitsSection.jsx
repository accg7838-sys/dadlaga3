import "./BenefitsSection.css";
import { useEffect, useRef } from "react"; // ADD THIS LINE
import featureImage1 from "../assets/FeatureImage4.png";
import featureImage2 from "../assets/FeatureImage2.png";
import featureImage3 from "../assets/FeatureImage3.png";

const benefitItems = [
  {
    title: "Хэрэглэгчийн үнэнч байдал",
    description:
      "Найдвартай ажиллагаа нь хэрэглэгчдийн итгэлийг бэхжүүлж, урт хугацааны харилцааг бий болгодог.",
    image: featureImage1,
    reverse: false,
  },
  {
    title: "Ажилчдын сэтгэл ханамж",
    description:
      "Зохион байгуулалттай, тодорхой үүрэг хуваарилалт нь баг хамт олны гүйцэтгэлийг дээшлүүлдэг.",
    image: featureImage2,
    reverse: true,
  },
  {
    title: "Ашигт ажиллагаа",
    description:
      "Зардлыг оновчтой болгож, тоног төхөөрөмжийн ашиглалтын насыг уртасгаж, ROI-г нэмэгдүүлдэг.",
    image: featureImage3,
    reverse: false,
  },
];

export default function BenefitsSection() {
  // ADD THIS BLOCK
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("benefits-section-visible");
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
    <section className="benefits-section" id="benefits" ref={sectionRef}> {/* ADD ref={sectionRef} */}
      {benefitItems.map((item, index) => (
        <div
          key={index}
          className={`benefit-row ${item.reverse ? "benefit-row--reverse" : ""}`}
        >
          <div className={`benefit-text ${index === 2 ? "benefit-text--small" : ""}`}>
            <h2 className="benefit-title">{item.title}</h2>
            <p className="benefit-description">{item.description}</p>
          </div>

          <div className="benefit-visual">
            <img src={item.image} alt={item.title} className="benefit-visual__image" />
          </div>
        </div>
      ))}
    </section>
  );
}