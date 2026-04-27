import "./Hero.css";

const tags = [
  "Dashboard",
  "User Management",
  "Analytics",
  "Settings",
  "Reports",
  "Notifications",
  "Integrations",
  "Help Center",
  "Feedback",
  "Billing",
  "API Access",
  "Team Collaboration",
  "Data Export",
  "Custom Branding",
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__content">
        <h1 className="hero__title">
          Smart
          <br />
          Maintenance
          <br />
          Platform
        </h1>

        <p className="hero__description">
          Тоног төхөөрөмжийн найдвартай ажиллагаа, засвар үйлчилгээний
          төлөвлөлт, гүйцэтгэлийг тодорхойлж, сайжруулахад зориулсан нэгдсэн
          удирдлагын шийдэл.
        </p>

        <div className="hero__actions">
          <button type="button" className="hero__btn hero__btn--primary">
            СИСТЕМД НЭВТРЭХ
          </button>
        </div>

        <div className="hero__tags">
          {tags.map((tag) => (
            <button key={tag} type="button" className="hero__tag">
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
