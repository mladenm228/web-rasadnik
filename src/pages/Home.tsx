import { Link } from 'react-router-dom';
import { plants } from '../data/plants';
import { CATEGORY_LABELS, type PlantCategory } from '../models/Plant';
import { PlantCard } from '../components/PlantCard';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../hooks/useFavorites';
import { useNotification } from '../context/NotificationContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Home.css';

const featured = [...plants].sort((a, b) => b.rating - a.rating).slice(0, 4);
const categories = Object.keys(CATEGORY_LABELS) as PlantCategory[];

export function Home() {
  useDocumentTitle('Početna');
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { notify } = useNotification();

  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-text">
          <h1>Vaš dom zaslužuje malo zelenila 🌿</h1>
          <p>
            Web Rasadnik je online prodavnica sobnog i baštenskog bilja, sukulenata, sadnica i
            pribora za negu. Poručite biljke koje odgovaraju vašem prostoru i iskustvu.
          </p>
          <div className="home__hero-actions">
            <Link to="/katalog" className="home__cta">
              Istraži katalog
            </Link>
            <Link to="/o-nama" className="home__cta home__cta--ghost">
              Saznaj više o nama
            </Link>
          </div>
        </div>
        <div className="home__hero-art" aria-hidden="true">
          🪴🌵🌺
        </div>
      </section>

      <section className="home__categories">
        <h2>Kategorije</h2>
        <div className="home__category-grid">
          {categories.map((category) => (
            <Link key={category} to={`/katalog?kategorija=${category}`} className="home__category-card">
              {CATEGORY_LABELS[category]}
            </Link>
          ))}
        </div>
      </section>

      <section className="home__featured">
        <h2>Preporučeno ove nedelje</h2>
        <div className="home__grid">
          {featured.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              isFavorite={isFavorite(plant.id)}
              onToggleFavorite={toggleFavorite}
              onAddToCart={(p) => {
                addToCart(p);
                notify(`${p.name} je dodata u korpu.`);
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
