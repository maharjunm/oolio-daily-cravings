import { action, makeObservable, observable } from "mobx";
import type { IProductsStore, Product } from "./types";
import { axiosInstance } from "../../interceptors/http";
import type { PreviewState } from "../types";

export default class ProductsStore implements IProductsStore {
  @observable products?: Product[];
  @observable productsPreview: PreviewState = "idle";

  @action.bound
  async getProducts() {
    try {
      this.productsPreview = "loading";
      const response = await axiosInstance.get("/products");
      this.products = response.data;
      this.productsPreview = "loaded";
    } catch (e) {
      this.productsPreview = "failed";
      throw e;
    }
  }

  @action.bound
  getProductById(id: string) {
    return this?.products?.find((p) => p.id === id);
  }

  constructor() {
    makeObservable(this);
  }
}
