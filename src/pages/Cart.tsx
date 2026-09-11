import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { Button } from '../components/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Cart.css';

/** Stranica korpe: izmena količina, uklanjanje stavki, ukupna cena i simulacija poručivanja. */
export function Cart() {
  useDocumentTitle('Korpa');
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  const handleCheckout = () => {
    setPlacing(true);
    window.setTimeout(() => {
      clearCart();
      notify('Porudžbina je uspešno kreirana. Hvala na kupovini!', 'success');
      setPlacing(false);
      navigate('/');
    }, 900);
  };

  if (items.length === 0) {
    return (
      <div className="cart cart--empty">
        <h1>Vaša korpa je prazna</h1>
        <p>Pregledajte katalog i dodajte biljke koje vam se dopadaju.</p>
        <Link to="/katalog">
          <Button>Idi na katalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Korpa</h1>

      <ul className="cart__list">
        {items.map(({ plant, quantity }) => (
          <li key={plant.id} className="cart__item">
            <div className="cart__item-icon" style={{ background: plant.color }}>
              {plant.icon}
            </div>

            <div className="cart__item-info">
              <Link to={`/biljka/${plant.id}`}>{plant.name}</Link>
              <span className="cart__item-price">{plant.price.toLocaleString('sr-RS')} RSD</span>
            </div>

            <div className="cart__item-quantity">
              <button onClick={() => updateQuantity(plant.id, quantity - 1)} aria-label="Smanji količinu">
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => updateQuantity(plant.id, quantity + 1)}
                disabled={quantity >= plant.stock}
                aria-label="Povećaj količinu"
              >
                +
              </button>
            </div>

            <span className="cart__item-subtotal">
              {(plant.price * quantity).toLocaleString('sr-RS')} RSD
            </span>

            <button className="cart__item-remove" onClick={() => removeFromCart(plant.id)}>
              Ukloni
            </button>
          </li>
        ))}
      </ul>

      <div className="cart__summary">
        <span>Ukupno</span>
        <strong>{total.toLocaleString('sr-RS')} RSD</strong>
      </div>

      <div className="cart__actions">
        <Button variant="ghost" onClick={clearCart}>
          Isprazni korpu
        </Button>
        <Button onClick={handleCheckout} disabled={placing}>
          {placing ? 'Slanje porudžbine...' : 'Završi kupovinu'}
        </Button>
      </div>
    </div>
  );
}
