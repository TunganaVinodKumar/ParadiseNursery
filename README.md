# 🌿 Paradise Nursery — Premium Houseplant E-Commerce Store

[![React 19](https://img.shields.io/badge/React-19-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-brightgreen.svg)]()

> A modern, responsive e-commerce web application for discovering, exploring, and purchasing curated indoor houseplants. Built with React 19, Vite, and custom CSS design system.

---

## 🌟 Live Demo & Repository

- **GitHub Repository**: [https://github.com/TunganaVinodKumar/ParadiseNursery](https://github.com/TunganaVinodKumar/ParadiseNursery)
- **Deployment Ready**: Optimized for 1-click zero-config deployment on **Vercel** or **Netlify**.

---

## 🪴 Key Features

### 1. 🌿 Curated Botanical Catalog (12 Plants)
- **4 Rich Categories**:
  - 🌸 **Aromatic Plants**: Lavender, Jasmine, Rosemary
  - 🩹 **Medicinal Plants**: Aloe Vera, Holy Basil (Tulsi), Mint, Chamomile
  - 🍃 **Air Purifying Plants**: Snake Plant, Peace Lily, Spider Plant
  - 🪴 **Low Maintenance Plants**: ZZ Plant, Jade Plant
- Authentic high-resolution botanical photography for every plant.
- Detailed botanical info: scientific names, dimensions, pet safety ratings, and care tags.

### 2. 🔍 Real-Time Search, Filtering & Sorting
- **Instant Search**: Search dynamically by plant name, botanical name, or benefits (e.g., "oxygen", "sleep").
- **Category Filter Pills**: Filter across categories with instant count badges.
- **Pet-Friendly Filter**: One-click checkbox filter for pet-safe varieties.
- **Care Level Filter**: Filter by Easy Care, Moderate Care, etc.
- **Smart Sorting**: Sort by Featured, Price (Low to High / High to Low), Customer Rating, and Alphabetical (A-Z).

### 3. 🔍 Plant Quick-View Modal
- Detailed botanical inspection modal without navigating away from the catalog.
- Interactive Care Matrix:
  - ☀️ Sunlight requirement
  - 💧 Watering frequency
  - ⚡ Maintenance difficulty
  - 🌡️ Ideal temperature
- Direct quantity adjustments and 1-click cart addition.

### 4. ✨ Interactive Plant Matcher Quiz
- 3-step lifestyle questionnaire:
  1. Room sunlight availability (Direct Sun, Indirect, Low Light).
  2. Pet safety requirements (Cats/dogs at home).
  3. Watering habits (Low maintenance vs. regular care).
- Instant tailored recommendations with 1-click **Add to Cart**.

### 5. 📖 Plant Doctor & Care Guide
- Interactive educational modal accessible from the navigation bar and footer.
- Covers:
  - The Soil Finger Test for accurate watering.
  - Natural light positioning guide (North/South/East/West windows).
  - Repotting schedules and drainage essentials.
  - Safe indoor plant varieties for pets.

### 6. ❤️ Slide-Out Wishlist Drawer
- Heart icon on every plant card and quick-view modal.
- Slide-out drawer with real-time saved count badge.
- Instant 1-click "Move to Cart" functionality.

### 7. 🛒 Dynamic Cart & Free Shipping Meter
- **Live Quantity Controls**: Increment, decrement, or remove items with automatic recalculations.
- **Free Delivery Progress Bar**: Visual meter showing progress toward the ₹ 25.00 free shipping goal.
- **Interactive Promo Coupon Codes**:
  - `WELCOME10` — 10% discount on order total
  - `GREEN20` — ₹ 5.00 flat discount
  - `FREESHIP` — 100% free delivery on any order size

### 8. 💳 Multi-Step Checkout Simulation
- **Step 1: Shipping & Delivery**: Full address, phone, email, and preferred delivery time slots.
- **Step 2: Payment Selection**: Instant UPI, Credit/Debit Cards, or Cash on Delivery (COD).
- **Step 3: Secure Processing**: Animated simulated banking verification.
- **Step 4: Itemized Order Confirmation**: Printable order receipt with unique Order ID (`PN-XXXXXX`), timestamps, and order tracking info.

### 9. 🌓 Theme Toggle & Toast Feedback
- Smooth Dark / Light Mode transition with persistent `localStorage` preference.
- Non-intrusive floating toast notifications for user interactions (Add to Cart, Wishlist, Coupon Applied).

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 (Hooks, Context API) |
| **Build Tool & Bundler** | Vite 7 (Lightning-fast HMR) |
| **Styling** | Vanilla CSS (Custom Design System, CSS Variables, Glassmorphism, Dark Mode) |
| **Icons & Assets** | SVG & Optimized Botanical Photography |
| **Code Quality** | ESLint 9 |

---

## 📁 Project Structure

```
ParadiseNursery/
├── public/
│   └── assets/             # Botanical photography & SVG icons
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top header with theme toggle, wishlist & cart badges
│   │   ├── HeroSection.jsx     # Landing hero section with trust badges
│   │   ├── ProductCard.jsx     # Plant card with stepper & wishlist heart
│   │   ├── CartItem.jsx        # Cart item row with quantity controls
│   │   ├── PlantDetailModal.jsx# Quick-view modal with botanical care matrix
│   │   ├── PlantQuizModal.jsx  # Interactive 3-step plant matcher quiz
│   │   ├── CareGuideModal.jsx  # Plant doctor & care guide
│   │   ├── WishlistDrawer.jsx  # Slide-out wishlist drawer
│   │   ├── Toast.jsx           # Floating notification stack
│   │   └── Footer.jsx          # Quick links, guarantees & newsletter
│   ├── data/
│   │   ├── products.js         # 12 curated plants with botanical metadata
│   │   └── constants.js        # Promo coupons & shipping thresholds
│   ├── pages/
│   │   ├── LandingPage.jsx     # Home page with highlights & reviews
│   │   ├── ProductsPage.jsx    # Catalog page with search, filters & sort
│   │   └── CartPage.jsx        # Cart, promo codes & multi-step checkout
│   ├── CartContext.jsx         # Global state (cart, wishlist, theme, toasts)
│   ├── index.css               # Comprehensive responsive design system
│   ├── App.jsx                 # App root & hash routing
│   └── main.jsx                # React 19 entry point
├── index.html                  # HTML entry with Open Graph & SEO meta tags
├── vite.config.js              # Vite configuration
├── package.json                # Project scripts & dependencies
└── run.txt                     # Local run & installation guide
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or newer
- **npm**: `v9.0.0` or newer

### Installation & Local Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TunganaVinodKumar/ParadiseNursery.git
   cd ParadiseNursery
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173/
   ```

---

## 📦 Production Build & Linting

- **Build for production:**
  ```bash
  npm run build
  ```
  Generates an optimized bundle in the `dist/` directory.

- **Preview production build locally:**
  ```bash
  npm run preview
  ```

- **Run code linter:**
  ```bash
  npm run lint
  ```

---

## 🌐 1-Click Deployment Guide

### Deploy with Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Import **`TunganaVinodKumar/ParadiseNursery`**.
4. Settings are automatically detected:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**. Your live HTTPS website will be ready in under 60 seconds!

### Deploy with Netlify
1. Go to [netlify.com](https://www.netlify.com/) and sign in with GitHub.
2. Click **"Add new site"** → **"Import an existing project"**.
3. Select `ParadiseNursery` and click **"Deploy"**.

---

## 🏷️ Available Promo Codes for Testing

| Code | Discount | Note |
| :--- | :--- | :--- |
| `WELCOME10` | **10% Off** | Applies to entire cart total |
| `GREEN20` | **₹ 5.00 Flat Off** | Deducts ₹ 5.00 directly |
| `FREESHIP` | **Free Delivery** | Waives shipping fee regardless of subtotal |

---

## 📄 License

This project is licensed under the MIT License — feel free to use and customize it for your own personal or commercial projects!
