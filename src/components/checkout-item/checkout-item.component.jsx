import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
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
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);

  const clearItemHandler = () => {
    clearItemFromCart(cartItem);
  };

  const removeItemFromCartHandler = () => {
    removeItemFromCart(cartItem);
  };

  const addItemToCartHandler = () => {
    addItemToCart(cartItem);
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
