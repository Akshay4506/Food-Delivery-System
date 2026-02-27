# Online Food Delivery System (MERN)

A production-ready, modular MERN stack application for an Online Food Delivery System.

## Features

- **Authentication**: User Signup/Login with JWT.
- **Restaurants**: Browse restaurants by cuisine and rating.
- **Menu**: View menu items for each restaurant.
- **Cart**: Add items to cart and manage quantity.
- **Orders**: Place orders and view order history.
- **Reviews**: Leave reviews for restaurants.

## Tech Stack

- **Frontend**: React (Vite), CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on port 27017

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed the database (optional but recommended for first run):
   ```bash
   node seed.js
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`.

## Usage

1. Open `http://localhost:5173`.
2. Sign up for a new account or browse as guest (some features require login).
3. Select a restaurant to view its menu.
4. Add items to your cart.
5. Go to Cart and place your order.
6. Check your Order History in the "My Orders" page.
