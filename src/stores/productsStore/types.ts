import type { PreviewState } from "../types";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: {
    desktop: string;
    thumbnail: string;
    tablet: string;
    mobile: string;
  };
}

export interface IProductsStore {
  products?: Product[];
  productsPreview: PreviewState;
  getProducts: () => Promise<void>;
}
