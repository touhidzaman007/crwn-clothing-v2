import './cart-item.styles.scss';
function CartItem({ cartItem }) {
  const { imageUrl, name, quantity, price } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
}

export default CartItem;
