import { useState, useEffect } from "react";
import { getAllFoods } from "../services/foodServices";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import ItemModal from "./ItemModal";
import "./Food.css";


const Food = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const navigate = useNavigate();


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  useEffect(() => {
    const getFoods = async () => {
      const foods = await getAllFoods();
      setCategories(foods);
      if (foods.length > 0) {
        setSelectedCategory(foods[0].categoryName);
      }
    };
    getFoods();
  }, []);

  const handleAddToCart = (itemToAdd) => {
    let updatedCart = [...cartItems];
    const itemIndex = updatedCart.findIndex((item) => item.id === itemToAdd.id);

    if (itemIndex > -1) {
      updatedCart[itemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...itemToAdd, quantity: 1 });
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddReview = (review) => {
    // Handle adding the review for the selected item
    console.log("Added review:", review);
    setShowModal(false);
  };

  return (
    <>
      <nav className="flex justify-between items-center padding-x">
        <a
          href="/"
          className="font-bold text-3xl text-primary hover:text-secondary"
        >
          FoodChop
        </a>
        <Link to="/cart" className="relative ml-4 hover:text-secondary">
          <FaShoppingCart
            className="text-primary hover:text-secondary  w-10 h-10"
            aria-label="Cart"
          />

          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 hover:bg-secondary bg-primary  text-white text-xs py-1 px-2 rounded-full">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" style={{ display: "block", marginTop: "2rem" }}>
          ← Return To Home
        </Link>
        <div className="flex justify-center mt-0 py-6">
          {categories.map((category) => (
            <button
              key={category.categoryName}
              className={`mx-2 px-3 py-2 rounded-md text-sm font-medium ${
                selectedCategory === category.categoryName
                  ? "bg-secondary text-white"
                  : "hover:bg-secondary/30"
              }`}
              onClick={() => setSelectedCategory(category.categoryName)}
            >
              {category.categoryName}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {categories
            .filter((category) => category.categoryName === selectedCategory)
            .map((category) =>
              category.items.map((item) => (
                <div
                  key={item.id}
                  className="border-primary text-left border-2 rounded-lg p-5 hover:bg-secondary text-primary hover:text-white-200 "
                >
                  <img
                    src={`/images/${item.imageUrl}`}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-md"
                    onClick={() => handleItemClick(item)}
                  />
                  <h3 className="text-2xl font-bold">{item.name}</h3>
                  <p className="text-lg font-light">{item.description}</p>
                  <p className="font-bold text-xl">${item.price}</p>
                  <div className="flex justify-between items-center mt-2">
                    <button
                      className="border-primary border-2 rounded-lg cursor-pointer py-2 text-xl px-1 hover:bg-primary/50 bg-white-200 text-primary hover:text-white-200"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add (${item.price})
                    </button>
                    {showModal && (
                      <ItemModal
                        item={selectedItem}
                        onClose={handleCloseModal}
                        onAddReview={handleAddReview}
                      />
                    )}
                    <Link to="/cart" className="relative ml-4 cursor-pointer">
                      Proceed To Cart →
                    </Link>
                  </div>
                </div>
              ))
            )}
        </div>
      </div>
    </>
  );
};

export default Food;
