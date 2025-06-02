import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cart from "./Cart";

const Checkout = ({ cart, setOrderDetails, clearCart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    tableNumber: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before proceeding.");
      return;
    }
    setOrderDetails(formData);
    navigate("/payment");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold">Checkout</h2>

      {/* Cart section */}
      <div className="mb-5">
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          updateQuantity={updateQuantity}
        />
      </div>

      {/* Order form */}
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-medium">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label fw-medium">Phone Number</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="10-digit phone number"
            pattern="[0-9]{10}"
            maxLength={10}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tableNumber" className="form-label fw-medium">Table Number</label>
          <input
            id="tableNumber"
            type="text"
            name="tableNumber"
            value={formData.tableNumber}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter table number"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={cart.length === 0}
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

Checkout.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  setOrderDetails: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default Checkout;
