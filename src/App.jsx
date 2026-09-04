import { useState, useEffect } from 'react';
import { CartProvider } from './CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';

function getPageFromHash() {
  const hash = location.hash || '#/';
  if (hash.startsWith('#/products')) return 'products';
  if (hash.startsWith('#/cart')) return 'cart';
  return 'home';
}

function App() {
  const [page, setPage] = useState(getPageFromHash);

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (p) => {
    const hashes = { home: '#/', products: '#/products', cart: '#/cart' };
    location.hash = hashes[p] || '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let content;
  switch (page) {
    case 'products':
      content = <ProductsPage />;
      break;
    case 'cart':
      content = <CartPage onNavigate={navigate} />;
      break;
    default:
      content = <LandingPage onNavigate={navigate} />;
  }

  return (
    <CartProvider>
      <Navbar currentPage={page} onNavigate={navigate} />
      {content}
      <Footer />
    </CartProvider>
  );
}

export default App;
