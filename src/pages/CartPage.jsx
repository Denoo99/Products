import Cart from "../components/Cart";

function CartPage({ cart, total, handleRemoveFromCart, handleClearCart }) {
  return (
    <>
      <Cart
        cart={cart}
        total={total}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </>
  );
}

export default CartPage;
