import { createContext, useContext, useState, type ReactNode } from 'react';
import type { IUser } from '../models/User';
import { storageService } from '../models/LocalStorageService';

const AUTH_STORAGE_KEY = 'rasadnik_user';

interface AuthContextValue {
  user: IUser | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function createUserId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(() =>
    storageService.getItem<IUser | null>(AUTH_STORAGE_KEY, null),
  );

  const login = (name: string, email: string) => {
    const newUser: IUser = { id: createUserId(), name, email };
    setUser(newUser);
    storageService.setItem(AUTH_STORAGE_KEY, newUser);
  };

  const logout = () => {
    setUser(null);
    storageService.removeItem(AUTH_STORAGE_KEY);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth mora biti korišćen unutar AuthProvider-a');
  }
  return context;
}
