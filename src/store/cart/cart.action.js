import { CART_ACTIONS_TYPE } from './cart.types';
import { createReducerAction } from '../../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
  }
  return cartItems.map(cartItem =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
};

export const setIsCartOpen = boolean =>
  createReducerAction(CART_ACTIONS_TYPE.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createReducerAction(CART_ACTIONS_TYPE.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createReducerAction(CART_ACTIONS_TYPE.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createReducerAction(CART_ACTIONS_TYPE.SET_CART_ITEMS, newCartItems);
};
