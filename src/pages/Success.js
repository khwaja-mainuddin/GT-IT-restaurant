import { CheckCircle } from "react-bootstrap-icons";

const Success = () => (
  <div className="container mt-5 text-center">
    <CheckCircle size={64} className="text-success mb-3" />
    <h2 className="fw-bold mb-3">Order Confirmed!</h2>
    <p className="text-muted mb-4">
      Thank you for your order. You'll receive a confirmation shortly.
    </p>
    <a href="/" className="btn btn-primary px-4 py-2">
      Back to Home
    </a>
  </div>
);

export default Success;
