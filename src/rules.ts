import { type ShoppingCart } from './types';

// withBulkDiscount: Returns a function which applies bulk discount for order items that meet the minimum quantity
export const withBulkDiscount =
  (basePrice: number, discountPrice: number, minQuantity: number) =>
  (quantityScanned: number): number => {
    return quantityScanned >= minQuantity
      ? quantityScanned * discountPrice
      : quantityScanned * basePrice;
  };

// withMultiBuy: Returns a function which applies multi buy discount for order items that meet the deal quantity
export const withMultiBuy =
  (unitPrice: number, dealQty: number, payQty: number) =>
  (quantityScanned: number): number => {
    return (
      Math.floor(quantityScanned / dealQty) * (payQty * unitPrice) +
      (quantityScanned % dealQty) * unitPrice
    );
  };

// withFreeItem: Returns a function which bundles a free item with an order of a required item
export const withFreeItem =
  (freeItemCode: string, unitPrice: number) =>
  (quantityScanned: number, shoppingCart: ShoppingCart): number => {
    const freeItemsCount = shoppingCart.get(freeItemCode) || 0;
    const chargeableItemsCount = Math.max(0, quantityScanned - freeItemsCount);

    return chargeableItemsCount * unitPrice;
  };

// withSinglePrice: Returns a function which calculates the total ammount for an item
export const withSinglePrice =
  (unitPrice: number) =>
  (quantityScanned: number): number => {
    return quantityScanned * unitPrice;
  };
