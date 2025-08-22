import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";
import { ProductType } from "@/types/ProductType";
import { CartStoreType } from "@/types/CartStoreType";

const createStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage;
  }
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  } as Storage;
};

export const useCartStore = create<CartStoreType>()(
  persist(
    (set) => ({
      cart: [],
      setCart: (cart: ProductType[]) => set({ cart }),
      addToCart: (product: ProductType) =>
        set((state: CartStoreType) => ({ cart: [...state.cart, product] })),
      removeOneFromCart: (productId: number) =>
        set((state: CartStoreType) => {
          const index = state.cart.findIndex((item) => item.id === productId);
          if (index === -1) {
            return { cart: state.cart };
          }
          const newCart = [...state.cart];
          newCart.splice(index, 1);
          return { cart: newCart };
        }),
      removeFromCart: (productId: number) =>
        set((state: CartStoreType) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(createStorage),
      partialize: ({ cart }: CartStoreType) => ({ cart }),
    }
  )
);
