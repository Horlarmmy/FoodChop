import {
  FaRegClock,
  FaChevronRight,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from "react-router-dom";

const OrderProcessing = () => {
  // Static data for demonstration purposes
  const ongoingOrders = [
    { id: "1DFD9E", item: "Tuwo", arrivalTime: "35 min" },
    { id: "3E40A9", item: "Rice and Beans", arrivalTime: "60 min" },
  ];

  const previousOrders = [
    {
      id: "PH12G3",
      restaurant: "FoodChop",
      date: "September 16, 2023",
      time: "11:54 PM",
      status: "Completed",
      items: ["Beef Shawarma"],
    },
    {
      id: "C2R123",
      restaurant: "FoodChop",
      date: "April 12, 2024",
      time: "12:06 AM",
      status: "Cancelled",
      items: ["Meat Pie", "Coca Cola"],
    },
  ];

  const [showTrackingMap, setShowTrackingMap] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const mapContainerRef = useRef(null);

  // const mapboxApiKey = import.meta.env.VITE_MAPBOX_API_KEY;

  // Fetch the user's current location when the component mounts
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    const deliveryInfo = {
      estimatedArrival: "35 min",
      distance: "3.6 km",
      status: [
        { status: "Delivered", time: "" },
        { status: "On the way", time: "12:48 am" },
        { status: "Food is ready", time: "12:42 am" },
      ],
      contactNumber: "Edward",
    };
    setDeliveryInfo(deliveryInfo);
  }, []);

  const handleTrackOrder = () => {
    setShowTrackingMap(true);
  };

  const handleCloseTrackingMap = () => {
    setShowTrackingMap(false);
  };

  // Initialize the Mapbox map when the currentLocation state is updated
  useEffect(() => {
    if (currentLocation && mapContainerRef.current) {
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [currentLocation.longitude, currentLocation.latitude],
        zoom: 13,
      });

      new mapboxgl.Marker()
        .setLngLat([currentLocation.longitude, currentLocation.latitude])
        .addTo(map);

      return () => map.remove();
    }
  }, [currentLocation, mapContainerRef]);

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="hover:underline" style={{ display: "block" }}>
        ← Return To Home
      </Link>
      <h1 className="text-2xl font-bold pt-1 text-gray-800 mb-6">
        Tanke, Ilorin
      </h1>
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Upcoming orders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ongoingOrders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded shadow-sm flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium">{order.item}</h3>
                <div className="flex items-center mt-1">
                  <FaRegClock className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    Estimated arrival {order.arrivalTime}
                  </span>
                </div>
              </div>
              <button
                className="bg-secondary text-white px-3 py-1 rounded text-sm"
                onClick={() => handleTrackOrder(order)}
              >
                Track
              </button>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Previous orders
        </h2>
        <div className="space-y-4">
          {previousOrders.map((order) => (
            <div key={order.id} className="border p-4 rounded shadow-sm">
              <h3 className="font-medium">{order.restaurant}</h3>
              <div className="text-sm text-gray-600">
                {order.date} @ {order.time}
              </div>
              <ul className="my-2">
                {order.items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between mt-4">
                <span
                  className={`text-xs font-semibold py-1 px-2 rounded ${
                    order.status === "Completed"
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
                <div className="flex">
                  <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center mr-4">
                    Details <FaChevronRight className="ml-1" />
                  </button>
                  <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                    Get help <FaRegQuestionCircle className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tracking map overlay */}
      {showTrackingMap && (
        <div className="fixed top-0 right-0 w-1/3 h-screen bg-white shadow-lg p-6 z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Order Tracking</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={handleCloseTrackingMap}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {currentLocation && (
            <div>
              <div ref={mapContainerRef} style={{ height: "350px" }}></div>
              <div className="flex justify-between mb-4">
                <div>
                  <span className="font-bold">Estimated arrival:</span>
                  <span className="ml-2">{deliveryInfo.estimatedArrival}</span>
                </div>
                <div>
                  <span className="font-bold">Distance:</span>
                  <span className="ml-2">{deliveryInfo.distance}</span>
                </div>
              </div>
              <div className="space-y-2">
                {deliveryInfo.status.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        item.status === "On the way"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <span>{item.status}</span>
                    {item.time && <span className="ml-2">at {item.time}</span>}
                  </div>
                ))}
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Call to {deliveryInfo.contactNumber}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderProcessing;
// import { useState, useEffect } from "react";
// import {
//   FaRegClock,
//   FaChevronRight,
//   FaRegQuestionCircle,
// } from "react-icons/fa";

// const OrderProcessing = () => {
//   const [ongoingOrders, setOngoingOrders] = useState([]);
//   const [previousOrders, setPreviousOrders] = useState([]);

//   const [cartItems, setCartItems] = useState([]);
//   const [showTrackingMap, setShowTrackingMap] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem("cartItems")) || [];
//     setCartItems(items);
//     setOngoingOrders(items); // Initialize ongoing orders with cart items
//   }, []);

//   useEffect(() => {
//     const ongoing = cartItems.filter((item) => item.status === "ongoing");
//     const previous = cartItems.filter((item) => item.status !== "ongoing");
//     setOngoingOrders(ongoing);
//     setPreviousOrders(previous);
//   }, [cartItems]);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setCurrentLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//       },
//       { enableHighAccuracy: true }
//     );
//   }, []);

//   const handleTrackOrder = () => {
//     setShowTrackingMap(true);
//   };

//   const handleCloseTrackingMap = () => {
//     setShowTrackingMap(false);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">
//         Tanke, Ilorin
//       </h1>
//       <section className="mb-10">
//         <h2 className="text-lg font-semibold text-gray-700 mb-4">
//           Upcoming orders
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {ongoingOrders.map((order, index) => (
//             <div
//               key={index}
//               className="border p-4 rounded shadow-sm flex items-center justify-between"
//             >
//               <div>
//                 <h3 className="font-medium">{order.restaurant}</h3>
//                 <div className="flex items-center mt-1">
//                   <FaRegClock className="text-gray-500 mr-2" />
//                   <span className="text-sm text-gray-600">
//                     Estimated arrival {order.arrivalTime}
//                   </span>
//                 </div>
//               </div>
//               <button
//                 className="bg-secondary text-white px-3 py-1 rounded-md"
//                 onClick={handleTrackOrder}
//               >
//                 Track
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//       <section>
//         <h2 className="text-lg font-semibold text-gray-700 mb-4">
//           Previous orders
//         </h2>
//         <div className="space-y-4">
//           {previousOrders.map((order) => (
//             <div key={order.id} className="border p-4 rounded shadow-sm">
//               <h3 className="font-medium">{order.restaurant}</h3>
//               <div className="text-sm text-gray-600">
//                 {order.date} @ {order.time}
//               </div>
//               <ul className="my-2">
//                 {order.items?.map((item, index) => (
//                   <li key={index} className="text-sm text-gray-600">
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//               <div className="flex items-center justify-between mt-4">
//                 <span
//                   className={`text-xs font-semibold py-1 px-2 rounded ${
//                     order.status === "Completed"
//                       ? "bg-green-200 text-green-700"
//                       : "bg-red-200 text-red-700"
//                   }`}
//                 >
//                   {order.status}
//                 </span>
//                 <div className="flex">
//                   <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center mr-4">
//                     Details <FaChevronRight className="ml-1" />
//                   </button>
//                   <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
//                     Get help <FaRegQuestionCircle className="ml-1" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Tracking map overlay */}
//       {showTrackingMap && (
//         <div className="fixed top-0 right-0 w-1/3 h-screen bg-white shadow-lg p-6 z-50">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold">Order Tracking</h2>
//             <button
//               className="text-gray-500 hover:text-gray-700"
//               onClick={handleCloseTrackingMap}
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//           {/* Tracking map overlay */}
//           {showTrackingMap && (
//             <div className="fixed top-0 right-0 w-1/3 h-screen bg-white shadow-lg p-6 z-50">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-bold">Order Tracking</h2>
//                 <button
//                   className="text-gray-500 hover:text-gray-700"
//                   onClick={handleCloseTrackingMap}
//                 >
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               {currentLocation && (
//                 <div>
//                   <div id="map" style={{ height: "400px" }}></div>
//                   <div className="flex items-center mt-4">
//                     <div className="bg-orange-500 w-3 h-3 rounded-full mr-2"></div>
//                     <span className="text-gray-600">
//                       Estimated arrival: 35 min
//                     </span>
//                   </div>
//                   <div className="flex items-center mt-2">
//                     <div className="bg-blue-500 w-3 h-3 rounded-full mr-2"></div>
//                     <span className="text-gray-600">Distance: 3.6 km</span>
//                   </div>
//                   <div className="flex items-center mt-2">
//                     <div className="bg-green-500 w-3 h-3 rounded-full mr-2"></div>
//                     <span className="text-gray-600">Delivered</span>
//                   </div>
//                   <div className="flex items-center mt-2">
//                     <div className="bg-gray-400 w-3 h-3 rounded-full mr-2"></div>
//                     <span className="text-gray-600">Food is ready</span>
//                   </div>
//                   <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-6">
//                     Call to (Edward)
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderProcessing;
