import { useState, useEffect } from "react";
import { FaTrashAlt, FaTruck, FaRegClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  // State for form inputs
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "Nigeria",
    state: "",
    postalCode: "",
    phone: "",
  });
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit handling logic here

    // Calculate total price
    const totalPrice = parseFloat(calculateTotal())

    // Create order object
    const order = {
      contact,
      deliveryMethod,
      cartItems,
      totalPrice,
    };

    // Save order to local storage
    localStorage.setItem("order", JSON.stringify(order));

    // Clear cart
    setCartItems([]);
    // Clear the cart from localStorage
    localStorage.removeItem("cartItems");

    // direct to order payment page
    //   window.location.href = "/payment";

    console.log(contact, deliveryMethod, cartItems);
    console.log(order);
  };

  // Function to handle removing an item from the cart
  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);

    // Update localStorage accordingly
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // This function updates the selected delivery method
  const selectDeliveryMethod = (method) => {
    setDeliveryMethod(method);
  };

  const calculateDeliveryFee = (items) => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const itemTotalCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const feeIncrement = Math.floor(itemTotalCount / 3);
    const deliveryFeePercentage = 1.5 + feeIncrement * 1.5;
    return (subtotal * (deliveryFeePercentage / 100)).toFixed(2);
  };

  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    const deliveryFee =
      deliveryMethod === "standard"
        ? parseFloat(calculateDeliveryFee(cartItems))
        : 30.0;

    return (itemsTotal + deliveryFee).toFixed(2);
  };

  return (
    <div className="flex flex-wrap mx-auto p-6">
      <form className="w-full lg:w-2/3 pr-4" onSubmit={handleSubmit}>
        <h2 className="text-lg my-3 text-gray-700 font-bold">
          Shipping information
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-md font-normal mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Chioma"
              value={contact.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-md font-normal mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Darasimi"
              value={contact.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="address"
            className="block text-gray-700 text-md font-normal  mb-2"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="123 Main Street"
            value={contact.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="apartment"
            className="block text-gray-700 text-md font-normal  mb-2"
          >
            Apartment, suite, etc. (optional)
          </label>
          <input
            type="text"
            name="apartment"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Apartment 512"
            value={contact.apartment}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="city"
              className="block text-gray-700 text-md font-normal mb-2"
            >
              City
            </label>
            <input
              type="text"
              name="city"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ikeja"
              value={contact.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-gray-700 text-md font-normal mb-2"
            >
              State
            </label>
            <input
              type="text"
              name="state"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Lagos"
              value={contact.state}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="postalCode"
              className="block text-gray-700 text-md font-normal mb-2"
            >
              Postal code
            </label>
            <input
              type="text"
              name="postalCode"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="12345"
              value={contact.postalCode}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-gray-700 text-md font-normal mb-2"
            >
              Country
            </label>
            <input
              type="text"
              name="country"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nigeria"
              value={(contact.country = "Nigeria")}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-md font-normal  mb-2"
          >
            Phone number
          </label>
          <input
            type="text"
            name="phone"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="08031234567"
            value={contact.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-lg  font-bold mb-2">
            Delivery method
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 border rounded cursor-pointer ${
                deliveryMethod === "standard"
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300"
              }`}
              onClick={() => selectDeliveryMethod("standard")}
            >
              <FaTruck className="inline mr-2" /> Standard Delivery
              <div className="text-gray-600">35-60 Minutes</div>
              <div className="font-bold">
                ${calculateDeliveryFee(cartItems)}
              </div>
            </div>
            <div
              className={`p-4 border rounded cursor-pointer ${
                deliveryMethod === "express"
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300"
              }`}
              onClick={() => selectDeliveryMethod("express")}
            >
              <FaRegClock className="inline mr-2" /> Express Delivery
              <div className="text-gray-600">10-25 Minutes</div>
              <div className="font-bold">$30.00</div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-secondary/95 hover:bg-secondary hover:text-white active:bg-primary active:text-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Confirm order
        </button>
      </form>

      <div className="w-full lg:w-1/3 pl-4">
        <div className="border border-gray-200 p-4 rounded-lg">
          <h2 className="font-bold text-xl mb-6">Order summary</h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex items-center">
                <img
                  src={`/images/${item.imageUrl}`}
                  alt={item.name}
                  className="h-12 w-12 object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <FaTrashAlt
                className="text-gray-400 cursor-pointer"
                onClick={() => handleRemoveItem(item.id)}
              />
            </div>
          ))}
          <div className="text-md space-y-2 mt-4">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>${cartItems
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping</span>
              <span>
                $
                {deliveryMethod === "standard"
                  ? parseFloat(calculateDeliveryFee(cartItems))
                  : "30.00"}
              </span>
            </p>

            <p className="flex justify-between font-bold">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </p>
          </div>
        </div>
      </div>
      <Link
        to="/cart"
        style={{ display: "block", marginTop: "1rem", marginBottom: "2rem" }}
      >
        ← Return To Cart
      </Link>
    </div>
  );
};

export default CheckoutPage;
