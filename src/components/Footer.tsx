import { Link } from 'react-router-dom';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <p className="footer__brand">🌱 Web Rasadnik</p>
          <p className="footer__text">Vaš online rasadnik za sobno i baštensko bilje.</p>
        </div>

        <nav className="footer__links">
          <Link to="/katalog">Katalog</Link>
          <Link to="/o-nama">O nama</Link>
          <Link to="/kontakt">Kontakt</Link>
        </nav>

        <div className="footer__contact">
          <p>📍 Bulevar Cvetne 12, Beograd</p>
          <p>✉️ kontakt@webrasadnik.rs</p>
        </div>
      </div>

      <p className="footer__copy">© {new Date().getFullYear()} Web Rasadnik. Sva prava zadržana.</p>
    </footer>
  );
}
