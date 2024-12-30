import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  // Check if the product is already in the cart
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );
  // If the product is already in the cart, increase the quantity
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // If the product is not in the cart, add it with a quantity of 1
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  cartTotal: 0,
  setCartTotal: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartTotal);
  }, [cartItems]);

  const addItemToCart = productToAdd => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    cartTotal,
    setCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
