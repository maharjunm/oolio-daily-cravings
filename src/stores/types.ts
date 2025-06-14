import type { IProductsStore } from "./productsStore/types";

export interface IRootStore {
    productsStore: IProductsStore;
}

export type PreviewState = 'idle' | 'loading' | 'loaded' | 'failed'