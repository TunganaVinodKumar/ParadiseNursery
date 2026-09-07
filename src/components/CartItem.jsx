import { useCart } from '../CartContext';

function currency(n) {
  return '₹ ' + n.toFixed(2);
}

export default function CartItem({ product, qty }) {
  const { dispatch, showToast } = useCart();
  const subtotal = product.price * qty;

  const handleRemoveAll = () => {
    dispatch({ type: 'REMOVE_ALL', id: product.id });
    showToast(`Removed ${product.name} from cart`, 'info');
  };

  return (
    <div className="cart-item">
      <img
        className="cart-item__img"
        src={product.img}
        alt={product.name}
      />

      <div className="cart-item__details">
        <div className="cart-item__title-row">
          <h4 className="cart-item__name">{product.name}</h4>
          <span className="cart-item__cat-badge">{product.category}</span>
        </div>
        <div className="cart-item__scientific">{product.scientificName}</div>
        <div className="cart-item__prices">
          <span className="cart-item__unit-price">Unit: {currency(product.price)}</span>
          <span className="cart-item__subtotal-tag">Subtotal: <strong>{currency(subtotal)}</strong></span>
        </div>
      </div>

      <div className="cart-item__controls">
        <div className="qty-stepper">
          <button
            className="qty-stepper__btn"
            onClick={() => dispatch({ type: 'REMOVE_ONE', id: product.id })}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="qty-stepper__value">{qty}</span>
          <button
            className="qty-stepper__btn"
            onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.id })}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          className="cart-item__delete-btn"
          onClick={handleRemoveAll}
          title="Remove from cart"
          aria-label={`Remove ${product.name} from cart`}
        >
          🗑️ Remove
        </button>
      </div>
    </div>
  );
}
