import type { IStorageService } from './IStorageService';

class LocalStorageService implements IStorageService {
  getItem<T>(key: string, fallback: T): T {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      
    }
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }
}


export const storageService = new LocalStorageService();
