import type { Product } from "../productsStore/types";

export interface CartItems {
  [key: string]: number;
}

export interface ICartStore {
  cartItems?: CartItems;
  coupon: {
    code: string;
    errorMessage: string;
    successMessage: string;
  };
  increaseCartItemCount: (id: string) => void;
  decreaseCartItemCount: (id: string) => void;
  updateMessage: (field: string, message: string) => void;
  discountedProduct?: Product;
  removeItemFromCart: (id: string) => void;
  resetStore: () => void;
  totalCartItems: number;
  disountedTotal: string;
  totalValueOfCartItems: number;
  applyCoupon: () => void;
  validCoupon: boolean;
}
