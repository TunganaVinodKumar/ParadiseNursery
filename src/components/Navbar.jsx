import { useCart } from '../CartContext';

export default function Navbar({
  currentPage,
  onNavigate,
  onOpenQuiz,
  onOpenCareGuide,
  onOpenWishlist,
}) {
  const { totalItems, wishlist, theme, toggleTheme } = useCart();
  const wishlistCount = wishlist.length;

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Brand */}
        <a
          href="#/"
          className="navbar__brand"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          <span className="navbar__brand-icon">🌿</span>
          <span className="navbar__brand-text">Paradise Nursery</span>
        </a>

        {/* Navigation Links */}
        <nav className="navbar__links">
          <a
            href="#/"
            className={`navbar__link${currentPage === 'home' ? ' navbar__link--active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
          >
            Home
          </a>
          <a
            href="#/products"
            className={`navbar__link${currentPage === 'products' ? ' navbar__link--active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('products');
            }}
          >
            Plants
          </a>

          {/* Interactive Feature Triggers */}
          <button
            className="navbar__text-btn"
            onClick={onOpenQuiz}
            title="Take our plant matcher quiz"
          >
            ✨ Plant Matcher
          </button>
          <button
            className="navbar__text-btn"
            onClick={onOpenCareGuide}
            title="Read our plant care guide"
          >
            📖 Care Guide
          </button>
        </nav>

        {/* Action Controls */}
        <div className="navbar__actions">
          {/* Theme Toggle */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Wishlist Button */}
          <button
            className="navbar__icon-btn"
            onClick={onOpenWishlist}
            aria-label="View Wishlist"
            title="View Wishlist"
          >
            <span>❤️</span>
            {wishlistCount > 0 && (
              <span className="navbar__badge navbar__badge--wishlist">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Link */}
          <a
            href="#/cart"
            className={`navbar__cart-link${currentPage === 'cart' ? ' navbar__link--active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('cart');
            }}
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-label">Cart</span>
            <span
              className={`navbar__badge${totalItems > 0 ? ' navbar__badge--bounce' : ''}`}
              key={totalItems}
            >
              {totalItems}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
