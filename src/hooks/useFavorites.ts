import { useEffect, useState } from 'react';
import { storageService } from '../models/LocalStorageService';

const FAVORITES_KEY = 'rasadnik_favorites';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() =>
    storageService.getItem<string[]>(FAVORITES_KEY, []),
  );

  useEffect(() => {
    storageService.setItem(FAVORITES_KEY, favoriteIds);
  }, [favoriteIds]);

  const toggleFavorite = (plantId: string) => {
    setFavoriteIds((current) =>
      current.includes(plantId)
        ? current.filter((id) => id !== plantId)
        : [...current, plantId],
    );
  };

  const isFavorite = (plantId: string) => favoriteIds.includes(plantId);

  return { favoriteIds, toggleFavorite, isFavorite };
}
