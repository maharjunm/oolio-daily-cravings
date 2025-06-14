import { observable } from "mobx";
import CartStore from "./cartStore";
import type { ICartStore } from "./cartStore/types";
import ProductsStore from "./productsStore";
import type { IProductsStore } from "./productsStore/types";
import type { IRootStore } from "./types";

export default class RootStore implements IRootStore {
  @observable productsStore: IProductsStore;
  @observable cartStore: ICartStore;

  constructor() {
    this.productsStore = new ProductsStore();
    this.cartStore = new CartStore(this);
  }
}

export const stores = new RootStore();
