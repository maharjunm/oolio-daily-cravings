import { action, makeObservable, observable } from "mobx";
import type { ICartStore, CartItems } from "./types";
import type { IRootStore } from "../types";

export default class CartStore implements ICartStore {
  @observable rootStore;
  @observable cartItems: CartItems = {};

  @action.bound
  increaseCartItemCount(id: string) {
    if (this.cartItems[id]) {
      this.cartItems[id] = this.cartItems[id] + 1;
    } else {
      this.cartItems[id] = 1;
    }
  }

  @action.bound
  decreaseCartItemCount(id: string) {
    if (this.cartItems[id] === 1) {
      delete this.cartItems[id];
    } else {
      this.cartItems[id] = this.cartItems[id] - 1;
    }
  }
  @action.bound
  removeItemFromCart(id: string) {
    delete this.cartItems[id];
  }

  get totalCartItems() {
    if (this?.cartItems && Object.values(this.cartItems).length > 0) {
      return Object.values(this.cartItems).reduce((acc, i) => acc + i);
    }
    return 0;
  }

  get totalValueOfCartItems() {
    const {
      productsStore: { getProductById },
    } = this.rootStore;
    if (this?.cartItems && Object.values(this.cartItems).length > 0) {
      return Object.keys(this.cartItems).reduce((acc, id) => {
        const product = getProductById(id);
        return +(product?.price || 0) * this.cartItems[id] + acc;
      }, 0);
    }
    return 0;
  }

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }
}
