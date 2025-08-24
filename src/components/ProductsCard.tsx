
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

const ProductsCard = ({
  id,
  name,
  description,
  price,
  image = "https://github.com/shadcn.png",
}: ProductsCardTypes) => {
  const addToCartItem = useCartStore((state) => state.addToCartItem);

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

  const addToCart = () =>{
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

    addToCartItem(item);
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
