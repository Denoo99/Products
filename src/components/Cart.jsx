function Cart({ cart, onRemoveFromCart, onClearCart, total }) {
  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="cart">
      <h2>Cart</h2>

      <p>Products in cart: {cart.length}</p>

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <span>{item.title}</span>

          <span>{item.price.toFixed(2)} €</span>

          <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <h3>Total: {total.toFixed(2)} €</h3>

      <button className="clear-btn" onClick={onClearCart}>
        Clear Cart
      </button>
    </div>
  );
}

export default Cart;
