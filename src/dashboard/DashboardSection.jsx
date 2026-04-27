import "./DashboardSection.css";
import mainImage from "../assets/MainImage.png";

const menuItems = [
  {
    title: "Costs",
    description:
      "Сэлбэг, засварын зардлыг техник бүрээр бодит цагт хянах боломж. Илүүдэл зардлыг илрүүлж, төсвөө оновчтой төлөвлө.",
    active: true,
  },
  {
    title: "Works",
    description:
      "Машин механизмын ажилласан цаг, сул зогсолтыг секунд тутамд хяна. Техникийн бүтээмжийг нэмэгдүүлж, нөөцөө зөв хуваарил.",
    active: false,
  },
  {
    title: "Tasks",
    description:
      "Засвар, тосолгооны даалгаврыг багаа хуваарилж, явцыг нь хяна. Бүх ажлыг статусаар нь ангилж, хугацаа алдалгүй шийдвэрлэ.",
    active: false,
  },
  {
    title: "Safety",
    description:
      "Техникийн бүрэн бүтэн байдлыг хангаж, эрсдэлийг бууруул. Шалгах хуудас ашиглан аюулгүй байдлыг тогтмол хяна.",
    active: false,
  },
];

export default function DashboardSection() {
  return (
    <section className="dashboard-section" id="process">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Хяналтын Самбар</h2>
        <p className="dashboard-subtitle">
          iBex системийн бодит дэлгэцний зураглал — зардал, ажлын захиалга,
          хариуцлагын болон аюулгүй байдлын модулиуд.
        </p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-menu">
          <div className="dashboard-line">
            <div className="dashboard-line-active" />
          </div>

          <div className="dashboard-menu-items">
            {menuItems.map((item) => (
              <div key={item.title} className="dashboard-menu-item">
                <h3 className={`dashboard-menu-title ${item.active ? "active" : ""}`}>
                  {item.title}
                </h3>
                <p className={`dashboard-menu-description ${item.active ? "active" : ""}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-preview">
          <div className="browser-bar">
            <div className="browser-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>

            <div className="browser-address">
              <span className="browser-icon">􀎡</span>
              <span>demo.ibex.mn/dashboard</span>
            </div>
          </div>

          <img src={mainImage} alt="Dashboard preview" className="dashboard-preview-image" />
        </div>
      </div>
    </section>
  );
}
