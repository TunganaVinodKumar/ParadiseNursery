import { useEffect } from 'react';
import { useCart } from '../CartContext';
import { getById } from '../data/products';

function currency(n) {
  return '₹ ' + n.toFixed(2);
}

export default function WishlistDrawer({ onClose, onSelectProduct }) {
  const { wishlist, toggleWishlist, dispatch, showToast } = useCart();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const items = wishlist.map((id) => getById(id)).filter(Boolean);

  const handleMoveToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', id: product.id });
    showToast(`Moved ${product.name} to your cart! 🌿`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-row">
            <span className="drawer-icon">❤️</span>
            <h2 className="drawer-title">Your Wishlist</h2>
            <span className="drawer-count">({items.length})</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close wishlist">
            ×
          </button>
        </div>

        <div className="drawer-content">
          {items.length === 0 ? (
            <div className="empty-drawer">
              <span className="empty-drawer__icon">🌱</span>
              <h3>Your wishlist is empty</h3>
              <p>Tap the heart icon on any plant card to save your favorites here.</p>
              <button className="btn btn--primary btn--sm" onClick={onClose}>
                Browse Plants
              </button>
            </div>
          ) : (
            <div className="wishlist-list">
              {items.map((plant) => (
                <div key={plant.id} className="wishlist-item">
                  <img
                    src={plant.img}
                    alt={plant.name}
                    className="wishlist-item__img"
                    onClick={() => {
                      onClose();
                      onSelectProduct(plant);
                    }}
                  />
                  <div className="wishlist-item__info">
                    <h4
                      className="wishlist-item__name"
                      onClick={() => {
                        onClose();
                        onSelectProduct(plant);
                      }}
                    >
                      {plant.name}
                    </h4>
                    <div className="wishlist-item__price">{currency(plant.price)}</div>
                    <div className="wishlist-item__category">{plant.category}</div>
                  </div>
                  <div className="wishlist-item__actions">
                    <button
                      className="btn btn--primary btn--sm"
                      onClick={() => handleMoveToCart(plant)}
                    >
                      + Add to Cart
                    </button>
                    <button
                      className="wishlist-remove-btn"
                      onClick={() => toggleWishlist(plant.id)}
                      title="Remove from wishlist"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
