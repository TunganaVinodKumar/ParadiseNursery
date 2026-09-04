export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">🌿 Paradise Nursery</div>
        <p className="footer__tagline">
          House plants for happy homes. Curated with care, delivered with love.
        </p>
        <p className="footer__copy">
          © {new Date().getFullYear()} Paradise Nursery. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
