import { useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Payment = ({ orderDetails, cart, clearCart }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay test key
      amount: total * 100, // Amount in paise
      currency: "INR",
      name: "Restaurant App",
      description: "Food Order Payment",
      handler: async function (response) {
        try {
          await addDoc(collection(db, "orders"), {
            orderDetails,
            cart,
            paymentId: response.razorpay_payment_id,
            timestamp: new Date(),
          });
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          clearCart();
          navigate("/success");
        } catch (error) {
          alert("Error saving order: " + error.message);
        }
      },
      prefill: {
        name: orderDetails.name,
        contact: orderDetails.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      alert("Payment failed: " + response.error.description);
    });
    rzp.open();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold">Payment</h2>
      <div className="card p-3 mb-4">
        <p><strong>Name:</strong> {orderDetails.name}</p>
        <p><strong>Phone:</strong> {orderDetails.phone}</p>
        <p><strong>Table Number:</strong> {orderDetails.tableNumber}</p>
        <p className="fw-bold mt-2">Total: ₹{total}</p>
      </div>
      <button
        onClick={handlePayment}
        className="btn btn-primary w-100 w-md-auto px-5"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;