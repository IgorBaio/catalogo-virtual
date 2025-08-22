import { ProductType } from "./ProductType";

export interface CartStoreType {
  cart: ProductType[];
  addToCart: (product: ProductType) => void;
  removeOneFromCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  setCart: (cart: ProductType[]) => void;
}
