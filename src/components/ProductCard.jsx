import { useState } from 'react';
import { useCart } from '../CartContext';

function currency(n) {
  return '₹ ' + n.toFixed(2);
}

export default function ProductCard({ product }) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    dispatch({ type: 'ADD_TO_CART', id: product.id });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="product-card">
      <div className="product-card__img-wrapper">
        <img
          className="product-card__img"
          src={product.img}
          alt={product.name}
          loading="lazy"
        />
        <span className="product-card__category">{product.category}</span>
      </div>

      <div className="product-card__body">
        <div className="product-card__name">{product.name}</div>
        <div className="product-card__desc">{product.desc}</div>
        <div className="product-card__footer">
          <span className="product-card__price">{currency(product.price)}</span>
          <button
            className={`btn ${added ? 'btn--success btn--sm' : 'btn--primary btn--sm'}`}
            onClick={handleAdd}
            disabled={added}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
}
