import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { plants } from '../data/plants';
import { CATEGORY_LABELS, type IPlant } from '../models/Plant';
import { StarRating } from '../components/StarRating';
import { Button } from '../components/Button';
import { PlantCard } from '../components/PlantCard';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../hooks/useFavorites';
import { useNotification } from '../context/NotificationContext';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './PlantDetail.css';

export function PlantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const plant = plants.find((p) => p.id === id);

  useDocumentTitle(plant ? plant.name : 'Biljka nije pronađena');

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { notify } = useNotification();
  const recentIds = useRecentlyViewed(plant?.id);
  const [quantity, setQuantity] = useState(1);

  if (!plant) {
    return (
      <div className="plant-detail plant-detail--missing">
        <h1>Biljka nije pronađena</h1>
        <p>Proverite adresu ili se vratite na katalog.</p>
        <Button onClick={() => navigate('/katalog')}>Nazad na katalog</Button>
      </div>
    );
  }

  const related = plants
    .filter((p) => p.category === plant.category && p.id !== plant.id)
    .slice(0, 3);

  const recentlyViewed = recentIds
    .map((recentId) => plants.find((p) => p.id === recentId))
    .filter((p): p is IPlant => Boolean(p) && p!.id !== plant.id)
    .slice(0, 4);

  return (
    <div className="plant-detail">
      <Link to="/katalog" className="plant-detail__back">
        ← Nazad na katalog
      </Link>

      <div className="plant-detail__main">
        <div className="plant-detail__art" style={{ background: plant.color }}>
          <span>{plant.icon}</span>
        </div>

        <div className="plant-detail__info">
          <span className="plant-detail__category">{CATEGORY_LABELS[plant.category]}</span>
          <h1>{plant.name}</h1>
          <StarRating rating={plant.rating} />
          <p className="plant-detail__description">{plant.description}</p>

          <dl className="plant-detail__facts">
            <div>
              <dt>Nivo nege</dt>
              <dd>{plant.careLevel}</dd>
            </div>
            <div>
              <dt>Svetlost</dt>
              <dd>{plant.light}</dd>
            </div>
            <div>
              <dt>Zalivanje</dt>
              <dd>{plant.watering}</dd>
            </div>
            <div>
              <dt>Na stanju</dt>
              <dd>{plant.stock} kom</dd>
            </div>
          </dl>

          <p className="plant-detail__price">{plant.price.toLocaleString('sr-RS')} RSD</p>

          <div className="plant-detail__actions">
            <div className="plant-detail__quantity">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Smanji količinu">
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(plant.stock, q + 1))}
                aria-label="Povećaj količinu"
              >
                +
              </button>
            </div>

            <Button
              disabled={plant.stock === 0}
              onClick={() => {
                addToCart(plant, quantity);
                notify(`${quantity}x ${plant.name} je dodato u korpu.`);
              }}
            >
              Dodaj u korpu
            </Button>

            <Button variant="secondary" onClick={() => toggleFavorite(plant.id)}>
              {isFavorite(plant.id) ? '❤ U omiljenima' : '🤍 Dodaj u omiljene'}
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="plant-detail__section">
          <h2>Slične biljke</h2>
          <div className="plant-detail__grid">
            {related.map((p) => (
              <PlantCard
                key={p.id}
                plant={p}
                isFavorite={isFavorite(p.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={(item) => {
                  addToCart(item);
                  notify(`${item.name} je dodata u korpu.`);
                }}
              />
            ))}
          </div>
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section className="plant-detail__section">
          <h2>Nedavno pregledano</h2>
          <div className="plant-detail__recent">
            {recentlyViewed.map((p) => (
              <Link key={p!.id} to={`/biljka/${p!.id}`} className="plant-detail__recent-item">
                <span>{p!.icon}</span>
                {p!.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
