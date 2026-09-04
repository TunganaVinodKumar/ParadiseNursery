import { useCart } from '../CartContext';

function currency(n) {
  return '₹ ' + n.toFixed(2);
}

export default function CartItem({ product, qty }) {
  const { dispatch } = useCart();
  const subtotal = product.price * qty;

  return (
    <div className="cart-item">
      <img
        className="cart-item__img"
        src={product.img}
        alt={product.name}
      />

      <div>
        <div className="cart-item__name">{product.name}</div>
        <div className="cart-item__price">Unit: {currency(product.price)}</div>
        <div className="cart-item__subtotal">Subtotal: {currency(subtotal)}</div>
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
          className="btn btn--danger btn--sm"
          onClick={() => dispatch({ type: 'REMOVE_ALL', id: product.id })}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
