import { useCart } from '../CartContext';

export default function Toast() {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-bubble toast-bubble--${toast.type || 'success'}`}>
          <span className="toast-bubble__icon">
            {toast.type === 'error' ? '⚠️' : toast.type === 'info' ? 'ℹ️' : '🌿'}
          </span>
          <span className="toast-bubble__msg">{toast.message}</span>
          <button
            className="toast-bubble__close"
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
