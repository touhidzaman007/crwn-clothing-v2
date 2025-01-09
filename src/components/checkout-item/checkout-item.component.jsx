// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from '../../store/cart/cart.action';
import {
  Quantity,
  CheckoutItemContainer,
  ImageContainer,
  Image,
  Name,
  Price,
  Arrow,
  RemoveButton,
} from './checkout-item.styles';

function CheckoutItem({ cartItem }) {
  const { id, imageUrl, name, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const clearItemHandler = () => {
    dispatch(clearItemFromCart(cartItems, cartItem));
  };

  const removeItemFromCartHandler = () => {
    dispatch(removeItemFromCart(cartItems, cartItem));
  };

  const addItemToCartHandler = () => {
    dispatch(addItemToCart(cartItems, cartItem));
  };

  return (
    <CheckoutItemContainer key={id}>
      <ImageContainer>
        <Image src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={removeItemFromCartHandler}>&#10094;</Arrow>
        {quantity}
        <Arrow onClick={addItemToCartHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>${price * quantity}</Price>

      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
}

export default CheckoutItem;
