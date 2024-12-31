import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './checkout.styles.jsx';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
function Checkout() {
  const { cartItems, cartTotal } = useContext(CartContext);
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
      <Total as="span">Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
}

export default Checkout;
