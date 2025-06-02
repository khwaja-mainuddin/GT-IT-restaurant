import PropTypes from "prop-types";
import Menu from "../components/Menu";

const Home = ({ addToCart }) => {
  return (
    <div className="container mt-4">
      <h1 className="text-center fw-bold mb-4">Welcome to GT-IT restaurant</h1>
      <Menu addToCart={addToCart} />
    </div>
  );
};

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Home;
