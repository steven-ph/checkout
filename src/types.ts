export type ShoppingCart = Map<string, number>;

export type PricingRules = Map<
  string,
  {
    price: number;
    calculatePrice: (
      quantityScanned: number,
      shoppingCart?: ShoppingCart
    ) => number;
  }
>;

export interface Checkout {
  scan: (itemCode: string) => void;
  total: () => string;
}
