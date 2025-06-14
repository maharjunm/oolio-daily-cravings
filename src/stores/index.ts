import ProductsStore from "./productsStore";
import type { IProductsStore } from "./productsStore/types";
import type { IRootStore } from "./types";

export default class RootStore implements IRootStore {
  productsStore: IProductsStore;

  constructor() {
    this.productsStore = new ProductsStore();
  }
}

export const stores = new RootStore();
