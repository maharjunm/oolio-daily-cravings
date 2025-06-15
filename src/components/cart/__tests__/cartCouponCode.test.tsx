/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { observable } from "mobx";
import { Provider } from "mobx-react";
import { CartCouponCode } from "../cartCouponCode";

const mockRemoveItemFromCart = jest.fn();
const mockGetProductById = jest.fn();
const mockPlaceOrder = jest.fn();

let mockProductsStore: any;
let mockCartStore: any;
let mockOrderStore: any;
describe("CartCouponCode", () => {
  const MOCK_PRODUCTS = [
    {
      id: "prod1",
      name: "Coffee",
      price: 2.5,
      description: "Hot Coffee",
      image: { desktop: "coffee.png" },
    },
    {
      id: "prod2",
      name: "Croissant",
      price: 3.0,
      description: "Flaky Croissant",
      image: { desktop: "croissant.png" },
    },
  ];

  let fullMockRootStore: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockProductsStore = {
      productsPreview: "loaded",
      products: MOCK_PRODUCTS,
      getProducts: jest.fn(),
      getProductById: mockGetProductById,
    };

    mockCartStore = {
      cartItems: observable.map<string, number>({}),
      increaseCartItemCount: jest.fn(),
      decreaseCartItemCount: jest.fn(),
      removeItemFromCart: mockRemoveItemFromCart,
      coupon: {
        code: "",
        errorMessage: "",
        successMessage: "",
      },
      updateMessage: jest.fn(),
      get totalCartItems() {
        return 3;
      },
      get totalValueOfCartItems() {
        return 10.5;
      },
      resetStore: jest.fn(),
    };

    mockOrderStore = {
      orderPreview: "idle",
      placeOrder: mockPlaceOrder,
      resetStore: jest.fn(),
    };

    mockGetProductById.mockImplementation((id: string) =>
      MOCK_PRODUCTS.find((p) => p.id === id)
    );

    fullMockRootStore = {
      productsStore: mockProductsStore,
      cartStore: mockCartStore,
      orderStore: mockOrderStore,
    };
  });
  const renderWithProvider = (store?: any) => {
    return render(
      <Provider {...fullMockRootStore} {...(store || {})}>
        <CartCouponCode />
      </Provider>
    );
  };

  it("renders correctly with initial state", () => {
    renderWithProvider();

    expect(screen.getByText("Have a coupon code?")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter coupon code")).toHaveValue("");
  });

  it("updates coupon code input value in store", () => {
    renderWithProvider();

    const input = screen.getByPlaceholderText("Enter coupon code");
    fireEvent.change(input, { target: { value: "NEWCODE" } });

    expect(mockCartStore.updateMessage).toHaveBeenCalledWith("code", "NEWCODE");
  });
});
