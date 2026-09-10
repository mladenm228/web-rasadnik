import { useEffect, useState } from 'react';
import { storageService } from '../models/LocalStorageService';

const RECENT_KEY = 'rasadnik_recent';
const MAX_RECENT = 5;

export function useRecentlyViewed(currentId?: string) {
  const [recentIds, setRecentIds] = useState<string[]>(() =>
    storageService.getItem<string[]>(RECENT_KEY, []),
  );

  useEffect(() => {
    if (!currentId) return;
    setRecentIds((previous) => {
      const next = [currentId, ...previous.filter((id) => id !== currentId)].slice(
        0,
        MAX_RECENT,
      );
      storageService.setItem(RECENT_KEY, next);
      return next;
    });
  }, [currentId]);

  return recentIds;
}
