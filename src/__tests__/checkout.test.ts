import { makeMockRules } from '../mocks';
import { createCheckout } from '../checkout';

const mockPricingRules = makeMockRules();

describe('Checkout System', () => {
  test('No items scanned, total should be 0.00', () => {
    const checkout = createCheckout(mockPricingRules);
    expect(checkout.total()).toEqual('0.00');
  });

  test('Single Apple TV (atv) should cost 109.50', () => {
    const checkout = createCheckout(mockPricingRules);
    checkout.scan('atv');
    expect(checkout.total()).toEqual('109.50');
  });

  test('Three Apple TVs (atv) should apply 3-for-2 deal and cost 219.00', () => {
    const checkout = createCheckout(mockPricingRules);
    checkout.scan('atv');
    checkout.scan('atv');
    checkout.scan('atv');
    expect(checkout.total()).toEqual('219.00');
  });

  test('Five Super iPads (ipd) should apply bulk discount and cost 2499.95', () => {
    const checkout = createCheckout(mockPricingRules);
    for (let i = 0; i < 5; i++) checkout.scan('ipd');
    expect(checkout.total()).toEqual('2499.95');
  });

  test('MacBook Pro (mbp) should bundle a free VGA adapter', () => {
    const checkout = createCheckout(mockPricingRules);
    checkout.scan('mbp');
    checkout.scan('vga');
    expect(checkout.total()).toEqual('1399.99');
  });

  test('MacBook Pro (mbp) with two VGA adapters should charge for only one adapter', () => {
    const checkout = createCheckout(mockPricingRules);
    checkout.scan('mbp');
    checkout.scan('vga');
    checkout.scan('vga');
    expect(checkout.total()).toEqual('1429.99'); // 1399.99 + 30.00
  });
});
