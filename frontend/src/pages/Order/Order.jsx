import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderProcessing = () => {
  const steps = ['Order Placed', 'Payment', 'Processing', 'Shipped', 'Delivered'];
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [backendResponse, setBackendResponse] = useState(null);

  useEffect(() => {
    switch (currentStep) {
      case 0:
        setTimeout(() => {
          setBackendResponse({ status: 'success', message: 'Order placed successfully' });
          setCurrentStep(1);
        }, 2000);
        break;
      case 1:
        setPaymentProcessing(true);
        // eslint-disable-next-line no-case-declarations
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 25));
        }, 300);

        setTimeout(() => {
          setPaymentProcessing(false);
          setBackendResponse({ status: 'success', message: 'Payment processed successfully' });
          setCurrentStep(2);
          clearInterval(timer);
        }, 3000);
        break;
      case 2:
        setTimeout(() => {
          setBackendResponse({ status: 'success', message: 'Order is being processed' });
          setCurrentStep(3);
        }, 2000);
        break;
      case 3:
        setTimeout(() => {
          setBackendResponse({ status: 'success', message: 'Order has been shipped' });
          setCurrentStep(4);
        }, 2000);
        break;
      case 4:
        setTimeout(() => {
          setBackendResponse({ status: 'success', message: 'Order has been delivered' });
        }, 2000);
        break;
      default:
        break;
    }
  }, [currentStep]);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Order Processing</h1>
      <Link
          to="/"
          style={{ display: "block", marginTop: "2rem", marginBottom: "2rem" }}
        >
          ← Return To Home
        </Link>
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex-1 text-center py-2 ${
              index < currentStep
                ? 'bg-green-500 text-white'
                : index === currentStep
                ? 'bg-secondary text-white'
                : 'bg-gray-300 text-gray-600'
            }`}
          >
            {step}
          </div>
        ))}
      </div>
      {currentStep === 1 && paymentProcessing && (
        <div className="flex flex-col items-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          <p className="mt-4 text-secondary font-bold">Processing Payment</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div
              className="bg-s text-secondary h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {backendResponse && (
        <div
          className={`${
            backendResponse.status === 'success' ? 'bg-gray-200 text-primary' : 'bg-red-100 text-red-700'
          } border rounded-md p-4 mb-4`}
        >
          <p>{backendResponse.message}</p>
        </div>
      )}
      
    </div>
    
  );
};

export default OrderProcessing;

// import{ useState, useEffect } from 'react';
// import { FaSpinner } from 'react-icons/fa';

// const OrderProcessing = () => {
//   const steps = [
//     'Order Placed', 'Payment', 'Processing', 'Shipped', 'Delivered'
//   ];
//   const [currentStep, setCurrentStep] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [orderStatus, setOrderStatus] = useState('');

//   // Function to fetch order status from the backend
//   const fetchOrderStatus = async () => {
//     try {
//       // Simulating an API call
//       const response = await fetch("/api/order/status");
//       if (!response.ok) throw new Error("Failed to fetch order status");
//       const data = await response.json();
//       setOrderStatus(data.status);
//       setCurrentStep(steps.indexOf(data.status));
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchOrderStatus();
//     // Polling the backend for status updates every 5 seconds
//     const intervalId = setInterval(fetchOrderStatus, 5000);
//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     if (orderStatus === "Payment") {
//       const timer = setInterval(() => {
//         setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
//       }, 200);
//       return () => clearInterval(timer);
//     }
//   }, [orderStatus]);

//   const cancelOrder = async () => {
//     try {
//       // Simulating an API call
//       const response = await fetch("/api/order/cancel", { method: "POST" });
//       if (!response.ok) throw new Error("Failed to cancel order");
//       await fetchOrderStatus(); // Refresh order status
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const confirmOrder = async () => {
//     try {
//       // Simulating an API call
//       const response = await fetch("/api/order/confirm", { method: "POST" });
//       if (!response.ok) throw new Error("Failed to confirm order");
//       await fetchOrderStatus(); // Refresh order status
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Order Processing</h1>
//       <div className="flex justify-between mb-8">
//         {steps.map((step, index) => (
//           <div key={index} className={`flex-1 text-center py-2 ${index < currentStep ? 'bg-green-500 text-white' : index === currentStep ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
//             {step}
//           </div>
//         ))}
//       </div>
//       {/* Dynamic elements based on orderStatus */}
//       {orderStatus === "Payment" && (
//         <div className="flex flex-col items-center mb-4">
//           <FaSpinner className="animate-spin text-4xl text-yellow-500" />
//           <p className="mt-4 text-yellow-500 font-bold">Processing Payment...</p>
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
//             <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
//           </div>
//         </div>
//       )}

//       {/* Display Cancel button for early stages */}
//       {['Order Placed', 'Payment', 'Processing'].includes(orderStatus) && (
//         <button
//           onClick={cancelOrder}
//           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
//         >
//           Cancel Order
//         </button>
//       )}

//       {/* Display Confirm button once delivered */}
//       {orderStatus === "Delivered" && (
//         <button
//           onClick={confirmOrder}
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out mt-4"
//         >
//           Confirm Order
//         </button>
//       )}
//     </div>
//   );
// };

// export default OrderProcessing;
