import { useState, useEffect } from 'react';
import { useCart } from '../CartContext';

function currency(n) {
  return '₹ ' + n.toFixed(2);
}

export default function PlantDetailModal({ product, onClose }) {
  const { cart, dispatch, toggleWishlist, isInWishlist, showToast } = useCart();
  const [qty, setQty] = useState(1);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const currentCartQty = cart[product.id] || 0;

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', id: product.id, count: qty });
    showToast(`Added ${qty} × ${product.name} to cart! 🌿`);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-card--lg" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>

        <div className="plant-detail-layout">
          {/* Plant Media */}
          <div className="plant-detail-media">
            <img src={product.img} alt={product.name} className="plant-detail-img" />
            <div className="plant-detail-tags">
              <span className="badge badge--primary">{product.category}</span>
              {product.petSafe ? (
                <span className="badge badge--pet">🐾 Pet Friendly</span>
              ) : (
                <span className="badge badge--muted">Not Pet Safe</span>
              )}
              <span className="badge badge--level">{product.careLevel} Care</span>
            </div>
          </div>

          {/* Plant Info */}
          <div className="plant-detail-body">
            <div className="plant-detail-header">
              <div>
                <h2 className="plant-detail-title">{product.name}</h2>
                <div className="plant-detail-botanical">{product.scientificName}</div>
              </div>
              <button
                className={`wishlist-btn-round ${inWishlist ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle Wishlist"
              >
                {inWishlist ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Rating */}
            <div className="plant-rating-row">
              <span className="plant-stars">★★★★★</span>
              <span className="plant-rating-val">{product.rating}</span>
              <span className="plant-reviews-count">({product.reviewsCount} customer reviews)</span>
              <span className="plant-stock-tag">✓ In Stock ({product.inStock} left)</span>
            </div>

            {/* Pricing */}
            <div className="plant-price-row">
              <span className="plant-current-price">{currency(product.price)}</span>
              {product.originalPrice && (
                <span className="plant-orig-price">{currency(product.originalPrice)}</span>
              )}
              <span className="plant-dimensions-tag">📏 {product.dimensions}</span>
            </div>

            <p className="plant-detail-desc">{product.desc}</p>

            {/* Care Matrix Cards */}
            <div className="care-matrix">
              <div className="care-item">
                <span className="care-item__icon">☀️</span>
                <span className="care-item__label">Light</span>
                <span className="care-item__val">{product.light}</span>
              </div>
              <div className="care-item">
                <span className="care-item__icon">💧</span>
                <span className="care-item__label">Water</span>
                <span className="care-item__val">{product.water}</span>
              </div>
              <div className="care-item">
                <span className="care-item__icon">🌱</span>
                <span className="care-item__label">Difficulty</span>
                <span className="care-item__val">{product.careLevel}</span>
              </div>
              <div className="care-item">
                <span className="care-item__icon">🌡️</span>
                <span className="care-item__label">Temp</span>
                <span className="care-item__val">{product.careInstructions?.temperature?.split('(')[0] || '18°C – 28°C'}</span>
              </div>
            </div>

            {/* Benefits */}
            {product.benefits && (
              <div className="plant-benefits">
                <div className="plant-benefits__title">Key Benefits:</div>
                <ul className="plant-benefits__list">
                  {product.benefits.map((b) => (
                    <li key={b}>✓ {b}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="plant-actions-row">
              <div className="qty-picker">
                <button
                  className="qty-picker__btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-picker__val">{qty}</span>
                <button
                  className="qty-picker__btn"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button className="btn btn--primary btn--lg flex-1" onClick={handleAddToCart}>
                Add to Cart ({currency(product.price * qty)})
              </button>
            </div>

            {currentCartQty > 0 && (
              <div className="plant-in-cart-note">
                🌿 You currently have <strong>{currentCartQty}</strong> of this plant in your cart.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
