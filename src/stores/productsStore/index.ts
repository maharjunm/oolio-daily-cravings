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
    } catch (e) {
      this.productsPreview = "failed";
      throw e;
    } finally {
      this.productsPreview = "loaded";
    }
  }

  constructor() {
    makeObservable(this);
  }
}
