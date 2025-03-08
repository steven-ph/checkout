import { type ShoppingCart } from '../types';
import {
  withBulkDiscount,
  withMultiBuy,
  withFreeItem,
  withSinglePrice,
} from '../rules';

describe('withBulkDiscount', () => {
  it('should apply bulk discount when quantity meets the minimum', () => {
    const bulkDiscount = withBulkDiscount(10, 8, 5);

    expect(bulkDiscount(6)).toEqual(6 * 8); // 6 * discountPrice
    expect(bulkDiscount(5)).toEqual(5 * 8); // 5 * discountPrice
  });

  it('should apply base price when quantity is less than the minimum', () => {
    const bulkDiscount = withBulkDiscount(10, 8, 5);

    expect(bulkDiscount(4)).toEqual(4 * 10); // 4 * basePrice
  });

  it('should handle zero quantity', () => {
    const bulkDiscount = withBulkDiscount(10, 8, 5);

    expect(bulkDiscount(0)).toEqual(0);
  });
});

describe('withMultiBuy', () => {
  it('should apply multi-buy discount correctly', () => {
    const multiBuy = withMultiBuy(10, 3, 2); // Buy 3, pay for 2

    expect(multiBuy(3)).toEqual(2 * 10); // 1 deal
    expect(multiBuy(4)).toEqual(2 * 10 + 10); // 1 deal + 1 single item
    expect(multiBuy(6)).toEqual(4 * 10); // 2 deals
    expect(multiBuy(7)).toEqual(4 * 10 + 10); // 2 deals + 1 single item
    expect(multiBuy(0)).toEqual(0);
  });

  it('should handle cases where dealQty is 1', () => {
    const multiBuy = withMultiBuy(10, 1, 0); // Buy 1, pay 0

    expect(multiBuy(5)).toEqual(0);
  });

  it('should handle cases where payQty is 0', () => {
    const multiBuy = withMultiBuy(10, 3, 0);

    expect(multiBuy(5)).toEqual(0 + 2 * 10);
    expect(multiBuy(3)).toEqual(0);
    expect(multiBuy(4)).toEqual(10);
  });
});

describe('withFreeItem', () => {
  it('should charge for items after subtracting free items', () => {
    const freeItem = withFreeItem('B', 10);
    const shoppingCart: ShoppingCart = new Map([['B', 2]]);

    expect(freeItem(4, shoppingCart)).toEqual(2 * 10); // 4 - 2 free = 2 chargeable
    expect(freeItem(1, shoppingCart)).toBe(0); //1 - 2 free = 0 chargeable
  });

  it('should handle cases where free item count is zero', () => {
    const freeItem = withFreeItem('B', 10);
    const shoppingCart: ShoppingCart = new Map();

    expect(freeItem(3, shoppingCart)).toBe(3 * 10);
  });

  it('should handle cases where scanned quantity is less than free item count', () => {
    const freeItem = withFreeItem('B', 10);
    const shoppingCart: ShoppingCart = new Map([['B', 5]]);

    expect(freeItem(3, shoppingCart)).toBe(0);
  });

  it('should handle cases where scanned quantity is zero', () => {
    const freeItem = withFreeItem('B', 10);
    const shoppingCart: ShoppingCart = new Map([['B', 5]]);

    expect(freeItem(0, shoppingCart)).toBe(0);
  });

  it('should handle cases where free item count is greater than scanned quantity', () => {
    const freeItem = withFreeItem('B', 10);
    const shoppingCart: ShoppingCart = new Map([['B', 10]]);

    expect(freeItem(5, shoppingCart)).toBe(0);
  });
});

describe('withSinglePrice', () => {
  it('should calculate total amount correctly', () => {
    const singlePrice = withSinglePrice(10);

    expect(singlePrice(5)).toBe(50);
  });
});
