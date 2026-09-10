import { Link } from 'react-router-dom';
import type { IPlant } from '../models/Plant';
import { StarRating } from './StarRating';
import { Button } from './Button';
import './PlantCard.css';

interface PlantCardProps {
  plant: IPlant;
  isFavorite: boolean;
  onToggleFavorite: (plantId: string) => void;
  onAddToCart: (plant: IPlant) => void;
}

export function PlantCard({ plant, isFavorite, onToggleFavorite, onAddToCart }: PlantCardProps) {
  return (
    <article className="plant-card">
      <button
        className={`plant-card__favorite ${isFavorite ? 'is-active' : ''}`}
        onClick={() => onToggleFavorite(plant.id)}
        aria-label={isFavorite ? 'Ukloni iz omiljenih' : 'Dodaj u omiljene'}
        title={isFavorite ? 'Ukloni iz omiljenih' : 'Dodaj u omiljene'}
      >
        {isFavorite ? '❤' : '🤍'}
      </button>

      <Link to={`/biljka/${plant.id}`} className="plant-card__link">
        <div className="plant-card__icon" style={{ background: plant.color }}>
          <span>{plant.icon}</span>
        </div>
        <h3>{plant.name}</h3>
        <StarRating rating={plant.rating} />
        <p className="plant-card__price">{plant.price.toLocaleString('sr-RS')} RSD</p>
      </Link>

      <Button
        variant="primary"
        disabled={plant.stock === 0}
        onClick={() => onAddToCart(plant)}
      >
        {plant.stock === 0 ? 'Nema na stanju' : 'Dodaj u korpu'}
      </Button>
    </article>
  );
}
