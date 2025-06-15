import { action, makeObservable, observable } from "mobx";
import type { ICartStore, CartItems } from "./types";
import type { IRootStore } from "../types";
import type { Product } from "../productsStore/types";

export enum COUPON_CODES {
  HAPPYHOURS = "HAPPYHOURS",
  BUYGETONE = "BUYGETONE",
}

const defaultCoupon = {
  code: "",
  errorMessage: "",
  successMessage: "",
};

export default class CartStore implements ICartStore {
  @observable rootStore;
  @observable cartItems: CartItems = {};
  @observable coupon = defaultCoupon;
  @observable validCoupon = false;
  @observable discountedProduct?: Product;

  @action.bound
  resetStore() {
    this.cartItems = {};
    this.coupon = defaultCoupon;
    this.discountedProduct = undefined;
    this.validCoupon = false;
  }

  @action.bound
  increaseCartItemCount(id: string) {
    if (this.cartItems[id]) {
      this.cartItems[id] = this.cartItems[id] + 1;
    } else {
      this.cartItems[id] = 1;
    }
  }

  get disountedTotal() {
    if (this.coupon.code === COUPON_CODES.HAPPYHOURS) {
      return (
        this.totalValueOfCartItems -
        this.totalValueOfCartItems * 0.18
      ).toFixed(2);
    }
    return this.discountedProduct
      ? (this.totalCartItems - this.discountedProduct?.price).toFixed(2)
      : "";
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

  @action.bound
  updateMessage(field: string, message: string) {
    this.coupon[field as keyof typeof this.coupon] = message;
  }

  @action.bound
  applyCoupon() {
    const { productsStore } = this.rootStore;
    if (this.coupon.code === COUPON_CODES.BUYGETONE) {
      if (this.totalCartItems > 2) {
        const mappedProducts = Object.keys(this.cartItems).map((id) => {
          return productsStore.getProductById(id);
        });
        const sortedByPrice = mappedProducts.sort(
          (a?: Product, b?: Product) => {
            if (a && b) {
              return a?.price > b?.price ? 1 : -1;
            }
            return 0;
          }
        );
        this.validCoupon = true;
        this.discountedProduct = sortedByPrice[0];
      }
    } else if (this.coupon.code === COUPON_CODES.HAPPYHOURS) {
      this.validCoupon = true;
    }
  }

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }
}
