import "./DashboardSection.css";
import { useCallback, useEffect, useRef, useState } from "react";
import screenImage from "../assets/ScreenImage.png";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

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
  const sectionRef = useRevealOnScroll("dashboard-section-visible");
  const menuContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [linePosition, setLinePosition] = useState({ top: 12, height: 52 });

  const updateLinePosition = useCallback(() => {
    const menuContainer = menuContainerRef.current;
    const activeItem = menuContainer?.children[activeIndex];

    if (!menuContainer || !activeItem) {
      return;
    }

    setLinePosition({
      top: menuContainer.offsetTop + activeItem.offsetTop - menuContainer.scrollTop,
      height: activeItem.offsetHeight,
    });
  }, [activeIndex]);

  const setLineToItem = (menuContainer, index) => {
    const item = menuContainer.children[index];

    if (!item) {
      return;
    }

    setLinePosition({
      top: menuContainer.offsetTop + item.offsetTop - menuContainer.scrollTop,
      height: item.offsetHeight,
    });
  };

  useEffect(() => {
    updateLinePosition();
    window.addEventListener("resize", updateLinePosition);

    return () => window.removeEventListener("resize", updateLinePosition);
  }, [updateLinePosition]);

  // Handle scroll events on the menu
  const handleMenuScroll = (e) => {
    const menuContainer = e.currentTarget;
    const items = Array.from(menuContainer.children);
    const visibleTop = menuContainer.scrollTop;
    const newIndex = items.reduce((closestIndex, item, index) => {
      const closestItem = items[closestIndex];
      const distance = Math.abs(item.offsetTop - visibleTop);
      const closestDistance = Math.abs(closestItem.offsetTop - visibleTop);

      return distance < closestDistance ? index : closestIndex;
    }, 0);

    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < menuItems.length) {
      setActiveIndex(newIndex);
    }

    setLineToItem(menuContainer, newIndex);
  };

  // Handle click on menu item
  const handleMenuItemClick = (index) => {
    setActiveIndex(index);
    const menuContainer = menuContainerRef.current;

    if (menuContainer) {
      const activeItem = menuContainer.children[index];

      menuContainer.scrollTo({
        top: activeItem?.offsetTop || 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="dashboard-section" id="process" ref={sectionRef}>
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
            <div 
              className="dashboard-line-active" 
              style={{ 
                height: `${linePosition.height}px`,
                transform: `translateY(${linePosition.top}px)`,
              }} 
            />
          </div>

          <div 
            className="dashboard-menu-items"
            ref={menuContainerRef}
            onScroll={handleMenuScroll}
          >
            {menuItems.map((item, index) => (
              <div 
                key={item.title} 
                className="dashboard-menu-item"
                onClick={() => handleMenuItemClick(index)}
              >
                <h3 className={`dashboard-menu-title ${activeIndex === index ? "active" : ""}`}>
                  {item.title}
                </h3>
                <p className={`dashboard-menu-description ${activeIndex === index ? "active" : ""}`}>
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

          <img src={screenImage} alt="Dashboard preview" className="dashboard-preview-image" />
        </div>
      </div>
    </section>
  );
}
