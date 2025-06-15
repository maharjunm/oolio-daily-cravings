import { action, makeObservable, observable } from "mobx";
import type { IOrderStore } from "./types";
import { axiosInstance } from "../../interceptors/http";
import type { IRootStore, PreviewState } from "../types";

export default class OrderStore implements IOrderStore {
  @observable rootStore;
  @observable orderPreview: PreviewState = "idle";

  @action.bound
  resetStore() {
    this.orderPreview = "idle";
  }

  @action.bound
  async placeOrder() {
    const {
      cartStore: { cartItems },
    } = this.rootStore;
    const cartItemsIds = Object.keys(cartItems || {});
    if (cartItems && cartItemsIds.length > 0) {
      const items = cartItemsIds.map((id) => {
        return {
          productId: id,
          quantity: cartItems[id],
        };
      });
      try {
        this.orderPreview = "loading";
        await axiosInstance.post("/order", {
          couponCode: "",
          items,
        });
        this.orderPreview = "loaded";
      } catch (e) {
        this.orderPreview = "failed";
        throw e;
      }
    }
  }

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }
}
