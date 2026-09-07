export default function HeroSection({ onNavigate, onOpenQuiz, onOpenCareGuide }) {
  return (
    <section className="hero">
      <img
        className="hero__bg"
        src="/assets/hero.jpg"
        alt="Lush green botanical houseplants arrangement"
        fetchpriority="high"
      />
      <div className="hero__overlay" />

      <div className="hero__content">
        <div className="hero__pill">🌿 Hand-Delivered Indoor Oasis</div>
        <h1 className="hero__title">
          Bring Nature <span>Home</span>
        </h1>
        <p className="hero__subtitle">
          Discover aromatic, medicinal, and air-purifying houseplants that transform your space,
          boost wellness, and purify every breath you take. Hand-nurtured and delivered fresh to your door.
        </p>

        <div className="hero__actions">
          <button
            className="btn btn--primary btn--lg"
            onClick={() => onNavigate('products')}
          >
            Explore All Plants →
          </button>
          <button
            className="btn btn--white btn--lg"
            onClick={onOpenQuiz}
          >
            ✨ Plant Matcher Quiz
          </button>
          <button
            className="btn btn--ghost-white btn--lg"
            onClick={onOpenCareGuide}
          >
            📖 Care Guide
          </button>
        </div>

        {/* Trust Badges */}
        <div className="hero__trust-badges">
          <div className="trust-badge">
            <span className="trust-badge__icon">🌱</span>
            <span className="trust-badge__text">100% Live Arrival Guarantee</span>
          </div>
          <div className="trust-badge">
            <span className="trust-badge__icon">🚚</span>
            <span className="trust-badge__text">Free Delivery on Orders Over ₹25</span>
          </div>
          <div className="trust-badge">
            <span className="trust-badge__icon">🐾</span>
            <span className="trust-badge__text">Pet-Safe Varieties</span>
          </div>
          <div className="trust-badge">
            <span className="trust-badge__icon">🪴</span>
            <span className="trust-badge__text">Eco-Nursery Pots Included</span>
          </div>
        </div>
      </div>
    </section>
  );
}
