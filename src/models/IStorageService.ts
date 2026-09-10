/**
 * Ugovor za servis trajnog čuvanja podataka na klijentu.
 * Implementacija (LocalStorageService) se aktivno koristi iz svih
 * context-a i hook-ova kojima je potrebna perzistencija (korpa, korisnik,
 * tema, omiljene biljke, nedavno pregledano).
 */
export interface IStorageService {
  getItem<T>(key: string, fallback: T): T;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
}
