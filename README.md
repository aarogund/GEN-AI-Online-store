# Mini Marketplace

A small online store built by a team of 3–4. Visitors can browse products loaded from an API, add products to a cart, complete a validated checkout form, and view an order summary.

## Tech Stack

- HTML, CSS, and vanilla JavaScript
- No frameworks or libraries
- Product data from [DummyJSON](https://dummyjson.com/) (no API key required)

## Getting Started

When the project files are in place, serve the project folder locally so browser requests to the product API work:

1. Open a terminal in the project folder.
2. Start a local server with Python:

   ```sh
   python -m http.server 8000
   ```

3. Visit [http://localhost:8000](http://localhost:8000) in your browser.

Alternatively, open the folder in VS Code and use a local development server extension. Keep a local `products.json` copy as a fallback if the API is unavailable during the demo.

## Product API

- All products: `https://dummyjson.com/products?limit=20`
- Products by category: `https://dummyjson.com/products/category/smartphones`
- Category list: `https://dummyjson.com/products/category-list`
- Backup API: [Fake Store API](https://fakestoreapi.com/)

## Shared Data Shapes

All team members agreed on these data shapes:

**Product**

```js
{ id: 1, title: "Phone", price: 499, category: "smartphones", thumbnail: "url", stock: 20 }
```

**Cart item**

```js
{ id: 1, title: "Phone", price: 499, quantity: 2 }
```

**Order**

```js
{ orderId: "ORD-1001", customer: { name, email, phone, address }, items: [...], total: 998, date: "..." }
```

## Team Roles

Each member owns one feature and its JavaScript file. Make individual commits so each team member's contributions are visible.

| Role | Team member | Owns | File(s) |
|---|---|---|---|
| Member 1: Products | Jegede Pamilerin | Product listing | `products.js` |
| Member 2: Cart | Oluwaseyi | Shopping cart | `cart.js` |
| Member 3: Checkout | Arogundade Muideen | Checkout form | `checkout.js` |
| Member 4: Integration and Summary | Gbenga Adewale and Asifa Wale | Order summary and app integration | `main.js`, `summary.js` |


## Requirements

### Products

- Fetch products from the API, check `response.ok`, and show loading and friendly error messages.
- Create product cards dynamically with an image, title, price, and **Add to Cart** button.
- Filter products by title as the user types in a search box.
- Filter products with a category dropdown.
- Use `filter` and `map` to build the displayed list.

### Cart

- Implement a `Cart` class with `addItem()`, `removeItem()`, `updateQuantity()`, `getTotal()`, and `getItemCount()` methods.
- Increase the quantity when an already-added product is added again.
- Use `reduce` to calculate the total.
- Show cart items, quantities, line totals, and a **Remove** button for each item.
- Display the item count in a page-header badge.
- Show **Your cart is empty** when the cart has no items.

### Checkout

- Provide fields for name, email, phone, and delivery address.
- Validate all fields: none can be empty, email must have a valid format, and phone must contain only numbers and have a sensible length.
- Show a clear error beneath each invalid field.
- Prevent checkout when the cart is empty.
- On success, create an order object and pass it to the order summary.

### Order Summary and Integration

- Show the order ID, customer details, items, and total.
- Provide a **Continue Shopping** button that clears the cart and returns to the product list.
- Save the cart in `localStorage` so it survives a page refresh.
- Save the latest order in `localStorage`.
- Implement page layout and navigation between Products, Cart, Checkout, and Summary.
- Integrate all features and confirm they work together without errors.

### Everyone

- Build a responsive layout for phone and desktop widths.
- Remove leftover `console.log` statements and unused code.

## Collaboration

- Create one shared GitHub repository for the team.
- Have each member work on a separate branch (for example, `feature/cart`) and merge changes through pull requests.
- Make small, frequent commits with clear messages.
- Only Member 4 should edit `main.js` and `index.html` directly; ask them to make changes needed by other features.
- Meet briefly at the end of each work session to share progress.

## Milestones

| When | Goal | Checkpoint |
|---|---|---|
| Day 1 | Create the repository, agree on data shapes, set up the file structure, assign roles, and start feature work. | Data shapes are documented in this README. |
| Days 2–3 | Build individual features independently, using sample data if needed. | Each member demonstrates their feature working on its own. |
| Day 4 | Integrate all parts and fix bugs. | Add to cart, check out, and view the summary end to end. |
| Day 5 | Style, clean up, finish the README, and prepare the demo. | The app is ready to present. |

## Optional Stretch Goals

- Add a `DiscountedProduct` class that extends `Product`.
- Add a discount code field to the cart.
- Use a private `#items` array inside `Cart`.
- Add a static `Cart.formatPrice()` method for consistent currency formatting.
- Sort products by price or rating.
- Build an order history page using saved orders.

## Course Module Checklist

| Requirement | Module |
|---|---|
| Fetching with loading and error handling | 14, 15 |
| Product and cart data as arrays of objects | 8, 9 |
| `Cart` class | 13 |
| `map`, `filter`, and `reduce` | 12 |
| Dynamic rendering and event listeners | 10, 11 |
| Form validation with conditionals | 5 |
| JSON and `localStorage` | 15 |
| Reusable functions | 7 |

## Submission

- GitHub repository link
- Completed README with project title, team members and roles, instructions for running the app, and agreed data shapes
- Application screenshots saved in the repository
- Demo video link
- A 5–7 minute live demo where each member presents and explains their part

**Deadline:** 8pm, Wednesday 18 November 2026  
**Submission platform:** Slack channel
