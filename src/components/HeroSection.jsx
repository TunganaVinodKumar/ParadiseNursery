export default function HeroSection({ onNavigate }) {
  return (
    <section className="hero">
      <img
        className="hero__bg"
        src="/assets/hero.jpg"
        alt="Lush houseplants arrangement"
      />
      <div className="hero__overlay" />

      <div className="hero__content">
        <h1 className="hero__title">
          Bring Nature <span>Home</span>
        </h1>
        <p className="hero__subtitle">
          Discover aromatic and medicinal house plants that brighten your home,
          boost wellness, and smell amazing. Carefully curated, easy to care for,
          and delivered fresh to your doorstep.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            className="btn btn--primary btn--lg"
            onClick={() => onNavigate('products')}
          >
            Shop Now →
          </button>
          <button
            className="btn btn--outline-white btn--lg"
            onClick={() => {
              document.getElementById('why-plants')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
