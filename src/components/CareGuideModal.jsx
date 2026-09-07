import { useEffect } from 'react';

export default function CareGuideModal({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-card--lg care-guide-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close care guide">
          ×
        </button>

        <div className="care-guide-header">
          <span className="care-guide-icon">📖</span>
          <h2 className="care-guide-title">Plant Doctor & Care Guide</h2>
          <p className="care-guide-subtitle">
            Everything you need to know to keep your Paradise Nursery green companions thriving for years.
          </p>
        </div>

        <div className="care-guide-grid">
          <div className="care-guide-card">
            <div className="care-guide-card__top">
              <span className="care-guide-card__icon">💧</span>
              <h3>The Golden Watering Rule</h3>
            </div>
            <p>
              More indoor plants die from overwatering than underwatering! Always perform the <strong>finger test</strong>: push your finger 1-2 inches into the soil. If it feels cool and damp, wait a few days. If dry, water thoroughly until liquid drains from the bottom holes.
            </p>
          </div>

          <div className="care-guide-card">
            <div className="care-guide-card__top">
              <span className="care-guide-card__icon">☀️</span>
              <h3>Decoding Sunlight</h3>
            </div>
            <p>
              <strong>Direct Sun:</strong> South or West windows with unfiltered rays (Herbs, Jade, Rosemary).<br />
              <strong>Bright Indirect:</strong> Read a book comfortably without turning on lights, no harsh rays (Jasmine, Spider Plant).<br />
              <strong>Low Light:</strong> Corners, bedrooms, and office cubicles (Snake Plant, ZZ Plant).
            </p>
          </div>

          <div className="care-guide-card">
            <div className="care-guide-card__top">
              <span className="care-guide-card__icon">🪴</span>
              <h3>Drainage & Repotting</h3>
            </div>
            <p>
              Always use pots with drainage holes to avoid root rot. Every Paradise Nursery plant arrives in a properly aerated nursery pot. Repot only when roots begin coiling out through the drainage holes, typically once every 12-18 months.
            </p>
          </div>

          <div className="care-guide-card">
            <div className="care-guide-card__top">
              <span className="care-guide-card__icon">🐾</span>
              <h3>Pet Safety First</h3>
            </div>
            <p>
              Many common plants contain calcium oxalate crystals which cause mouth irritation in curious cats or dogs. If you have active pets, pick certified <strong>Pet Safe</strong> choices like Tulsi, Spider Plant, and Jasmine!
            </p>
          </div>
        </div>

        <div className="care-guide-footer">
          <p>Have specific plant symptoms? Email our botanist team anytime at <strong>care@paradisenursery.com</strong></p>
          <button className="btn btn--primary" onClick={onClose}>
            Got It, Thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
