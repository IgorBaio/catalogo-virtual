// components/Navbar.tsx
import React from "react";
import { ShoppingCart } from "lucide-react";
import { CartStoreType } from "@/types/CartStoreType";
import { useCartStore } from "@/stores/CartStore";

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const cart = useCartStore((state: CartStoreType) => state.cart);
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-50 max-w">
      <h1 className="text-xl font-bold text-gray-800">Meu Estabelecimento</h1>

      <button
        onClick={onCartClick}
        className="relative p-2 rounded-full  transition"
        aria-label="Carrinho"
      >
        <ShoppingCart className="w-6 h-6 " />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
