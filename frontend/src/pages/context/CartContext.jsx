import { createContext, useContext, useReducer } from 'react';

// Initial state of the cart
const initialState = {
  items: [], // This will hold items in the cart
  itemCount: 0, // Number of items in the cart
  total: 0, // Total price of items in the cart
};

// Create context
const CartContext = createContext();

// Reducer to handle actions
function cartReducer(state, action) {
    switch (action.type) {
      case 'ADD_ITEM': {
        // Wrap the case content in a block scope
        const newItem = action.payload;
        const exists = state.items.find(item => item.id === newItem.id);
        if (!exists) {
          return {
            ...state,
            items: [...state.items, newItem],
            itemCount: state.itemCount + 1,
            total: state.total + newItem.price,
          };
        }
        return state; // Return the existing state if item already exists
      }
      case 'REMOVE_ITEM': {
        // Wrap the case content in a block scope
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
          itemCount: state.itemCount - 1,
          total: state.total - action.payload.price,
        };
      }
      default:
        return state;
    }
  }
  

// CartProvider component that wraps your app and makes the cart context available to any child component that calls useCart().
// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
