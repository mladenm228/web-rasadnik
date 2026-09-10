import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toast } from './Toast';

export function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <Toast />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
