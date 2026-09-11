import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { plants } from '../data/plants';
import { CATEGORY_LABELS, type PlantCategory } from '../models/Plant';
import { PlantCard } from '../components/PlantCard';
import { SearchBar } from '../components/SearchBar';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../hooks/useFavorites';
import { useNotification } from '../context/NotificationContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Catalog.css';

type SortKey = 'preporuceno' | 'cena-rastuce' | 'cena-opadajuce' | 'naziv';

const categories = Object.keys(CATEGORY_LABELS) as PlantCategory[];

/** Katalog biljaka: pretraga, filtriranje po kategoriji i sortiranje, sinhronizovano sa URL parametrima. */
export function Catalog() {
  useDocumentTitle('Katalog');
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { notify } = useNotification();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('pretraga') ?? '';
  const activeCategory = (searchParams.get('kategorija') as PlantCategory | null) ?? 'sve';
  const sortKey = (searchParams.get('sortiranje') as SortKey | null) ?? 'preporuceno';

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === '' || value === 'sve' || value === 'preporuceno') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const filteredPlants = useMemo(() => {
    let result = plants.filter((plant) =>
      plant.name.toLowerCase().includes(query.trim().toLowerCase()),
    );

    if (activeCategory !== 'sve') {
      result = result.filter((plant) => plant.category === activeCategory);
    }

    switch (sortKey) {
      case 'cena-rastuce':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'cena-opadajuce':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'naziv':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'sr'));
        break;
      default:
        result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [query, activeCategory, sortKey]);

  return (
    <div className="catalog">
      <div className="catalog__header">
        <h1>Katalog biljaka</h1>
        <SearchBar initialValue={query} onSearch={(value) => updateParam('pretraga', value)} />
      </div>

      <div className="catalog__filters">
        <div className="catalog__categories">
          <button
            className={activeCategory === 'sve' ? 'is-active' : ''}
            onClick={() => updateParam('kategorija', 'sve')}
          >
            Sve
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? 'is-active' : ''}
              onClick={() => updateParam('kategorija', category)}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>

        <select value={sortKey} onChange={(event) => updateParam('sortiranje', event.target.value)}>
          <option value="preporuceno">Preporučeno</option>
          <option value="cena-rastuce">Cena: rastuće</option>
          <option value="cena-opadajuce">Cena: opadajuće</option>
          <option value="naziv">Naziv (A-Š)</option>
        </select>
      </div>

      <p className="catalog__count">{filteredPlants.length} rezultata</p>

      {filteredPlants.length === 0 ? (
        <p className="catalog__empty">Nema biljaka koje odgovaraju pretrazi.</p>
      ) : (
        <div className="catalog__grid">
          {filteredPlants.map((plant) => (
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
      )}
    </div>
  );
}
