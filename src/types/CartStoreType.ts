import { ProductType } from "./ProductType";

export interface CartStoreType {
    cart: ProductType[];
    addToCart: (product: ProductType) => void;
    clearCart: () => void;
  }