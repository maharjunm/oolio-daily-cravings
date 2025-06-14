import type { ICartStore } from "./cartStore/types";
import type { IOrderStore } from "./orderStore/types";
import type { IProductsStore } from "./productsStore/types";

export interface IRootStore {
    productsStore: IProductsStore;
    cartStore: ICartStore;
    orderStore: IOrderStore;
    resetStores: () => void;
}

export type PreviewState = 'idle' | 'loading' | 'loaded' | 'failed'