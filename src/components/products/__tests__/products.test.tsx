/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { observable } from "mobx";
import { Provider } from "mobx-react";

import { Products } from "..";

const mockGetProducts = jest.fn();
const mockIncreaseCartItemCount = jest.fn();
const mockDecreaseCartItemCount = jest.fn();

let mockProductsStore: any;
let mockCartStore: any;
let mockOrderStore: any;

let mockStores = jest.fn();

describe("Products Component", () => {
  const MOCK_PRODUCTS = [
    { id: "prod1", name: "Dessert A", price: 10, image: { desktop: 'testImage.png' } },
    { id: "prod2", name: "Dessert B", price: 15, image: { desktop: 'testImage.png' }},
  ];

  jest.mock("../../../stores/useStores", () => {
    mockStores = jest.fn();
    return {
      __esModule: true,
      default: mockStores,
    };
  });
  let rootStore: any;

  beforeEach(() => {
    mockGetProducts.mockClear();
    mockIncreaseCartItemCount.mockClear();
    mockDecreaseCartItemCount.mockClear();

    mockProductsStore = {
      productsPreview: "idle",
      products: [],
      getProducts: mockGetProducts,
    };

    mockCartStore = {
      cartItems: observable.map<string, number>({}),
      increaseCartItemCount: mockIncreaseCartItemCount,
      decreaseCartItemCount: mockDecreaseCartItemCount,
      totalCartItems: 0,
      totalValueOfCartItems: 0,
      removeItemFromCart: jest.fn(),
      resetStore: jest.fn(),
    };

    mockOrderStore = {
      orderPreview: "idle",
      resetStore: jest.fn(),
      placeOrder: jest.fn(),
    };

    rootStore = {
      productsStore: mockProductsStore,
      cartStore: mockCartStore,
      orderStore: mockOrderStore,
    };
    mockStores.mockClear();
  });

  const renderWithProvider = () => {
    return render(
      <Provider {...rootStore}>
        <Products />
      </Provider>
    );
  };

  it('should call getProducts on mount if productsPreview is "idle"', () => {
    mockStores.mockResolvedValueOnce(rootStore);
    renderWithProvider();
    expect(mockGetProducts).toHaveBeenCalledTimes(1);
  });

  it('should call getProducts on mount if productsPreview is "failed"', () => {
    mockProductsStore.productsPreview = "failed";
    renderWithProvider();
    expect(mockGetProducts).toHaveBeenCalledTimes(1);
  });

  it('should display products when productsPreview is "loaded" and products exist', () => {
    mockProductsStore.productsPreview = "loaded";
    mockProductsStore.products = MOCK_PRODUCTS;
    renderWithProvider();
    expect(screen.getByText("Dessert A")).toBeInTheDocument();
    expect(screen.getByText("Dessert B")).toBeInTheDocument();
  });

  it("should call increaseCartItemCount when increase button is clicked", () => {
    mockProductsStore.productsPreview = "loaded";
    mockProductsStore.products = MOCK_PRODUCTS;
    renderWithProvider();

    const increaseButton = screen.getAllByText("Add to Cart")[0];
    fireEvent.click(increaseButton);

    expect(mockIncreaseCartItemCount).toHaveBeenCalledTimes(1);
    expect(mockIncreaseCartItemCount).toHaveBeenCalledWith("prod1");
  });

  it("should call decreaseCartItemCount when decrease button is clicked", async () => {
    mockProductsStore.productsPreview = "loaded";
    mockProductsStore.products = MOCK_PRODUCTS;
    mockCartStore.cartItems = {
        prod2: 2,
    }
    renderWithProvider();

    const decreaseButton = screen.getByText("-");
    await fireEvent.click(decreaseButton);

    expect(mockDecreaseCartItemCount).toHaveBeenCalledTimes(1);
    expect(mockDecreaseCartItemCount).toHaveBeenCalledWith("prod2");
  });
});
