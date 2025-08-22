import { useMemo } from "react";
import { useCartStore } from "@/stores/CartStore";
import { CartStoreType } from "@/types/CartStoreType";
import { CartItemType } from "@/types/CartItemType";
import "./CartModal.css";

interface CartModalProps {
  setShowCart: (value: boolean) => void;
}

export default function CartModal({ setShowCart }: CartModalProps) {
  const { cart, addToCart, removeOneFromCart, removeFromCart, clearCart } =
    useCartStore((state: CartStoreType) => ({
      cart: state.cart,
      addToCart: state.addToCart,
      removeOneFromCart: state.removeOneFromCart,
      removeFromCart: state.removeFromCart,
      clearCart: state.clearCart,
    }));

  const cartItems = useMemo<CartItemType[]>(() => {
    const items: CartItemType[] = [];
    cart.forEach((product) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity += 1;
        existing.totalPrice += product.price;
      } else {
        items.push({ product, quantity: 1, totalPrice: product.price });
      }
    });
    return items;
  }, [cart]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const finalizePurchase = () => {
    const itemsMessage = cartItems
      .map(
        (item) =>
          `${item.quantity}x ${item.product.name} - R$ ${item.totalPrice.toFixed(
            2
          )}`
      )
      .join("\n");
    const message = `Olá, gostaria de finalizar meu pedido:\n${itemsMessage}\nTotal: R$ ${cartTotal.toFixed(
      2
    )}`;
    window.open(
      `https://wa.me/5532999742701?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="ModalContainer">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-lg font-semibold mb-4">Seu Carrinho</h2>
        {cartItems.length > 0 ? (
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between"
              >
                <div>
                  <span className="CartNameProduct">{item.product.name}</span>
                  <p className="CartDescriptionProduct">
                    {item.product.description}
                  </p>
                  <div className="QuantityContainer">
                    <button
                      onClick={() => removeOneFromCart(item.product.id)}
                      className="QuantityButton"
                    >
                      -
                    </button>
                    <span className="QuantityText">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item.product)}
                      className="QuantityButton"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-lg font-bold">
                    R$ {item.totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="RemoveItemButton"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <span className="font-semibold">
                Total: R$ {cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={finalizePurchase}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Finalizar compra
              </button>
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Limpar carrinho
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        )}
        <button
          onClick={() => setShowCart(false)}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
        >
          Continuar comprando
        </button>
      </div>
    </div>
  );
}
