import { useState, useEffect } from 'react';
import PRODUCTS from '../data/products';
import { useCart } from '../CartContext';

function currency(n) {
  return '₹ ' + n.toFixed(2);
}

const QUESTIONS = [
  {
    id: 'light',
    question: 'Where will your new plant live?',
    subtitle: 'Sunlight is the food of plants — let’s find what fits your space.',
    options: [
      { label: 'Bright Sunny Window (Direct Sun)', value: 'direct', icon: '☀️' },
      { label: 'Living Room or Office (Bright Indirect)', value: 'indirect', icon: '🌤️' },
      { label: 'Dim Bedroom or Hallway (Low Light)', value: 'low', icon: '🌙' },
    ],
  },
  {
    id: 'pets',
    question: 'Do you have curious pets at home?',
    subtitle: 'We will filter for 100% non-toxic foliage safe for cats and dogs.',
    options: [
      { label: 'Yes, pets around (Must be Pet Safe 🐾)', value: 'petsafe', icon: '🐕' },
      { label: 'No pets or plant will be elevated out of reach', value: 'any', icon: '🪴' },
    ],
  },
  {
    id: 'lifestyle',
    question: 'How would you describe your plant care routine?',
    subtitle: 'Be honest! We have plants that love attention and plants that thrive on neglect.',
    options: [
      { label: 'I often forget to water (Ultra Low-Maintenance)', value: 'neglect', icon: '⏳' },
      { label: 'I can happily water once a week', value: 'weekly', icon: '💧' },
      { label: 'I love aromatic blossoms & wellness tea herbs', value: 'herbal', icon: '🌿' },
    ],
  },
];

export default function PlantQuizModal({ onClose, onSelectProduct }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const { dispatch, showToast } = useCart();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSelectOption = (value) => {
    const qId = QUESTIONS[currentStep].id;
    const nextAnswers = { ...answers, [qId]: value };
    setAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setCurrentStep(QUESTIONS.length); // results step
    }
  };

  // Match scoring
  const getMatches = () => {
    const scored = PRODUCTS.map((p) => {
      let score = 0;

      // Pet requirement check
      if (answers.pets === 'petsafe') {
        if (!p.petSafe) return { ...p, score: -100 };
        score += 5;
      }

      // Light match
      if (answers.light === 'direct' && (p.light.includes('Sun') || p.light.includes('Direct'))) {
        score += 5;
      } else if (answers.light === 'low' && p.light.includes('Low')) {
        score += 6;
      } else if (answers.light === 'indirect' && p.light.includes('Indirect')) {
        score += 5;
      }

      // Routine match
      if (answers.lifestyle === 'neglect') {
        if (p.water === 'Monthly' || p.category === 'Low Maintenance') score += 6;
      } else if (answers.lifestyle === 'herbal') {
        if (p.category === 'Aromatic Plants' || p.category === 'Medicinal Plants') score += 6;
      } else if (answers.lifestyle === 'weekly') {
        if (p.water === 'Weekly' || p.careLevel === 'Easy') score += 4;
      }

      return { ...p, score };
    });

    return scored.filter((p) => p.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const isCompleted = currentStep >= QUESTIONS.length;
  const matches = isCompleted ? getMatches() : [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-card--md quiz-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close quiz">
          ×
        </button>

        {!isCompleted ? (
          <div>
            <div className="quiz-progress-bar">
              <div
                className="quiz-progress-fill"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <div className="quiz-header">
              <span className="quiz-step-tag">
                Question {currentStep + 1} of {QUESTIONS.length}
              </span>
              <h2 className="quiz-question-title">{QUESTIONS[currentStep].question}</h2>
              <p className="quiz-question-subtitle">{QUESTIONS[currentStep].subtitle}</p>
            </div>

            <div className="quiz-options-list">
              {QUESTIONS[currentStep].options.map((opt) => (
                <button
                  key={opt.value}
                  className="quiz-option-btn"
                  onClick={() => handleSelectOption(opt.value)}
                >
                  <span className="quiz-option-icon">{opt.icon}</span>
                  <span className="quiz-option-text">{opt.label}</span>
                  <span className="quiz-option-arrow">→</span>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                  className="btn btn--ghost btn--sm"
                  onClick={() => setCurrentStep((s) => s - 1)}
                >
                  ← Back to Previous
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="quiz-results">
            <div className="quiz-results__header">
              <span className="quiz-results__badge">🎉 Perfect Matches Found</span>
              <h2 className="quiz-results__title">We Found Your Green Companions!</h2>
              <p className="quiz-results__subtitle">
                Based on your light conditions, pet safety, and lifestyle routine, here are the top plants recommended for you:
              </p>
            </div>

            <div className="quiz-matches-grid">
              {matches.map((plant) => (
                <div key={plant.id} className="quiz-match-card">
                  <img src={plant.img} alt={plant.name} className="quiz-match-img" />
                  <div className="quiz-match-info">
                    <div className="quiz-match-top">
                      <h3 className="quiz-match-name">{plant.name}</h3>
                      <span className="quiz-match-price">{currency(plant.price)}</span>
                    </div>
                    <p className="quiz-match-desc">{plant.desc}</p>
                    <div className="quiz-match-tags">
                      <span className="badge badge--primary">{plant.category}</span>
                      <span className="badge badge--level">{plant.careLevel}</span>
                      {plant.petSafe && <span className="badge badge--pet">🐾 Pet Safe</span>}
                    </div>
                    <div className="quiz-match-actions">
                      <button
                        className="btn btn--primary btn--sm"
                        onClick={() => {
                          dispatch({ type: 'ADD_TO_CART', id: plant.id });
                          showToast(`Added ${plant.name} to cart! 🌿`);
                        }}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn btn--ghost btn--sm"
                        onClick={() => {
                          onClose();
                          onSelectProduct(plant);
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                className="btn btn--outline"
                onClick={() => {
                  setAnswers({});
                  setCurrentStep(0);
                }}
              >
                🔄 Retake Quiz
              </button>
              <button className="btn btn--primary" onClick={onClose}>
                Explore All Plants
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
