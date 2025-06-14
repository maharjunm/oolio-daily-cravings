import type { PreviewState } from "../types";

export interface IOrderStore {
  orderPreview: PreviewState;
  placeOrder: () => Promise<void>;
  resetStore: () => void;
}
