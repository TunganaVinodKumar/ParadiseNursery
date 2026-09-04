import { useState } from 'react';
import CartItem from '../components/CartItem';
import { useCart } from '../CartContext';
import { getById } from '../data/products';

function currency(n) {
  return '₹ ' + n.toFixed(2);
}

export default function CartPage({ onNavigate }) {
  const { cart, dispatch, totalItems } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const items = Object.entries(cart)
    .map(([id, qty]) => {
      const product = getById(id);
      return product ? { product, qty } : null;
    })
    .filter(Boolean);

  const total = items.reduce((sum, { product, qty }) => sum + product.price * qty, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowSuccess(true);
    dispatch({ type: 'CLEAR_CART' });
  };

  if (showSuccess) {
    return (
      <div className="page">
        <div className="toast-overlay" onClick={() => { setShowSuccess(false); onNavigate('home'); }}>
          <div className="toast-card" onClick={(e) => e.stopPropagation()}>
            <div className="toast-card__icon">🎉</div>
            <h2 className="toast-card__title">Order Placed!</h2>
            <p className="toast-card__text">
              Thank you for shopping at Paradise Nursery! Your plants are on their way to brighten your home.
            </p>
            <button
              className="btn btn--primary btn--lg"
              onClick={() => { setShowSuccess(false); onNavigate('home'); }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <section className="section">
          <div className="section__header" style={{ textAlign: 'left' }}>
            <h2 className="section__title">Your Cart</h2>
            <p className="section__subtitle" style={{ margin: 0 }}>
              {totalItems > 0
                ? `You have ${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart.`
                : 'Your cart is waiting for some green friends.'
              }
            </p>
          </div>

          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart__icon">🛒</div>
              <h3 className="empty-cart__title">Your cart is empty</h3>
              <p className="empty-cart__text">
                Explore our collection and add your favorite plants!
              </p>
              <button
                className="btn btn--primary btn--lg"
                onClick={() => onNavigate('products')}
              >
                Browse Plants →
              </button>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-list">
                {items.map(({ product, qty }) => (
                  <CartItem key={product.id} product={product} qty={qty} />
                ))}
              </div>

              <div className="order-summary">
                <h3 className="order-summary__title">Order Summary</h3>

                {items.map(({ product, qty }) => (
                  <div className="order-summary__row" key={product.id}>
                    <span>{product.name} × {qty}</span>
                    <span>{currency(product.price * qty)}</span>
                  </div>
                ))}

                <div className="order-summary__row order-summary__row--total">
                  <span>Total</span>
                  <span>{currency(total)}</span>
                </div>

                <div className="order-summary__actions">
                  <button
                    className="btn btn--primary btn--lg"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                  <button
                    className="btn btn--ghost"
                    onClick={() => onNavigate('products')}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
