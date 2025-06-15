/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "mobx-react"; // Import MobX Provider

import { OrderConfirmation } from "..";

const mockOrderResetStore = jest.fn();
const mockCartResetStore = jest.fn();
const mockIncreaseCartItemCount = jest.fn();
const mockDecreaseCartItemCount = jest.fn();
const mockGetProductById = jest.fn();

let mockProductsStore: any;
let mockCartStore: any;
let mockOrderStore: any;

describe("OrderConfirmation Component", () => {
  const mockOnClose = jest.fn();

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

  let fullMockRootStore: any; // This will be the full mock passed to the Provider

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnClose.mockClear();

    mockProductsStore = {
      productsPreview: "loaded",
      products: MOCK_PRODUCTS,
      getProducts: jest.fn(),
      getProductById: mockGetProductById,
    };

    mockCartStore = {
      cartItems: {},
      increaseCartItemCount: mockIncreaseCartItemCount,
      decreaseCartItemCount: mockDecreaseCartItemCount,
      removeItemFromCart: jest.fn(),
      resetStore: mockCartResetStore,
      get totalCartItems() {
        return 0;
      },
      get totalValueOfCartItems() {
        return 10.5;
      },
    };

    mockOrderStore = {
      orderPreview: "idle",
      resetStore: mockOrderResetStore,
      placeOrder: jest.fn(),
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

  const renderWithProvider = () => {
    return render(
      <Provider {...fullMockRootStore}>
        <OrderConfirmation onClose={mockOnClose} />
      </Provider>
    );
  };

  it('should render the modal with "Order Confirmed" title and default messages', () => {
    renderWithProvider();
    expect(screen.getByText("Order Confirmed")).toBeTruthy();
    expect(screen.getByText("Start New Order")).toBeInTheDocument();
  });

  it("should display items from the cart", () => {
    mockCartStore.cartItems = {
      prod1: 2,
      prod2: 1,
    };

    renderWithProvider();

    expect(screen.getByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("Croissant")).toBeInTheDocument();

    expect(screen.getByText("2x")).toBeInTheDocument();

    expect(screen.getByText("1x")).toBeInTheDocument();
  });
});
