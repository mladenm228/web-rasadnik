import './StarRating.css';

interface StarRatingProps {
  rating: number;
  outOf?: number;
}

export function StarRating({ rating, outOf = 5 }: StarRatingProps) {
  const stars = Array.from({ length: outOf }, (_, index) => index < Math.round(rating));

  return (
    <span className="star-rating" aria-label={`Ocena ${rating} od ${outOf}`}>
      {stars.map((filled, index) => (
        <span key={index} className={filled ? 'star star--filled' : 'star'}>
          ★
        </span>
      ))}
      <span className="star-rating__value">{rating.toFixed(1)}</span>
    </span>
  );
}
