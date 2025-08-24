
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
import { AddCartItem } from "./AddCartItem";
import { CartItemType } from "@/types/CartItemType";
import { finalizeOrder } from "@/functions/finalizeOrder";

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
  const addToCart = useCartStore((state) => state.addToCart);

  const finalizeOneOrder = () => {
    const cartItems: CartItemType[] = []
    const item: CartItemType = {
      product: {
        id,
        name,
        description,
        price,
      },
      quantity: 1,
      totalPrice: price,
    };

    cartItems.push(item);
    return finalizeOrder({cartItems});

  }

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
            href={finalizeOneOrder()}
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
      </Card>
    </>
  );
};

export { ProductsCard };
