import { useCart } from '../CartContext';

function currency(n) {
  return '₹ ' + n.toFixed(2);
}

export default function ProductCard({ product, onQuickView }) {
  const { cart, dispatch, toggleWishlist, isInWishlist, showToast } = useCart();
  const currentQty = cart[product.id] || 0;
  const inWishlist = isInWishlist(product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', id: product.id });
    showToast(`Added ${product.name} to cart! 🌿`);
  };

  const handleRemoveOne = (e) => {
    e.stopPropagation();
    dispatch({ type: 'REMOVE_ONE', id: product.id });
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article className="product-card" onClick={() => onQuickView?.(product)}>
      <div className="product-card__img-wrapper">
        <img
          className="product-card__img"
          src={product.img}
          alt={product.name}
          loading="lazy"
        />

        {/* Badges */}
        <div className="product-card__badge-row">
          <span className="product-card__category">{product.category}</span>
          {product.petSafe && (
            <span className="badge badge--pet-sm" title="Non-toxic for cats & dogs">
              🐾 Pet Safe
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          className={`product-card__wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={handleToggleWishlist}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
          title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          {inWishlist ? '❤️' : '🤍'}
        </button>

        {/* Quick View Button on Hover */}
        <button
          className="product-card__quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView?.(product);
          }}
          aria-label={`Quick view ${product.name}`}
        >
          🔍 Quick View
        </button>
      </div>

      <div className="product-card__body">
        <div className="product-card__header">
          <div className="product-card__name">{product.name}</div>
          <div className="product-card__rating">
            <span className="star">★</span> {product.rating}
            <span className="count">({product.reviewsCount})</span>
          </div>
        </div>

        <div className="product-card__botanical">{product.scientificName}</div>
        <div className="product-card__desc">{product.desc}</div>

        <div className="product-card__specs">
          <span className="spec-pill">☀️ {product.light}</span>
          <span className="spec-pill">💧 {product.water}</span>
          <span className="spec-pill">🌱 {product.careLevel}</span>
        </div>

        <div className="product-card__footer">
          <div className="product-card__pricing">
            <span className="product-card__price">{currency(product.price)}</span>
            {product.originalPrice && (
              <span className="product-card__orig-price">{currency(product.originalPrice)}</span>
            )}
          </div>

          {currentQty > 0 ? (
            <div className="product-card__qty-stepper" onClick={(e) => e.stopPropagation()}>
              <button
                className="qty-btn"
                onClick={handleRemoveOne}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="qty-val">{currentQty} in Cart</span>
              <button
                className="qty-btn"
                onClick={handleAdd}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="btn btn--primary btn--sm"
              onClick={handleAdd}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
