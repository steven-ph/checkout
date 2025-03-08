import { makeMockRules } from './mocks';
import { createCheckout } from './checkout';

const pricingRules = makeMockRules();

// Example usage
const checkout1 = createCheckout(pricingRules);
checkout1.scan('atv');
checkout1.scan('atv');
checkout1.scan('atv');
checkout1.scan('vga');

console.log('Total Price:', checkout1.total());

const checkout2 = createCheckout(pricingRules);
checkout2.scan('atv');
checkout2.scan('ipd');
checkout2.scan('ipd');
checkout2.scan('atv');
checkout2.scan('ipd');
checkout2.scan('ipd');

console.log('Total Price:', checkout2.total());

const checkout3 = createCheckout(pricingRules);
checkout3.scan('mbp');
checkout3.scan('vga');
checkout3.scan('ipd');

console.log('Total Price:', checkout3.total());
