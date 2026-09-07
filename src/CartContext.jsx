import { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';
import { getById } from './data/products';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE, VALID_COUPONS } from './data/constants';

const CartContext = createContext(null);
const CART_KEY = 'paradise_cart_v2';
const WISHLIST_KEY = 'paradise_wishlist_v1';
const THEME_KEY = 'paradise_theme_v1';

function loadInitialCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
}

function loadInitialWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

function loadInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const id = action.id;
      const count = action.count || 1;
      return { ...state, [id]: (state[id] || 0) + count };
    }
    case 'REMOVE_ONE': {
      const id = action.id;
      if (!state[id]) return state;
      const qty = state[id] - 1;
      if (qty <= 0) {
        const next = { ...state };
        delete next[id];
        return next;
      }
      return { ...state, [id]: qty };
    }
    case 'SET_QTY': {
      const { id, qty } = action;
      if (qty <= 0) {
        const next = { ...state };
        delete next[id];
        return next;
      }
      return { ...state, [id]: qty };
    }
    case 'REMOVE_ALL': {
      const next = { ...state };
      delete next[action.id];
      return next;
    }
    case 'CLEAR_CART':
      return {};
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, null, loadInitialCart);
  const [wishlist, setWishlist] = useState(loadInitialWishlist);
  const [theme, setTheme] = useState(loadInitialTheme);
  const [couponCode, setCouponCode] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toast system
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    const item = getById(productId);
    const plantName = item ? item.name : 'Plant';
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast(`Removed ${plantName} from wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Added ${plantName} to wishlist ❤️`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Coupon application
  const applyCoupon = (code) => {
    const clean = code?.trim().toUpperCase();
    if (!clean) return { success: false, message: 'Please enter a coupon code.' };
    if (VALID_COUPONS[clean]) {
      setCouponCode(clean);
      showToast(`Promo code "${clean}" applied! 🎉`, 'success');
      return { success: true, message: `Applied: ${VALID_COUPONS[clean].label}` };
    }
    return { success: false, message: 'Invalid promo code. Try WELCOME10 or FREESHIP.' };
  };

  const removeCoupon = () => {
    setCouponCode(null);
    showToast('Promo code removed', 'info');
  };

  // Calculations
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const cartList = Object.entries(cart)
    .map(([id, qty]) => {
      const product = getById(id);
      return product ? { product, qty } : null;
    })
    .filter(Boolean);

  const subtotal = cartList.reduce((sum, { product, qty }) => sum + product.price * qty, 0);

  let discount = 0;
  let isFreeShippingCoupon = false;

  if (couponCode && VALID_COUPONS[couponCode]) {
    const coup = VALID_COUPONS[couponCode];
    if (coup.type === 'percent') {
      discount = (subtotal * coup.value) / 100;
    } else if (coup.type === 'flat') {
      discount = Math.min(coup.value, subtotal);
    } else if (coup.type === 'free_shipping') {
      isFreeShippingCoupon = true;
    }
  }

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD || isFreeShippingCoupon
      ? 0
      : STANDARD_SHIPPING_FEE;

  const finalTotal = Math.max(0, subtotal - discount + shipping);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartList,
        dispatch,
        totalItems,
        subtotal,
        discount,
        shipping,
        finalTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        theme,
        toggleTheme,
        couponCode,
        appliedCoupon: couponCode ? VALID_COUPONS[couponCode] : null,
        applyCoupon,
        removeCoupon,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
