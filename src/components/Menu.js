import PropTypes from "prop-types";
import { menuItems } from "../data/menuItems";

const Menu = ({ addToCart }) => {
  // Get unique and sorted categories from the menu items
  const categories = [...new Set(menuItems.map(({ category }) => category))].sort();

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold">Menu</h2>
      {categories.map((category) => (
        <div key={category} className="mb-5">
          <h3 className="fs-4 fw-semibold mb-3">{category}</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <div key={item.id} className="col">
                  <div className="card h-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img-top"
                      style={{
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text mb-3">₹{item.price}</p>
                      <button
                        onClick={() => addToCart(item)}
                        className="btn btn-primary mt-auto"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

Menu.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Menu;
