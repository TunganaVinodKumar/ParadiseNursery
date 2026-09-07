import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import PRODUCTS from '../data/products';

const FEATURES = [
  {
    icon: '🌬️',
    title: 'Purify Your Air Naturally',
    text: 'Plants act as living bio-filters, absorbing common airborne pollutants like formaldehyde and benzene while producing fresh oxygen.',
  },
  {
    icon: '🧘',
    title: 'Reduce Stress & Boost Focus',
    text: 'Clinical studies demonstrate that surrounding yourself with living greenery lowers cortisol levels and boosts productivity by up to 15%.',
  },
  {
    icon: '🌿',
    title: 'Aromatherapy & Herbal Wellness',
    text: 'From sleep-inducing Lavender to fresh Mint and immunity-boosting Tulsi, grow your own pharmacy and natural room scents right at home.',
  },
  {
    icon: '🐾',
    title: 'Safe for Four-Legged Friends',
    text: 'We carefully curate non-toxic varieties so your cats and dogs stay curious, happy, and completely safe.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'My Tulsi and Lavender arrived impeccably packed and flourishing. The natural aroma fills my living room every single morning!',
    author: 'Priya Sharma',
    city: 'Bengaluru',
    rating: '★★★★★',
    plant: 'Tulsi & Lavender',
  },
  {
    quote: 'As a complete beginner, the Snake Plant was the best decision. Zero maintenance, indestructible, and looks like an art sculpture.',
    author: 'Arjun Mehta',
    city: 'Mumbai',
    rating: '★★★★★',
    plant: 'Snake Plant',
  },
  {
    quote: 'The Spider Plant with its pet-safe tag gave me total peace of mind with my two playful kittens. Gorgeous quality!',
    author: 'Neha Patel',
    city: 'Delhi',
    rating: '★★★★★',
    plant: 'Spider Plant',
  },
];

export default function LandingPage({ onNavigate, onOpenQuiz, onOpenCareGuide, onQuickView }) {
  // Show 4 featured products across categories
  const featured = [
    PRODUCTS.find((p) => p.id === 'med-tulsi'),
    PRODUCTS.find((p) => p.id === 'air-snakeplant'),
    PRODUCTS.find((p) => p.id === 'aro-lavender'),
    PRODUCTS.find((p) => p.id === 'low-zzplant'),
  ].filter(Boolean);

  return (
    <div className="page">
      <HeroSection
        onNavigate={onNavigate}
        onOpenQuiz={onOpenQuiz}
        onOpenCareGuide={onOpenCareGuide}
      />

      {/* Why House Plants */}
      <section className="section" id="why-plants">
        <div className="container">
          <div className="section__header">
            <span className="section__pill">The Green Advantage</span>
            <h2 className="section__title">Why Houseplants Transform Your Life</h2>
            <p className="section__subtitle">
              More than stunning decor — indoor plants purify air, ease mental fatigue, and restore your connection to nature.
            </p>
          </div>

          <div className="features-grid">
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
      <section className="section section--highlight">
        <div className="container">
          <div className="section__header">
            <span className="section__pill">Curated Favorites</span>
            <h2 className="section__title">Most Loved Houseplants</h2>
            <p className="section__subtitle">
              Hand-picked bestsellers proven to thrive indoors with minimal fuss.
            </p>
          </div>

          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              className="btn btn--primary btn--lg"
              onClick={() => onNavigate('products')}
            >
              View Full Nursery Collection ({PRODUCTS.length} Plants) →
            </button>
          </div>
        </div>
      </section>

      {/* Quiz Banner */}
      <section className="section">
        <div className="container">
          <div className="quiz-banner">
            <div className="quiz-banner__content">
              <span className="quiz-banner__tag">✨ Plant Matcher</span>
              <h2 className="quiz-banner__title">Unsure Which Plant Fits Your Space?</h2>
              <p className="quiz-banner__desc">
                Take our 60-second quiz! Tell us about your lighting conditions, pet habits, and watering routine, and we will reveal your ideal botanical matches.
              </p>
              <button className="btn btn--primary btn--lg" onClick={onOpenQuiz}>
                Start The Plant Matcher Quiz →
              </button>
            </div>
            <div className="quiz-banner__visual">
              <span className="quiz-banner__emoji">🪴✨🌿</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--muted">
        <div className="container">
          <div className="section__header">
            <span className="section__pill">Customer Stories</span>
            <h2 className="section__title">Loved by Thousands of Plant Parents</h2>
            <p className="section__subtitle">
              Read real experiences from happy customers cultivating greenery in their homes.
            </p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="testimonial-card">
                <div className="testimonial-rating">{t.rating}</div>
                <p className="testimonial-quote">“{t.quote}”</p>
                <div className="testimonial-meta">
                  <div>
                    <div className="testimonial-author">{t.author}</div>
                    <div className="testimonial-city">{t.city}</div>
                  </div>
                  <span className="testimonial-tag">{t.plant}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
