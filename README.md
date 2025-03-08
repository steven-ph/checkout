# Checkout system for a computer store

We will start with the following products in our catalogue

| SKU |    Name     |    Price |
| --- | :---------: | -------: |
| ipd | Super iPad  |  $549.99 |
| mbp | MacBook Pro | $1399.99 |
| atv |  Apple TV   |  $109.50 |
| vga | VGA adapter |   $30.00 |

As we're launching our new computer store, we would like to have a few opening day specials.

- we're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only
- the brand new Super iPad will have a bulk discounted applied, where the price will drop to $499.99 each, if someone buys more than 4
- we will bundle in a free VGA adapter free of charge with every MacBook Pro sold

As our Sales manager is quite indecisive, we want the pricing rules to be as flexible as possible as they can change in the future with little notice.

Our checkout system can scan items in any order.

## Getting Started

### Prerequisites

The following should be installed:

- [Git](https://git-scm.com/downloads)
- [Node](https://nodejs.org/en/download)

Clone this repo:

```sh
git clone https://github.com/steven-ph/checkout.git
cd checkout
```

### Dependencies:

Run the following command to download project dependencies

```sh
npm install
```

### Available commands

`npm run sample`

Use this command to run the program with sample data inside `mocks.ts` and `sample.ts`


`npm run test`

Use this command to run the tests.

## Pricing rules

Pricing rules should be a `Map` with the following key-value type:

```javascript
  Map<
    string, // Item's SKU
    {
      price: number, // Item's price
      calculatePrice: (quantityScanned: number, shoppingCart?: ShoppingCart) => number // pricing rule function to calculate special price
    }
  >

```

Refer to `mocks.ts` for examples.

## Example scenarios

```sh
npm run sample
```

The comman above will run and output the total for the sample pricing rules inside `sample.js`

| SKUs Scanned                        | Total expected |
| ----------------------------------- | :------------: |
| `atv, atv, atv, vga`                |   `$249.00`    |
| `atv, ipd, ipd, atv, ipd, ipd, ipd` |   `$2718.95`   |
| `mbp, vga, ipd`                     |   `$1949.98`   |