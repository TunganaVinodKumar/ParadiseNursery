import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'paradise_cart_v2';

// cart shape: { [productId]: quantity }
function loadInitial() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const id = action.id;
      return { ...state, [id]: (state[id] || 0) + 1 };
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
  const [cart, dispatch] = useReducer(cartReducer, null, loadInitial);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
