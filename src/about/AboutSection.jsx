import "./AboutSection.css";
import { useEffect, useRef } from "react"; // ADD THIS LINE

const stats = [
  { value: "12+", label: "Үндсэн модуль" },
  { value: "360°", label: "Үндсэн модуль" },
  { value: "24/7", label: "Тасралтгүй ажиллагаа" },
  { value: "12+", label: "Үндсэн модуль" },
];

export default function AboutSection() {
  // ADD THIS BLOCK
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("about-section-visible");
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
    <section className="about-section" ref={sectionRef}> {/* ADD ref={sectionRef} */}
      <div className="about-text">
        <h2 className="about-title">Ерөнхий танилцуулга</h2>

        <p className="about-description">
          iBeX систем нь салбарын мэргэжилтнүүдийн туршлагад тулгуурлан тоног
          төхөөрөмжийн найдвартай ажиллагаа, засвар үйлчилгээний төлөвлөлт,
          гүйцэтгэлийг сайжруулах цогц шийдлийг санал болгодог.
          <br />
          <br />
          Үйлдвэр, байгууламж бүрт тоног төхөөрөмжийн ашиглалтын үр ашиг
          багасах, бэлэн бус байдал үүсэх нь хөрөнгийн өгөөжид сөргөөр
          нөлөөлдөг. Харин найдвартай, бэлэн байдлыг сайжруулснаар байгууллагын
          ашигт ажиллагаа, ажилчдын сэтгэл ханамж, хэрэглэгчийн үнэнч байдалд
          эерэг нөлөө үзүүлдэг.
          <br />
          <br />
          Найдвартай байдал нь нэг удаагийн үйл явц биш, харин урьдчилан
          сэргийлэх засвар үйлчилгээний стратеги, байгууллагын бүх түвшний
          уялдаа холбоо, тасралтгүй сайжруулалт шаардсан системтэй үйл
          ажиллагаа юм. iBeX нь энэхүү процессыг хэрэгжүүлэхэд шаардлагатай
          аргачлал, хэрэгслийг нэг дороос бүрдүүлсэн шийдэл юм.
        </p>
      </div>

      <div className="about-stats">
        {stats.map((item, index) => (
          <div key={index} className="about-card">
            <h3 className="about-card-value">{item.value}</h3>
            <p className="about-card-label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}