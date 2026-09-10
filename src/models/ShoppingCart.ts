import type { IPlant } from './Plant';
import type { ICartItem } from './CartItem';


export class ShoppingCart {
  private readonly items: ICartItem[];

  constructor(initialItems: ICartItem[] = []) {
    this.items = initialItems;
  }

  getItems(): ICartItem[] {
    return this.items;
  }

  addItem(plant: IPlant, quantity: number = 1): ShoppingCart {
    const existing = this.items.find((item) => item.plant.id === plant.id);

    if (existing) {
      return new ShoppingCart(
        this.items.map((item) =>
          item.plant.id === plant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    }

    return new ShoppingCart([...this.items, { plant, quantity }]);
  }

  removeItem(plantId: string): ShoppingCart {
    return new ShoppingCart(this.items.filter((item) => item.plant.id !== plantId));
  }

  updateQuantity(plantId: string, quantity: number): ShoppingCart {
    if (quantity <= 0) {
      return this.removeItem(plantId);
    }
    return new ShoppingCart(
      this.items.map((item) => (item.plant.id === plantId ? { ...item, quantity } : item)),
    );
  }

  clear(): ShoppingCart {
    return new ShoppingCart([]);
  }

  getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.plant.price * item.quantity, 0);
  }
}
