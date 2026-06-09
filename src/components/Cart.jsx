function Cart({ cart, total, onRemoveFromCart, onClearCart }) {
  return (
    <div className="cart">
      <h2>Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map(function (item) {
        return (
          <div key={item.id} className="cart-item">
            <p>
              {item.title} - {item.price}€
            </p>

            <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
          </div>
        );
      })}

      <h3>Total: {total}€</h3>

      {cart.length > 0 && <button onClick={onClearCart}>Clear Cart</button>}
    </div>
  );
}

export default Cart;
