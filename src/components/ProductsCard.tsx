
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ProductImage from "./ProductImage";
import { ProductsCardTypes } from "@/types/ProductsCardTypes";
import { useCartStore } from "@/stores/CartStore";
import { CartStoreType } from "@/types/CartStoreType";
import { CartItemType } from "@/types/CartItemType";
import { AddCartItem } from "./AddCartItem";

// import { randomArray, randomAvatar } from "./../../../utilities";

// // Tipagem para o componente
// const status: Array<"danger" | "success" | "warning" | "secondary"> = [
//   "danger",
//   "success",
//   "warning",
//   "secondary",
// ];

const ProductsCard = ({
  id,
  name,
  description,
  price,
  whatsappMessage,
  image = "https://github.com/shadcn.png",
}: ProductsCardTypes) => {
  const { addToCart, cart } = useCartStore((state: CartStoreType) => ({
    addToCart: state.addToCart,
    cart: state.cart,
  }));

  const getWhatsappLink = () => {
    if (cart.length === 0) {
      return `https://wa.me/5532999742701?text=${encodeURIComponent(
        whatsappMessage ?? ""
      )}`;
    }

    const cartItems: CartItemType[] = [];
    cart.forEach((item) => {
      const existing = cartItems.find(
        (cartItem) => cartItem.product.id === item.id
      );
      if (existing) {
        existing.quantity += 1;
        existing.totalPrice += item.price;
      } else {
        cartItems.push({
          product: item,
          quantity: 1,
          totalPrice: item.price,
        });
      }
    });

    const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const itemsMessage = cartItems
      .map(
        (item) =>
          `${item.quantity}x ${item.product.name} - R$ ${item.totalPrice.toFixed(
            2
          )}`
      )
      .join("\n");
    const message = `Olá, gostaria de finalizar meu pedido:\n${itemsMessage}\nTotal: R$ ${total.toFixed(
      2
    )}`;
    return `https://wa.me/5532999742701?text=${encodeURIComponent(message)}`;
  };
  return (
    <>
      <Card className="p-2 shadow border-none">
        <CardHeader>
          <ProductImage src={image} alt={name} />

          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="">{description}</CardDescription>
          <p className="text-green-600">R$ {price.toFixed(2)}</p>
          <a
            href={getWhatsappLink()}
            className="block mt-2 text-white bg-green-700 text-center rounded py-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Encomendar no WhatsApp
          </a>
          <AddCartItem
            addToCart={addToCart}
            product={{
              id,
              name,
              description,
              price,
            }}
          />
        </CardContent>
        {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
      </Card>
    </>
  );
};

export { ProductsCard };
