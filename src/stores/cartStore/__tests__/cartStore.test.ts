/* eslint-disable @typescript-eslint/no-explicit-any */
import { enableStaticRendering } from "mobx-react-lite";
import { autorun } from "mobx";
import CartStore, { COUPON_CODES } from "..";

const mockProduct1 = { id: "p1", name: "Apple", price: 1.5 };
const mockProduct2 = { id: "p2", name: "Banana", price: 0.75 };
const mockProduct3 = { id: "p3", name: "Orange", price: 2.0 };

const mockProductsStore: any = {
  products: [mockProduct1, mockProduct2, mockProduct3],
  productsPreview: "loaded",
  getProducts: jest.fn(),
  resetProductsState: jest.fn(),
};

const mockRootStore = {
  productsStore: mockProductsStore,
};

enableStaticRendering(true);

describe("CartStore", () => {
  let cartStore: any;

  beforeEach(() => {
    mockProductsStore.getProductById = jest.fn((id: string) => {
      switch (id) {
        case "p1":
          return mockProduct1;
        case "p2":
          return mockProduct2;
        case "p3":
          return mockProduct3;
        default:
          return undefined;
      }
    });

    cartStore = new CartStore(mockRootStore as any);
  });

  it("should initialize with an empty cart", () => {
    expect(cartStore.cartItems).toEqual({});
    expect(cartStore.totalCartItems).toBe(0);
    expect(cartStore.totalValueOfCartItems).toBe(0);
  });

  describe("increaseCartItemCount", () => {
    it("should add a new item to the cart with count 1", () => {
      cartStore.increaseCartItemCount("p1");
      expect(cartStore.cartItems).toEqual({ p1: 1 });
      expect(cartStore.totalCartItems).toBe(1);
    });

    it("should increase the count of an existing item", () => {
      cartStore.increaseCartItemCount("p1");
      cartStore.increaseCartItemCount("p1");
      expect(cartStore.cartItems).toEqual({ p1: 2 });
      expect(cartStore.totalCartItems).toBe(2);
    });

    it("should handle multiple different items", () => {
      cartStore.increaseCartItemCount("p1");
      cartStore.increaseCartItemCount("p2");
      cartStore.increaseCartItemCount("p1");
      expect(cartStore.cartItems).toEqual({ p1: 2, p2: 1 });
      expect(cartStore.totalCartItems).toBe(3);
    });
  });

  describe("decreaseCartItemCount", () => {
    beforeEach(() => {
      cartStore.increaseCartItemCount("p1");
      cartStore.increaseCartItemCount("p2");
    });

    it("should decrease the count of an existing item", () => {
      cartStore.increaseCartItemCount("p1");
      cartStore.decreaseCartItemCount("p1");
      expect(cartStore.cartItems).toEqual({ p1: 1, p2: 1 });
      expect(cartStore.totalCartItems).toBe(2);
    });

    it("should remove an item if its count becomes 0 or 1", () => {
      cartStore.decreaseCartItemCount("p1");
      expect(cartStore.cartItems).toEqual({ p2: 1 });
      expect(cartStore.totalCartItems).toBe(1);
    });
  });

  describe("removeItemFromCart", () => {
    beforeEach(() => {
      cartStore.increaseCartItemCount("p1");
      cartStore.increaseCartItemCount("p2");
      cartStore.increaseCartItemCount("p1");
    });

    it("should remove a specified item from the cart", () => {
      cartStore.removeItemFromCart("p1");
      expect(cartStore.cartItems).toEqual({ p2: 1 });
      expect(cartStore.totalCartItems).toBe(1);
    });

    it("should do nothing if the item to remove does not exist", () => {
      cartStore.removeItemFromCart("p99");
      expect(cartStore.cartItems).toEqual({ p1: 2, p2: 1 });
    });

    it("should correctly update totalCartItems after removal", () => {
      cartStore.removeItemFromCart("p1");
      expect(cartStore.totalCartItems).toBe(1);
    });
  });

  it("should reset the cart to an empty state", () => {
    cartStore.increaseCartItemCount("p1");
    cartStore.increaseCartItemCount("p2");
    expect(cartStore.totalCartItems).toBe(2);

    cartStore.resetStore();
    expect(cartStore.cartItems).toEqual({});
    expect(cartStore.totalCartItems).toBe(0);
    expect(cartStore.totalValueOfCartItems).toBe(0);
  });

  describe("totalCartItems getter", () => {
    it("should return 0 for an empty cart", () => {
      expect(cartStore.totalCartItems).toBe(0);
    });

    it("should correctly sum up quantities of all items", () => {
      cartStore.increaseCartItemCount("p1");
      cartStore.increaseCartItemCount("p2");
      cartStore.increaseCartItemCount("p1");
      cartStore.increaseCartItemCount("p3");
      expect(cartStore.totalCartItems).toBe(4);
    });
  });

  describe("totalValueOfCartItems getter", () => {
    it("should return 0 for an empty cart", () => {
      expect(cartStore.totalValueOfCartItems).toBe(0);
    });

    it("should correctly calculate the total value of items in the cart", () => {
      cartStore.increaseCartItemCount("p1");
      cartStore.increaseCartItemCount("p2");
      cartStore.increaseCartItemCount("p1");
      cartStore.increaseCartItemCount("p3");

      expect(cartStore.totalValueOfCartItems).toBe(5.75);
      expect(mockProductsStore.getProductById).toHaveBeenCalledWith("p1");
      expect(mockProductsStore.getProductById).toHaveBeenCalledWith("p2");
      expect(mockProductsStore.getProductById).toHaveBeenCalledWith("p3");
      expect(mockProductsStore.getProductById).toHaveBeenCalledTimes(3);
    });

    it("should handle products not found (price 0) gracefully", () => {
      cartStore.increaseCartItemCount("p1");
      cartStore.increaseCartItemCount("p99");
      expect(cartStore.totalValueOfCartItems).toBe(1.5);
      expect(mockProductsStore.getProductById).toHaveBeenCalledWith("p99");
    });
  });

  it("should reactively update totalCartItems when cartItems change", () => {
    let totalItems = 0;
    const disposer = autorun(() => {
      totalItems = cartStore.totalCartItems;
    });

    expect(totalItems).toBe(0);

    cartStore.increaseCartItemCount("p1");
    expect(totalItems).toBe(1);

    cartStore.increaseCartItemCount("p1");
    expect(totalItems).toBe(2);

    cartStore.decreaseCartItemCount("p1");
    expect(totalItems).toBe(1);

    cartStore.removeItemFromCart("p1");
    expect(totalItems).toBe(0);

    disposer();
  });

  it("should reactively update totalValueOfCartItems when cartItems change", () => {
    let totalValue = 0;
    const disposer = autorun(() => {
      totalValue = cartStore.totalValueOfCartItems;
    });

    expect(totalValue).toBe(0);

    cartStore.increaseCartItemCount("p1");
    expect(totalValue).toBe(1.5);

    cartStore.increaseCartItemCount("p2");
    expect(totalValue).toBe(2.25);

    cartStore.increaseCartItemCount("p1");
    expect(totalValue).toBe(3.75);

    disposer();
  });

  describe("applyCoupon", () => {
    it("should set validCoupon to true for HAPPYHOURS coupon", () => {
      cartStore.coupon.code = COUPON_CODES.HAPPYHOURS;
      cartStore.applyCoupon();
      expect(cartStore.validCoupon).toBe(true);
      expect(cartStore.discountedProduct).toBeUndefined();
    });

    describe("BUYGETONE coupon", () => {
      it("should set validCoupon to true and discountedProduct if totalCartItems > 2", () => {
        cartStore.increaseCartItemCount("p1");
        cartStore.increaseCartItemCount("p2");
        cartStore.increaseCartItemCount("p3");
        cartStore.coupon.code = COUPON_CODES.BUYGETONE;
        cartStore.applyCoupon();

        expect(cartStore.validCoupon).toBe(true);
        expect(cartStore.discountedProduct).toEqual(mockProduct2);
      });

      it("should NOT apply BUYGETONE coupon if totalCartItems <= 2", () => {
        cartStore.increaseCartItemCount("p1");
        cartStore.increaseCartItemCount("p3");
        cartStore.coupon.code = COUPON_CODES.BUYGETONE;
        cartStore.applyCoupon();

        expect(cartStore.validCoupon).toBe(false);
        expect(cartStore.discountedProduct).toBeUndefined();
      });

      it("should correctly identify the lowest priced item even with varying quantities", () => {
        cartStore.increaseCartItemCount("p1");
        cartStore.increaseCartItemCount("p1");
        cartStore.increaseCartItemCount("p3");
        cartStore.increaseCartItemCount("p4");
        cartStore.coupon.code = COUPON_CODES.BUYGETONE;
        cartStore.applyCoupon();

        expect(cartStore.validCoupon).toBe(true);
        expect(cartStore.discountedProduct).toEqual(mockProduct1);
      });
    });

    it("should do nothing for an invalid coupon code", () => {
      cartStore.coupon.code = "INVALID_CODE";
      cartStore.applyCoupon();
      expect(cartStore.validCoupon).toBe(false);
      expect(cartStore.discountedProduct).toBeUndefined();
    });
  });

  describe("disountedTotal getter", () => {
    it("should return empty string if no coupon is applied", () => {
      cartStore.increaseCartItemCount("p1");
      expect(cartStore.disountedTotal).toBe("");
    });

    it("should calculate 18% discount for HAPPYHOURS", () => {
      cartStore.increaseCartItemCount("p1");
      cartStore.increaseCartItemCount("p3");
      cartStore.increaseCartItemCount("p3");
      cartStore.coupon.code = COUPON_CODES.HAPPYHOURS;
      cartStore.applyCoupon();

      const expectedDiscount = (5.5 - 5.5 * 0.18).toFixed(2);
      expect(cartStore.disountedTotal).toBe(expectedDiscount); // 4.51
    });

    it("should calculate discount based on lowest priced item for BUYGETONE", () => {
      cartStore.increaseCartItemCount("p1");
      cartStore.increaseCartItemCount("p2");
      cartStore.increaseCartItemCount("p3");
      cartStore.coupon.code = COUPON_CODES.BUYGETONE;
      cartStore.applyCoupon();

      const expectedDiscount = (4.25 - 0.75).toFixed(2);
      expect(cartStore.disountedTotal).toBe(expectedDiscount);
    });

    it("should return empty string if BUYGETONE is applied but discountedProduct is undefined (e.g., totalCartItems <= 2)", () => {
      cartStore.increaseCartItemCount("p1");
      cartStore.coupon.code = COUPON_CODES.BUYGETONE;
      cartStore.applyCoupon();

      expect(cartStore.disountedTotal).toBe("");
    });
  });

  it("should reactively update disountedTotal when cart items or coupon change", () => {

    expect(cartStore.disountedTotal).toBe("");

    cartStore.increaseCartItemCount("p1");
    cartStore.coupon.code = COUPON_CODES.HAPPYHOURS;
    cartStore.applyCoupon();

    expect(cartStore.disountedTotal).toBe((1.5 - 1.5 * 0.18).toFixed(2));

    cartStore.resetStore();
    cartStore.increaseCartItemCount("p1");
    cartStore.increaseCartItemCount("p2");
    cartStore.increaseCartItemCount("p3");
    cartStore.coupon.code = COUPON_CODES.BUYGETONE;
    cartStore.applyCoupon();

    expect(cartStore.disountedTotal).toBe((4.25 - 0.75).toFixed(2));
  });
});
