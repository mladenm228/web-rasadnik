import { useNotification } from '../context/NotificationContext';
import './Toast.css';

export function Toast() {
  const { notifications, dismiss } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="toast-stack">
      {notifications.map((notification) => (
        <div key={notification.id} className={`toast toast--${notification.type}`}>
          <span>{notification.message}</span>
          <button
            className="toast__close"
            onClick={() => dismiss(notification.id)}
            aria-label="Zatvori obaveštenje"
          >
          </button>
        </div>
      ))}
    </div>
  );
}
