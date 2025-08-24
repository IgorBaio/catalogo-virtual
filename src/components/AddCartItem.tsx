import { AddCartItemProps } from "@/types/AddCartItemProps";

export const AddCartItem = ({ addToCart }: AddCartItemProps) => {
  return (
    <button
      onClick={addToCart}
      className="mt-4 bg-blue-600 text-white rounded py-2 px-4 hover:bg-blue-700 transition"
    >
      Adicionar ao Carrinho
    </button>
  );
};
