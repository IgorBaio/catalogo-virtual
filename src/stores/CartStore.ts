import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";
import { ProductType } from "@/types/ProductType";
import { CartStoreType } from "@/types/CartStoreType";
import { CartItemType } from "@/types/CartItemType";

export const useCartStore = create<CartStoreType>()(
  persist(
    (set) => ({
      cart: [],
      setCart: (cart: ProductType[]) => set({ cart }),
      cartItem: [],
      setCartItems: (cartItems: CartItemType[]) => set({ cartItem: cartItems }),
      addToCart: (product: ProductType) =>
        set((state: CartStoreType) => ({ cart: [...state.cart, product] })),
      addToCartItem: (item: CartItemType) =>
        set((state: CartStoreType) => {
          const existingItem = state.cartItem.find(
            (i) => i.product.id === item.product.id
          );
          if (existingItem) {
            return {
              cartItem: state.cartItem.map((i) =>
                i.product.id === item.product.id
                  ? { ...i, quantity: i.quantity + 1, totalPrice: i.totalPrice + item.product.price }
                  : i
              ),
            };
          } else {
            return { cartItem: [...state.cartItem, item] };
          }
        }),
      decreaseFromCart: (id: number) =>
        set((state: CartStoreType) => ({
          cartItem: state.cartItem.map((i) =>{
            return i.product.id === id
              ? { ...i, quantity: Math.max(1, i.quantity - 1), totalPrice: i.totalPrice - i.product.price }
              : i}
          ),
        })),
      removeFromCartItem: (id: number) =>
        set((state: CartStoreType) => ({
          cartItem: state.cartItem.filter((i) => i.product.id !== id),
        })),
      clearCart: () => set({ cart: [], cartItem: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ cart, cartItem }: CartStoreType) => ({ cart, cartItem }),
    }
  )
);
