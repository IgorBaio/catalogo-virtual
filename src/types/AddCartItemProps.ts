import { ProductType } from "./ProductType";

export interface AddCartItemProps {
  addToCart: () => void;
  product: ProductType;
}
