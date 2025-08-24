import { CartItemType } from "./CartItemType";
import { ProductType } from "./ProductType";

export interface CartStoreType {
    cart: ProductType[];
    addToCart: (product: ProductType) => void;
    decreaseFromCart: (id: number) => void;
    clearCart: () => void;
    setCart: (cart: ProductType[]) => void;
    cartItem:CartItemType[];
    setCartItems: (cartItems: CartItemType[]) => void;
    addToCartItem: (item: CartItemType) => void;
    removeFromCartItem?: (id: number) => void;
  }