import { observable } from "mobx";
import CartStore from "./cartStore";
import type { ICartStore } from "./cartStore/types";
import ProductsStore from "./productsStore";
import type { IProductsStore } from "./productsStore/types";
import type { IRootStore } from "./types";
import type { IOrderStore } from "./orderStore/types";
import OrderStore from "./orderStore";

export default class RootStore implements IRootStore {
  @observable productsStore: IProductsStore;
  @observable cartStore: ICartStore;
  @observable orderStore: IOrderStore;

  resetStores() {
    this.productsStore = new ProductsStore();
    this.cartStore = new CartStore(this);
    this.orderStore = new OrderStore(this);
  }

  constructor() {
    this.productsStore = new ProductsStore();
    this.cartStore = new CartStore(this);
    this.orderStore = new OrderStore(this);
  }
}

export const stores = new RootStore();
