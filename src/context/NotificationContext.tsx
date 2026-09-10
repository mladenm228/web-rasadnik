import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface NotificationContextValue {
  notifications: Notification[];
  notify: (message: string, type?: Notification['type']) => void;
  dismiss: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

let nextId = 1;

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const dismiss = useCallback((id: number) => {
    setNotifications((current) => current.filter((n) => n.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, type: Notification['type'] = 'success') => {
      const id = nextId++;
      setNotifications((current) => [...current, { id, message, type }]);
      window.setTimeout(() => dismiss(id), 3000);
    },
    [dismiss],
  );

  return (
    <NotificationContext.Provider value={{ notifications, notify, dismiss }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification mora biti korišćen unutar NotificationProvider-a');
  }
  return context;
}
