# OOLIO DAILY CRAVINGS App
This is a modern web application built with `React` and `Vite`, designed to showcase a simple e-commerce flow for ordering food/desserts. It integrates with a separate Express.js backend to manage product listings and order processing.

## Features
### Product Listing:
View a list of available products (e.g., desserts, food items).

### Add to Cart: 
Add products to your shopping cart.

### Quantity Management: 
Increase or decrease the quantity of items in the cart.

### Remove from Cart: 
Remove items from the cart entirely.

### Coupon Application: 
  Apply discount codes (e.g., `HAPPYHOURS`, `BUYGETONE`) for special offers.

### Order Placement: 
  Confirm your order, which then communicates with the backend.

### Responsive Design: 
Adapts to different screen sizes.

### Global Loading Indicator: 
  Provides visual feedback during API calls.

### MobX State Management: 
  Efficiently manages application state.

# Technologies Used
## Frontend
### React:
A JavaScript library for building user interfaces.

### TypeScript: 
  A superset of JavaScript that adds static typing.

### MobX: 
  A battle-tested library for reactive state management.

### mobx-react / mobx-react-lite:
  Bindings for MobX with React.

### styled-components:
  For writing CSS in JavaScript.

### Axios: 
  Promise-based HTTP client for the browser and Node.js.

### React Testing Library: 
  For writing maintainable and robust UI tests.

### Jest: 
  A JavaScript Testing Framework.

## Backend (Express.js API)
### Node.js: 
  JavaScript runtime.

### Express.js: 
  Fast, unopinionated, minimalist web framework for Node.js.

### TypeScript:
  For type-safe backend development.

### CORS:
  Middleware for enabling Cross-Origin Resource Sharing.

### Axios:
  Used by the backend to call external APIs (e.g., for product data).

## Getting Started
Follow these steps to get the application running on your local machine.

1. Backend Setup
You need to have the Express.js backend running first, as the frontend will communicate with it.

#### Navigate to your backend project directory:

```
git clone https://github.com/maharjunm/oolio-daily-cravings-api
cd oolio-daily-cravings-api
```
#### Install backend dependencies:

```
npm install
``` 

#### Run the backend server:

```
npm run dev 
```

The backend server should now be running on http://localhost:3000. You can confirm this by opening your browser and navigating to http://localhost:3000/.

2. Frontend Setup

#### Navigate to your frontend project directory:

```
cd oolio-daily-cravings
```

####  Install frontend dependencies:

```
npm install
```

#### Run the frontend development server:

```
npm run dev
```

The frontend application should now be running on http://localhost:5173.

3. Running Tests (Optional)
To run the unit tests (configured with Jest and React Testing Library):

```
npm test
```

## How to Use the Application
Ensure both the backend (on http://localhost:3000) and the frontend (on http://localhost:5173) are running.

Open your browser and navigate to http://localhost:5173.

1. You should see a list of Desserts (or Products, depending on your API integration).

2. Add Products: Click on an "Add to Cart" button (if available on product cards) to add items to your cart.
3. Manage Quantity: In the cart summary, you should be able to increase or decrease the quantity of each item.

4. Apply Coupons: Look for the "Have a coupon code?" section. 
   5. Enter `HAPPYHOURS `for an 18% discount. 
   6. Enter `BUYGETONE` (and ensure you have at least 2 items in your cart) to get the lowest-priced item free.

5. Confirm Order: Once you're satisfied with your cart, click the "Confirm Order" button. This will send your order details to the backend.

6. Observe Loader: A subtle loading bar at the top of the page should appear during API calls (e.g., when products are loading, or when an order is being placed), providing visual feedback.

Enjoy testing the Oolio Daily Cravings app!