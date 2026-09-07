import { useState } from 'react';

export default function Footer({ onNavigate, onOpenQuiz, onOpenCareGuide }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Newsletter Banner */}
        <div className="footer__newsletter">
          <div className="footer__newsletter-content">
            <span className="footer__newsletter-tag">💌 Join The Plant Family</span>
            <h3 className="footer__newsletter-title">Get 10% Off Your First Order</h3>
            <p className="footer__newsletter-desc">
              Subscribe for weekly plant care secrets, seasonal restocks, and exclusive green discounts.
            </p>
          </div>
          <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
            {subscribed ? (
              <div className="footer__newsletter-success">
                🎉 Welcome aboard! Use code <strong>WELCOME10</strong> at checkout.
              </div>
            ) : (
              <div className="footer__input-group">
                <input
                  type="email"
                  className="footer__input"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn--primary">
                  Subscribe
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Footer Links Grid */}
        <div className="footer__grid">
          <div className="footer__col">
            <div className="footer__brand">🌿 Paradise Nursery</div>
            <p className="footer__tagline">
              Nurturing healthy indoor ecosystems. Curated with love, packaged with care, and delivered fresh to every home.
            </p>
            <div className="footer__socials">
              <span className="social-pill" title="Instagram">📸 Instagram</span>
              <span className="social-pill" title="Pinterest">📌 Pinterest</span>
              <span className="social-pill" title="YouTube">🎥 Plant TV</span>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Quick Explore</h4>
            <ul className="footer__links">
              <li>
                <button className="footer__link-btn" onClick={() => onNavigate('home')}>
                  Home
                </button>
              </li>
              <li>
                <button className="footer__link-btn" onClick={() => onNavigate('products')}>
                  All Houseplants
                </button>
              </li>
              <li>
                <button className="footer__link-btn" onClick={onOpenQuiz}>
                  Plant Matcher Quiz
                </button>
              </li>
              <li>
                <button className="footer__link-btn" onClick={onOpenCareGuide}>
                  Plant Care Guide
                </button>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Our Promise</h4>
            <ul className="footer__promise-list">
              <li>🌱 100% Guaranteed Live Arrival</li>
              <li>📦 100% Recyclable Eco-Packaging</li>
              <li>🚚 Express Doorstep Delivery</li>
              <li>📞 7-Day Plant Doctor Support</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Paradise Nursery. Handcrafted with passion for happy homes & cleaner air.</p>
        </div>
      </div>
    </footer>
  );
}
