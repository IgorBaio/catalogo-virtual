import { ProductType } from "./ProductType";

export interface CartItemType {
  product: ProductType;
  quantity: number;
  totalPrice: number;
  totalPriceWithDiscount?: number;
}
