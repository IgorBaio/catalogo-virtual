// components/Navbar.tsx
import React from "react";
import { ShoppingCart } from "lucide-react";
import { CartStoreType } from "@/types/CartStoreType";
import { useCartStore } from "@/stores/CartStore";
import "./Navbar.css";
import { CartItemType } from "@/types/CartItemType";

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const cartItem = useCartStore((state: CartStoreType) => state.cartItem);
  const calculateCartCount = (cartItems: CartItemType[]) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-50 max-w">
      <span className="OwnerTitle">Meu Estabelecimento</span>

      <button
        onClick={onCartClick}
        className="relative p-2 rounded-full  transition"
        aria-label="Carrinho"
      >
        <ShoppingCart className="w-6 h-6 " />
        {cartItem.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {calculateCartCount(cartItem) > 99 ? "99+" : calculateCartCount(cartItem)}
          </span>
        )}
      </button>
    </div>
  );
};

export default Navbar;
