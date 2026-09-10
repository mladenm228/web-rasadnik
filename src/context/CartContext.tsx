import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { ShoppingCart } from '../models/ShoppingCart';
import type { IPlant } from '../models/Plant';
import type { ICartItem } from '../models/CartItem';
import { storageService } from '../models/LocalStorageService';

const CART_STORAGE_KEY = 'rasadnik_cart';

interface CartContextValue {
  items: ICartItem[];
  itemCount: number;
  total: number;
  addToCart: (plant: IPlant, quantity?: number) => void;
  removeFromCart: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShoppingCart>(
    () => new ShoppingCart(storageService.getItem<ICartItem[]>(CART_STORAGE_KEY, [])),
  );

  useEffect(() => {
    storageService.setItem(CART_STORAGE_KEY, cart.getItems());
  }, [cart]);

  const value: CartContextValue = {
    items: cart.getItems(),
    itemCount: cart.getItemCount(),
    total: cart.getTotal(),
    addToCart: (plant, quantity = 1) => setCart((current) => current.addItem(plant, quantity)),
    removeFromCart: (plantId) => setCart((current) => current.removeItem(plantId)),
    updateQuantity: (plantId, quantity) =>
      setCart((current) => current.updateQuantity(plantId, quantity)),
    clearCart: () => setCart((current) => current.clear()),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart mora biti korišćen unutar CartProvider-a');
  }
  return context;
}
