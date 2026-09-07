import { useState } from 'react';
import CartItem from '../components/CartItem';
import ProductCard from '../components/ProductCard';
import { useCart } from '../CartContext';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from '../data/constants';
import PRODUCTS from '../data/products';

function currency(n) {
  return '₹ ' + n.toFixed(2);
}

export default function CartPage({ onNavigate, onQuickView }) {
  const {
    cartList,
    totalItems,
    subtotal,
    discount,
    shipping,
    finalTotal,
    couponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    dispatch,
    showToast,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  // Checkout Modal State
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Shipping, 2: Payment, 3: Processing, 4: Confirmed
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    pincode: '',
    slot: 'Morning (9 AM - 1 PM)',
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Free shipping math
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  // Apply coupon handler
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setInputCoupon('');
    }
  };

  // Checkout process simulation
  const handleStartCheckout = () => {
    if (cartList.length === 0) return;
    setIsCheckingOut(true);
    setCheckoutStep(1);
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!shippingDetails.fullName || !shippingDetails.street || !shippingDetails.phone) {
      alert('Please fill in your name, contact phone, and delivery address.');
      return;
    }
    setCheckoutStep(2);
  };

  const handlePlaceOrder = () => {
    setCheckoutStep(3); // Processing animation

    setTimeout(() => {
      const order = {
        orderId: 'PN-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        items: [...cartList],
        subtotal,
        discount,
        shipping,
        finalTotal,
        shippingDetails: { ...shippingDetails },
        paymentMethod: paymentMethod.toUpperCase(),
      };

      setConfirmedOrder(order);
      setCheckoutStep(4);
      dispatch({ type: 'CLEAR_CART' });
      showToast('Order confirmed! Happy gardening! 🌱', 'success', 5000);
    }, 1600);
  };

  // Recommended items for empty cart
  const recommended = PRODUCTS.slice(0, 3);

  return (
    <div className="page">
      <div className="container">
        <section className="section">
          <div className="section__header" style={{ textAlign: 'left' }}>
            <h1 className="section__title">Your Plant Cart</h1>
            <p className="section__subtitle" style={{ margin: 0 }}>
              {totalItems > 0
                ? `You have ${totalItems} living botanical plant${totalItems !== 1 ? 's' : ''} in your cart.`
                : 'Your cart is waiting for some green companions.'}
            </p>
          </div>

          {cartList.length === 0 && !confirmedOrder ? (
            <div className="empty-cart-view">
              <div className="empty-cart">
                <div className="empty-cart__icon">🪴🛒</div>
                <h3 className="empty-cart__title">Your cart is currently empty</h3>
                <p className="empty-cart__text">
                  Bring home life, fragrance, and clean air. Discover our top-rated easy-care houseplants!
                </p>
                <button
                  className="btn btn--primary btn--lg"
                  onClick={() => onNavigate('products')}
                >
                  Explore Houseplants →
                </button>
              </div>

              {/* Recommended Plants */}
              <div className="recommended-section">
                <div className="recommended-title-row">
                  <span className="recommended-badge">Customer Favorites</span>
                  <h3>Popular Plants to Get You Started</h3>
                </div>
                <div className="product-grid">
                  {recommended.map((p) => (
                    <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Left: Cart Items List & Shipping Progress */}
              <div className="cart-main">
                {/* Free Shipping Progress */}
                <div className="free-shipping-card">
                  <div className="free-shipping-header">
                    <span className="free-shipping-icon">🚚</span>
                    <span className="free-shipping-text">
                      {shipping === 0 ? (
                        <strong>🎉 You have qualified for FREE Standard Delivery!</strong>
                      ) : (
                        <span>
                          Add <strong>{currency(amountNeededForFreeShipping)}</strong> more to unlock <strong>FREE Delivery</strong>!
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="shipping-progress-track">
                    <div
                      className="shipping-progress-fill"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="cart-list">
                  {cartList.map(({ product, qty }) => (
                    <CartItem key={product.id} product={product} qty={qty} />
                  ))}
                </div>

                <div className="cart-continue-row">
                  <button
                    className="btn btn--ghost"
                    onClick={() => onNavigate('products')}
                  >
                    ← Continue Adding Plants
                  </button>
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="cart-sidebar">
                <div className="order-summary">
                  <h3 className="order-summary__title">Order Summary</h3>

                  {/* Subtotal */}
                  <div className="order-summary__row">
                    <span>Items Subtotal ({totalItems})</span>
                    <span>{currency(subtotal)}</span>
                  </div>

                  {/* Discount */}
                  {discount > 0 && (
                    <div className="order-summary__row order-summary__row--discount">
                      <span>Promo Discount ({appliedCoupon?.label})</span>
                      <span>− {currency(discount)}</span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="order-summary__row">
                    <span>
                      Delivery Charges{' '}
                      {shipping === 0 && <span className="free-badge">FREE</span>}
                    </span>
                    <span>
                      {shipping === 0 ? '₹ 0.00' : currency(STANDARD_SHIPPING_FEE)}
                    </span>
                  </div>

                  <div className="order-summary__divider" />

                  {/* Total */}
                  <div className="order-summary__row order-summary__row--total">
                    <span>Grand Total</span>
                    <span>{currency(finalTotal)}</span>
                  </div>

                  {/* Promo Code Input */}
                  <div className="promo-section">
                    {couponCode ? (
                      <div className="applied-coupon-pill">
                        <span>🏷️ {couponCode} applied</span>
                        <button
                          className="coupon-remove-btn"
                          onClick={removeCoupon}
                          aria-label="Remove coupon"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <form className="promo-form" onSubmit={handleApplyCoupon}>
                        <div className="promo-input-group">
                          <input
                            type="text"
                            className="promo-input"
                            placeholder="Promo code (e.g. WELCOME10)"
                            value={inputCoupon}
                            onChange={(e) => setInputCoupon(e.target.value)}
                          />
                          <button type="submit" className="btn btn--outline-dark btn--sm">
                            Apply
                          </button>
                        </div>
                        {couponError && <p className="promo-error">{couponError}</p>}
                        <div className="promo-hints">
                          Try: <code>WELCOME10</code> or <code>FREESHIP</code>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Checkout Button */}
                  <div className="order-summary__actions">
                    <button
                      className="btn btn--primary btn--lg w-full"
                      onClick={handleStartCheckout}
                    >
                      Proceed to Checkout ({currency(finalTotal)})
                    </button>
                  </div>

                  {/* Guarantees */}
                  <div className="order-summary__perks">
                    <div className="perk-item">🌿 100% Live Arrival Guarantee</div>
                    <div className="perk-item">📦 Eco-friendly transit pots included</div>
                    <div className="perk-item">🔒 256-Bit Encrypted Secure Checkout</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Multi-Step Checkout Modal */}
      {isCheckingOut && (
        <div className="modal-backdrop">
          <div
            className="modal-card modal-card--md checkout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {checkoutStep !== 3 && checkoutStep !== 4 && (
              <button
                className="modal-close"
                onClick={() => setIsCheckingOut(false)}
                aria-label="Cancel checkout"
              >
                ×
              </button>
            )}

            {/* Step 1: Shipping Address */}
            {checkoutStep === 1 && (
              <div>
                <div className="checkout-step-header">
                  <span className="step-indicator">Step 1 of 2</span>
                  <h2>Delivery & Shipping Information</h2>
                  <p>Where should we deliver your live plants?</p>
                </div>

                <form onSubmit={handleProceedToPayment} className="checkout-form">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Anita Roy"
                      required
                      value={shippingDetails.fullName}
                      onChange={(e) =>
                        setShippingDetails({ ...shippingDetails, fullName: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label>Contact Phone *</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="+91 98765 43210"
                        required
                        value={shippingDetails.phone}
                        onChange={(e) =>
                          setShippingDetails({ ...shippingDetails, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label>Email for Tracking *</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="anita@example.com"
                        required
                        value={shippingDetails.email}
                        onChange={(e) =>
                          setShippingDetails({ ...shippingDetails, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Street Address & Flat / House No. *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Flat 402, Green Meadows, 14th Main"
                      required
                      value={shippingDetails.street}
                      onChange={(e) =>
                        setShippingDetails({ ...shippingDetails, street: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label>City *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Bengaluru"
                        required
                        value={shippingDetails.city}
                        onChange={(e) =>
                          setShippingDetails({ ...shippingDetails, city: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label>Pincode *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="560001"
                        required
                        value={shippingDetails.pincode}
                        onChange={(e) =>
                          setShippingDetails({ ...shippingDetails, pincode: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Preferred Delivery Window</label>
                    <select
                      className="form-select"
                      value={shippingDetails.slot}
                      onChange={(e) =>
                        setShippingDetails({ ...shippingDetails, slot: e.target.value })
                      }
                    >
                      <option>Morning (9 AM - 1 PM)</option>
                      <option>Afternoon (1 PM - 5 PM)</option>
                      <option>Evening (5 PM - 8 PM)</option>
                      <option>Weekend Priority Delivery</option>
                    </select>
                  </div>

                  <div className="checkout-modal-actions">
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={() => setIsCheckingOut(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn--primary btn--lg">
                      Continue to Payment →
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {checkoutStep === 2 && (
              <div>
                <div className="checkout-step-header">
                  <span className="step-indicator">Step 2 of 2</span>
                  <h2>Choose Payment Method</h2>
                  <p>Grand Total: <strong>{currency(finalTotal)}</strong></p>
                </div>

                <div className="payment-options">
                  <label
                    className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                    <div className="payment-option__info">
                      <span className="payment-option__name">⚡ Instant UPI (GPay / PhonePe / Paytm)</span>
                      <span className="payment-option__desc">Scan QR or enter UPI ID for zero transaction fees</span>
                    </div>
                  </label>

                  <label
                    className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <div className="payment-option__info">
                      <span className="payment-option__name">💳 Credit / Debit Card</span>
                      <span className="payment-option__desc">Visa, MasterCard, RuPay with 256-bit encryption</span>
                    </div>
                  </label>

                  <label
                    className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <div className="payment-option__info">
                      <span className="payment-option__name">💵 Cash / UPI on Delivery</span>
                      <span className="payment-option__desc">Pay when your fresh plants arrive at your door</span>
                    </div>
                  </label>
                </div>

                <div className="checkout-order-summary-mini">
                  <div className="mini-row">
                    <span>Delivering To:</span>
                    <strong>{shippingDetails.fullName}, {shippingDetails.city} ({shippingDetails.pincode})</strong>
                  </div>
                  <div className="mini-row">
                    <span>Delivery Slot:</span>
                    <span>{shippingDetails.slot}</span>
                  </div>
                  <div className="mini-row total">
                    <span>Amount Payable:</span>
                    <span>{currency(finalTotal)}</span>
                  </div>
                </div>

                <div className="checkout-modal-actions">
                  <button
                    className="btn btn--ghost"
                    onClick={() => setCheckoutStep(1)}
                  >
                    ← Back to Address
                  </button>
                  <button
                    className="btn btn--primary btn--lg"
                    onClick={handlePlaceOrder}
                  >
                    Confirm & Place Order ({currency(finalTotal)})
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Processing State */}
            {checkoutStep === 3 && (
              <div className="checkout-processing">
                <div className="spinner-plant">🌿</div>
                <h3>Securing Your Plants...</h3>
                <p>Nurturing your plants and generating order confirmation.</p>
              </div>
            )}

            {/* Step 4: Order Confirmed Receipt */}
            {checkoutStep === 4 && confirmedOrder && (
              <div className="checkout-receipt">
                <div className="receipt-banner">
                  <span className="receipt-icon">🎉</span>
                  <h2>Order Placed Successfully!</h2>
                  <p>Your fresh plants are being carefully prepped for departure.</p>
                </div>

                <div className="receipt-details">
                  <div className="receipt-row">
                    <span>Order ID:</span>
                    <strong>{confirmedOrder.orderId}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Order Date:</span>
                    <span>{confirmedOrder.date}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Payment Method:</span>
                    <span>{confirmedOrder.paymentMethod}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Deliver To:</span>
                    <span>{confirmedOrder.shippingDetails.fullName}, {confirmedOrder.shippingDetails.street}, {confirmedOrder.shippingDetails.city} - {confirmedOrder.shippingDetails.pincode}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Delivery Window:</span>
                    <span>{confirmedOrder.shippingDetails.slot}</span>
                  </div>

                  <div className="receipt-items-list">
                    <h4>Ordered Plants:</h4>
                    {confirmedOrder.items.map(({ product, qty }) => (
                      <div key={product.id} className="receipt-item">
                        <span>{product.name} × {qty}</span>
                        <span>{currency(product.price * qty)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="receipt-total-row">
                    <span>Total Paid:</span>
                    <strong>{currency(confirmedOrder.finalTotal)}</strong>
                  </div>
                </div>

                <div className="receipt-actions">
                  <button
                    className="btn btn--outline"
                    onClick={() => window.print()}
                  >
                    🖨️ Print / Save Receipt
                  </button>
                  <button
                    className="btn btn--primary btn--lg"
                    onClick={() => {
                      setIsCheckingOut(false);
                      setConfirmedOrder(null);
                      onNavigate('home');
                    }}
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
