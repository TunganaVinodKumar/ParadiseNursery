import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import PRODUCTS from '../data/products';

const FEATURES = [
  {
    icon: '🌬️',
    title: 'Purify Your Air',
    text: 'Plants naturally filter toxins and release fresh oxygen, making every breath in your home cleaner and healthier.',
  },
  {
    icon: '🧘',
    title: 'Reduce Stress',
    text: 'Studies show indoor greenery lowers cortisol levels, eases anxiety, and creates a calming sanctuary at home.',
  },
  {
    icon: '🎨',
    title: 'Elevate Your Space',
    text: 'From minimalist succulents to lush ferns, plants add life, color, and character to any room instantly.',
  },
];

export default function LandingPage({ onNavigate }) {
  // Show 3 featured products
  const featured = PRODUCTS.slice(0, 3);

  return (
    <div className="page">
      <HeroSection onNavigate={onNavigate} />

      {/* Why House Plants */}
      <section className="section" id="why-plants">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Why House Plants?</h2>
            <p className="section__subtitle">
              More than decor — plants transform your home into a healthier, happier place to live.
            </p>
          </div>

          <div className="features-grid stagger-children">
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.title}>
                <span className="feature-card__icon">{f.icon}</span>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__text">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="section" style={{ background: 'rgba(22,163,74,0.03)' }}>
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Featured Plants</h2>
            <p className="section__subtitle">
              Hand-picked favorites to get you started on your plant journey.
            </p>
          </div>

          <div className="product-grid stagger-children">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button
              className="btn btn--primary btn--lg"
              onClick={() => onNavigate('products')}
            >
              View All Plants →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
