import { FinalizeOrderProps } from "@/types/FinalizeOrderProps";
import { normalizeCurrency } from "./normalizeCurrency";

export const finalizeOrder = ({
    cartItems,
}: FinalizeOrderProps) => {
    if (cartItems.length === 0) return;
    const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const itemsMessage = cartItems
      .map(
        (item) =>
          `${item.quantity}x ${
            item.product.name
          } - R$ ${normalizeCurrency(item.totalPrice)}`
      )
      .join("\n");
    const message = `Olá, gostaria de finalizar meu pedido:\n${itemsMessage}\nTotal: R$ ${normalizeCurrency(total)}`;
    
    return `https://wa.me/5532999742701?text=${encodeURIComponent(message)}`
  };