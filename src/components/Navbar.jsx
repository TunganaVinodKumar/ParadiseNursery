import { useCart } from '../CartContext';

export default function Navbar({ currentPage, onNavigate }) {
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <a
        href="#/"
        className="navbar__brand"
        onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
      >
        <span className="navbar__brand-icon">🌿</span>
        Paradise Nursery
      </a>

      <nav className="navbar__links">
        <a
          href="#/"
          className={`navbar__link${currentPage === 'home' ? ' navbar__link--active' : ''}`}
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
        >
          Home
        </a>
        <a
          href="#/products"
          className={`navbar__link${currentPage === 'products' ? ' navbar__link--active' : ''}`}
          onClick={(e) => { e.preventDefault(); onNavigate('products'); }}
        >
          Products
        </a>
        <a
          href="#/cart"
          className={`navbar__cart-link${currentPage === 'cart' ? ' navbar__link--active' : ''}`}
          onClick={(e) => { e.preventDefault(); onNavigate('cart'); }}
        >
          <span>Cart</span>
          <span
            className={`navbar__badge${totalItems > 0 ? ' navbar__badge--bounce' : ''}`}
            key={totalItems}
          >
            {totalItems}
          </span>
        </a>
      </nav>
    </header>
  );
}
