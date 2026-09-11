import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './NotFound.css';

export function NotFound() {
  useDocumentTitle('Stranica nije pronađena');

  return (
    <div className="not-found">
      <span className="not-found__icon">🥀</span>
      <h1>404 - Stranica nije pronađena</h1>
      <p>Izgleda da je ova stranica uvenula. Vratite se na početnu i pronađite nešto novo.</p>
      <Link to="/">Nazad na početnu</Link>
    </div>
  );
}
