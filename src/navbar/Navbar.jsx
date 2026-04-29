import "./Navbar.css";
import logo from "../assets/att.2Z41rSRwPlN2RVmHedanlvfzJd5oqsiftLNgRYVcRn8 2.png";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onOpenAuth }) {
  return (
    <header className="navbar-wrapper">
      <div className="navbar-shell">
        <div className="navbar">
          <a className="navbar__logo" href="#top" aria-label="IBEX home">
            <img src={logo} alt="IBEX" />
          </a>

          <nav className="navbar__menu" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <button type="button" className="navbar__button" onClick={onOpenAuth}>
            Нэвтрэх
          </button>
        </div>
      </div>
    </header>
  );
}
