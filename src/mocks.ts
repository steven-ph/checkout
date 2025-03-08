import { type PricingRules } from './types';
import {
  withBulkDiscount,
  withMultiBuy,
  withFreeItem,
  withSinglePrice,
} from './rules';

export const makeMockRules = (): PricingRules => {
  const pricingRules: PricingRules = new Map();

  pricingRules.set('ipd', {
    price: 549.99,
    calculatePrice: withBulkDiscount(549.99, 499.99, 5),
  });

  pricingRules.set('mbp', {
    price: 1399.99,
    calculatePrice: withSinglePrice(1399.99),
  });

  pricingRules.set('atv', {
    price: 109.5,
    calculatePrice: withMultiBuy(109.5, 3, 2),
  });

  pricingRules.set('vga', {
    price: 30.0,
    calculatePrice: withFreeItem('mbp', 30.0),
  });

  return pricingRules;
};
