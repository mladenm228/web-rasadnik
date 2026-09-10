import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { storageService } from '../models/LocalStorageService';

type Theme = 'light' | 'dark';
const THEME_STORAGE_KEY = 'rasadnik_theme';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    storageService.getItem<Theme>(THEME_STORAGE_KEY, 'light'),
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storageService.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme mora biti korišćen unutar ThemeProvider-a');
  }
  return context;
}
