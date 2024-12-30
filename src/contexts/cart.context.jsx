import { createContext, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  cartCount: 0,
  setCartCount: () => {},
  cartTotal: 0,
  setCartTotal: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    cartCount,
    setCartCount,
    cartTotal,
    setCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
