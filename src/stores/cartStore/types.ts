
export interface CartItems {
  [key: string]: number
}

export interface ICartStore {
  cartItems?: CartItems;
  increaseCartItemCount: (id: string) => void;
  decreaseCartItemCount: (id: string) => void;
  removeItemFromCart: (id: string) => void;
  totalCartItems: number;
  totalValueOfCartItems: number;
}
