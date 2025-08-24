import { CartItemType } from "./CartItemType";

export interface FinalizeOrderProps {
    cartItems: CartItemType[];
    setCart?: (cart: CartItemType[]) => void;
    setShowCart?: (show: boolean) => void;
}