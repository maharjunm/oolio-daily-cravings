/* eslint-disable @typescript-eslint/no-explicit-any */
import OrderStore from "..";
import { axiosInstance } from "../../../interceptors/http";

jest.mock("../../../interceptors/http", () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}));

const mockAxiosPost = axiosInstance.post as jest.Mock;

const mockCartStore = {
  cartItems: {},
  increaseCartItemCount: jest.fn(),
  decreaseCartItemCount: jest.fn(),
  removeItemFromCart: jest.fn(),
  resetStore: jest.fn(),
  get totalCartItems() {
    return 0;
  },
  get totalValueOfCartItems() {
    return 0;
  },
};
const mockRootStore = {
  cartStore: mockCartStore,
  productsStore: {} as any,
};
describe("OrderStore", () => {
  let orderStore: any;
  let mockCartStore: any;

  beforeEach(() => {
    mockAxiosPost.mockClear();
  });

  it('should initialize with orderPreview as "idle"', () => {
    orderStore = new OrderStore(mockRootStore as any);
    expect(orderStore.orderPreview).toBe("idle");
  });

  it('should reset orderPreview to "idle"', () => {
    orderStore = new OrderStore(mockRootStore as any);
    orderStore.orderPreview = "loaded";
    orderStore.resetStore();
    expect(orderStore.orderPreview).toBe("idle");
  });

  describe("placeOrder with empty cart", () => {
    it("should not make an API call if cartItems is empty", async () => {
      orderStore = new OrderStore(mockRootStore as any);
      await orderStore.placeOrder();
      expect(mockAxiosPost).not.toHaveBeenCalled();
      expect(orderStore.orderPreview).toBe("idle");
    });

    it("should not make an API call if cartItems is null/undefined", async () => {
      orderStore = new OrderStore(mockRootStore as any);
      await orderStore.placeOrder();
      expect(mockAxiosPost).not.toHaveBeenCalled();
      expect(orderStore.orderPreview).toBe("idle");
    });
  });

  describe("placeOrder - success", () => {
    const expectedPayload = {
      couponCode: "",
      items: [
        { productId: "p1", quantity: 2 },
        { productId: "p2", quantity: 1 },
      ],
    };
    const mockApiResponse = { data: { id: "order123", status: "created" } };

    beforeEach(() => {
      mockAxiosPost.mockResolvedValueOnce(mockApiResponse);
    });

    it('should set orderPreview to "loading" then "loaded" on successful order', async () => {
      const store = {
        ...mockRootStore,
        cartStore: {
          ...mockCartStore,
          cartItems: {
            p1: 2,
            p2: 1,
          },
        },
      };
      orderStore = new OrderStore(store as any);
      const promise = orderStore.placeOrder();

      expect(orderStore.orderPreview).toBe("loading");
      expect(mockAxiosPost).toHaveBeenCalledTimes(1);
      expect(mockAxiosPost).toHaveBeenCalledWith("/order", expectedPayload);

      await promise;

      expect(orderStore.orderPreview).toBe("loaded");
    });
  });

  describe("placeOrder - failure", () => {
    const errorMessage = "Order failed due to server error";
    const mockError = new Error(errorMessage);

    beforeEach(() => {
      mockAxiosPost.mockRejectedValueOnce(mockError);
    });

    it('should set orderPreview to "loading" then "failed" on order failure', async () => {
      let caughtError: any;
      try {
        const store = {
          ...mockRootStore,
          cartStore: {
            ...mockCartStore,
            cartItems: {
              p1: 2,
              p2: 1,
            },
          },
        };
        orderStore = new OrderStore(store as any);
        await orderStore.placeOrder();
      } catch (e) {
        caughtError = e;
      }

      expect(orderStore.orderPreview).toBe("failed");

      expect(mockAxiosPost).toHaveBeenCalledTimes(1);

      expect(caughtError).toBe(mockError);
    });
  });
});
