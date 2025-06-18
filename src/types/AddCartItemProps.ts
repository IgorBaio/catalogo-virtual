import { ProductType } from "./ProductType";

export interface AddCartItemProps {
  addToCart: (product: ProductType) => void;
  product: ProductType;
}
