import { type ShoppingCart, type PricingRules, type Checkout } from './types';

const createCheckout = (pricingRules: PricingRules): Checkout => {
  const shoppingCart: ShoppingCart = new Map<string, number>();

  // Scan item into shopping cart
  const scan = (itemCode: string): void => {
    if (!pricingRules.has(itemCode)) {
      // No pricing rules
      console.warn(`No pricing rules found for item: ${itemCode}`);
      return;
    }

    // Increase quantity
    const currentCount = shoppingCart.get(itemCode) || 0; // set to 0 initially for the first scan
    shoppingCart.set(itemCode, currentCount + 1);
  };

  // Calculate the total amount
  const total = (): string => {
    let totalPrice = 0;
    for (const [itemCode, quantity] of shoppingCart.entries()) {
      totalPrice += pricingRules
        .get(itemCode)!
        .calculatePrice(quantity, shoppingCart);
    }
    return totalPrice.toFixed(2); // Ensure 2 decimal places
  };

  return { scan, total };
};

export { createCheckout };
