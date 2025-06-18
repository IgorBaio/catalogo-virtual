
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
import { updateProduct } from "@/services/productApi";

// import { randomArray, randomAvatar } from "./../../../utilities";

const ProductsCard = ({
  id,
  name,
  description,
  price,
  whatsappMessage,
  image = "https://github.com/shadcn.png",
}: ProductsCardTypes) => {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <>
      <Card className="p-2 shadow border-none">
        <CardHeader>
          <ProductImage src={image} alt={name} />

          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="">{description}</CardDescription>
          <p className="text-green-600">{price}</p>
          <a
            href={`https://wa.me/5532999742701?text=${encodeURIComponent(
              whatsappMessage ?? ''
            )}`}
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
          <button
            onClick={() =>
              updateProduct(id, { name, price, description }).catch(() => {})
            }
            className="mt-2 bg-gray-200 text-gray-800 rounded py-1 px-2"
          >
            Atualizar no servidor
          </button>
        </CardContent>
        {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
      </Card>
    </>
  );
};

export { ProductsCard };
