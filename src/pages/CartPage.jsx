import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import Cart from "../components/Cart";

function CartPage() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => {
    return state.cart.items;
  });

  let total = 0;
  cartItems.forEach((item) => {
    total = total + item.price;
  });

  return (
    <>
      <Cart
        cart={cartItems}
        total={total}
        onRemoveFromCart={(id) => dispatch(removeFromCart(id))}
        onClearCart={() => dispatch(clearCart())}
      />
    </>
  );
}

export default CartPage;
