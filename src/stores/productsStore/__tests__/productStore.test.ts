/* eslint-disable @typescript-eslint/no-explicit-any */

import { enableStaticRendering } from 'mobx-react-lite';
import ProductsStore from '..';
import { axiosInstance } from '../../../interceptors/http';

let axiosGetSpy: jest.SpyInstance;

enableStaticRendering(true);

describe('ProductsStore', () => {
  let productsStore: any;
  const mockProducts = [
    { id: "p1", name: "Laptop", price: 1200},
    { id: "p2", name: "Mouse", price: 25},
    { id: "p3", name: "Keyboard", price: 75},
  ];

  beforeEach(() => {
    axiosGetSpy = jest.spyOn(axiosInstance, 'get');
    axiosGetSpy.mockClear();

    productsStore = new ProductsStore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should initialize with no products and idle preview state', () => {
    expect(productsStore.products).toBeUndefined();
    expect(productsStore.productsPreview).toBe('idle');
  });

  describe('getProducts - success', () => {
    it('should set productsPreview to "loading" then "loaded" and populate products on success', async () => {
      axiosGetSpy.mockResolvedValueOnce({ data: mockProducts });

      const promise = productsStore.getProducts();

      expect(productsStore.productsPreview).toBe('loading');

      await promise;

      expect(productsStore.productsPreview).toBe('loaded');
      expect(productsStore.products).toEqual(mockProducts);
      expect(axiosGetSpy).toHaveBeenCalledTimes(1);
      expect(axiosGetSpy).toHaveBeenCalledWith('/products');
    });

    it('should correctly set globalLoading during the fetch process', async () => {
      axiosGetSpy.mockResolvedValueOnce({ data: mockProducts });

      const promise = productsStore.getProducts();
      expect(productsStore.productsPreview).toBe('loading');

      await promise;
      expect(productsStore.productsPreview).toBe('loaded');
    });
  });

  describe('getProducts - failure', () => {
    const errorMessage = 'Network Error';
    it('should set productsPreview to "loading" then "failed" and clear products on error', async () => {
      axiosGetSpy.mockRejectedValueOnce(new Error(errorMessage));

      let caughtError: any;
      try {
        await productsStore.getProducts();
      } catch (e) {
        caughtError = e;
      }

      expect(productsStore.productsPreview).toBe('failed');
      expect(productsStore.products).toBeUndefined();
      expect(axiosGetSpy).toHaveBeenCalledTimes(1);
      expect(axiosGetSpy).toHaveBeenCalledWith('/products');
      expect(caughtError).toBeInstanceOf(Error);
      expect(caughtError.message).toBe(errorMessage);
    });
  });

  describe('getProductById', () => {
    beforeEach(() => {
      productsStore.products = mockProducts;
      productsStore.productsPreview = 'loaded';
    });

    it('should return the correct product by ID', () => {
      const product = productsStore.getProductById("p2");
      expect(product).toEqual(mockProducts[1]);
    });

    it('should return undefined if product is not found', () => {
      const product = productsStore.getProductById("p99");
      expect(product).toBeUndefined();
    });

    it('should return undefined if products array is null or undefined', () => {
      productsStore.products = undefined;
      const product = productsStore.getProductById("p1");
      expect(product).toBeUndefined();

      productsStore.products = null;
      const product2 = productsStore.getProductById("p1");
      expect(product2).toBeUndefined();
    });
  });
});
