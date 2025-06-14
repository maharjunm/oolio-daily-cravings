import type { ICartStore } from "./cartStore/types";
import type { IProductsStore } from "./productsStore/types";

export interface IRootStore {
    productsStore: IProductsStore;
    cartStore: ICartStore;
}

export type PreviewState = 'idle' | 'loading' | 'loaded' | 'failed'