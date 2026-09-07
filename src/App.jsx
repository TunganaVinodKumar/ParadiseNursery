import { useState, useEffect } from 'react';
import { CartProvider, useCart } from './CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import PlantDetailModal from './components/PlantDetailModal';
import PlantQuizModal from './components/PlantQuizModal';
import CareGuideModal from './components/CareGuideModal';
import WishlistDrawer from './components/WishlistDrawer';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';

function getPageFromHash() {
  const hash = location.hash || '#/';
  if (hash.startsWith('#/products')) return 'products';
  if (hash.startsWith('#/cart')) return 'cart';
  return 'home';
}

function MainApp() {
  const [page, setPage] = useState(getPageFromHash);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const { totalItems } = useCart();

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Update dynamic document title
  useEffect(() => {
    switch (page) {
      case 'products':
        document.title = 'Browse Houseplants | Paradise Nursery 🌿';
        break;
      case 'cart':
        document.title = `Your Cart (${totalItems}) | Paradise Nursery 🌿`;
        break;
      default:
        document.title = 'Paradise Nursery 🌿 — House Plants for Happy Homes';
    }
  }, [page, totalItems]);

  const navigate = (p) => {
    const hashes = { home: '#/', products: '#/products', cart: '#/cart' };
    location.hash = hashes[p] || '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let content;
  switch (page) {
    case 'products':
      content = (
        <ProductsPage
          onQuickView={setSelectedPlant}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />
      );
      break;
    case 'cart':
      content = (
        <CartPage
          onNavigate={navigate}
          onQuickView={setSelectedPlant}
        />
      );
      break;
    default:
      content = (
        <LandingPage
          onNavigate={navigate}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenCareGuide={() => setIsCareGuideOpen(true)}
          onQuickView={setSelectedPlant}
        />
      );
  }

  return (
    <>
      <Navbar
        currentPage={page}
        onNavigate={navigate}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCareGuide={() => setIsCareGuideOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <main>{content}</main>

      <Footer
        onNavigate={navigate}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCareGuide={() => setIsCareGuideOpen(true)}
      />

      {/* Global Toast Notifications */}
      <Toast />

      {/* Plant Quick Look Modal */}
      {selectedPlant && (
        <PlantDetailModal
          product={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}

      {/* Interactive Plant Matcher Quiz */}
      {isQuizOpen && (
        <PlantQuizModal
          onClose={() => setIsQuizOpen(false)}
          onSelectProduct={(plant) => setSelectedPlant(plant)}
        />
      )}

      {/* Plant Care Guide Modal */}
      {isCareGuideOpen && (
        <CareGuideModal onClose={() => setIsCareGuideOpen(false)} />
      )}

      {/* Wishlist Drawer */}
      {isWishlistOpen && (
        <WishlistDrawer
          onClose={() => setIsWishlistOpen(false)}
          onSelectProduct={(plant) => setSelectedPlant(plant)}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
