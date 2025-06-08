import { useState, useEffect } from "react";
import axios from "axios";

const Menu = ({ addToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenuItems(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch menu items: " + err.message);
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  if (loading) return <div className="container mt-4 text-center">Loading...</div>;
  if (error) return <div className="container mt-4 text-center text-danger">{error}</div>;

  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold">Menu</h2>
      {categories.map(category => (
        <div key={category} className="mb-5">
          <h3 className="fs-4 fw-semibold mb-3">{category}</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {menuItems
              .filter(item => item.category === category)
              .map(item => (
                <div key={item.id} className="col">
                  <div className="card h-100">
                    <img src={item.image} alt={item.name} className="card-img-top" style={{ height: "150px", objectFit: "cover" }} />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">₹{item.price}</p>
                      <button
                        onClick={() => addToCart(item)}
                        className="btn btn-primary w-100"
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

export default Menu;