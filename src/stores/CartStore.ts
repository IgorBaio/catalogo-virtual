import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";
import { ProductType } from "@/types/ProductType";
import { CartStoreType } from "@/types/CartStoreType";

export const useCartStore = create<CartStoreType>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product: ProductType) =>
        set((state: CartStoreType) => ({ cart: [...state.cart, product] })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ cart }: CartStoreType) => ({ cart }),
    }
  )
);
