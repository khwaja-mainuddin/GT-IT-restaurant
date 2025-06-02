import PropTypes from 'prop-types';

const Cart = ({ cart, removeFromCart, clearCart, updateQuantity }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatCurrency = (value) => `₹${value.toFixed(2)}`;

  return (
    <div className="container mt-4 p-3 bg-light rounded shadow">
      <h2 className="mb-4 text-center fw-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center p-3 mb-3 bg-white rounded border"
            >
              <div className="mb-2 mb-md-0">
                <span className="fs-5 fw-medium">{item.name}</span>
              </div>

              <div className="d-flex flex-column flex-md-row align-items-center gap-3 w-100 w-md-auto">
                {/* Quantity controls */}
                <div className="d-flex align-items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="btn btn-outline-secondary btn-sm"
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="fs-5 text-center" style={{ width: '40px' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="btn btn-outline-secondary btn-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <span className="fs-5 fw-semibold text-end" style={{ width: '120px' }}>
                  {formatCurrency(item.price * item.quantity)}
                </span>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn btn-outline-danger btn-sm"
                  aria-label="Remove item"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total and clear cart */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 pt-3 border-top">
            <p className="fs-4 fw-bold mb-3 mb-md-0">
              Total: {formatCurrency(total)}
            </p>
            <button
              onClick={clearCart}
              className="btn btn-danger w-100 w-md-auto px-5"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default Cart;
