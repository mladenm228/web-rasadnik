import { Link } from 'react-router-dom';
import { plants } from '../data/plants';
import { PlantCard } from '../components/PlantCard';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Button } from '../components/Button';
import './Favorites.css';

/** Zaštićena stranica (samo za prijavljene korisnike) sa listom omiljenih biljaka. */
export function Favorites() {
  useDocumentTitle('Omiljene biljke');
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { notify } = useNotification();

  const favoritePlants = plants.filter((plant) => favoriteIds.includes(plant.id));

  if (favoritePlants.length === 0) {
    return (
      <div className="favorites favorites--empty">
        <h1>Nemate omiljenih biljaka</h1>
        <p>Dodajte biljke u omiljene klikom na ❤ ikonicu u katalogu.</p>
        <Link to="/katalog">
          <Button>Idi na katalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h1>Omiljene biljke</h1>
      <div className="favorites__grid">
        {favoritePlants.map((plant) => (
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
    </div>
  );
}
