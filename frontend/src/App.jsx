// import Index from "./pages/landingPage/Index";
import AppRoutes from "./AppRoutes";
import { CartProvider } from "../src/pages/context/CartContext";


const App = () => {
  return (
    <CartProvider>
    <div>
      <AppRoutes />
    </div>
    </CartProvider>
  );
};

export default App;
