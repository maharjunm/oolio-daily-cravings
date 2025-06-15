/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { observable } from "mobx";
import { Provider } from "mobx-react";

import { Cart } from "..";

const mockRemoveItemFromCart = jest.fn();
const mockGetProductById = jest.fn();
const mockPlaceOrder = jest.fn();

let mockProductsStore: any;
let mockCartStore: any;
let mockOrderStore: any;

describe("Cart Component", () => {
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
      get totalCartItems() {
        return 3
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

  const renderWithProvider = () => {
    return render(
      <Provider {...fullMockRootStore}>
        <Cart />
      </Provider>
    );
  };

  it("should render cart items when totalCartItems is greater than 0", () => {
    mockCartStore.cartItems = { prod1: 2, prod2: 1 };

    renderWithProvider();

    expect(screen.getByText("Your Cart (3)")).toBeTruthy();
  });

  it("should call removeItemFromCart when remove button in CartItem is clicked", () => {
    mockCartStore.cartItems = { prod1: 2, prod2: 1 };
    renderWithProvider();

    const removeButton = screen.getByTestId("remove-item-prod1");
    fireEvent.click(removeButton);

    expect(mockRemoveItemFromCart).toHaveBeenCalledTimes(1);
    expect(mockRemoveItemFromCart).toHaveBeenCalledWith("prod1");
  });

  it('should call placeOrder when "Confirm Order" button is clicked', () => {
    
    renderWithProvider();

    const confirmButton = screen.getByText("Confirm Order");
    fireEvent.click(confirmButton);

    expect(mockPlaceOrder).toHaveBeenCalledTimes(1);
  });

  it('should disable "Confirm Order" button when orderPreview is "loading"', () => {
    mockCartStore.cartItems = { prod1: 1, prod2: 1 };
    mockOrderStore.orderPreview = "loading";

    renderWithProvider();

    const confirmButton = screen.getByText("Confirm Order");
    expect(confirmButton).toBeDisabled();
  });
});
