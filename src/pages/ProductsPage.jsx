import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";

function ProductsPage({ products, loading, createProduct }) {
  const cartItems = useSelector((state) => {
    return state.cart.items;
  });

  const dispatch = useDispatch();
  return (
    <>
      {loading && <p className="info-text">Loading products...</p>}

      <ProductForm onCreateProduct={createProduct} />

      <div className="products-list">
        {products.map((product) => {
          const isInCart = cartItems.some((item) => {
            return item.id === product.id;
          });

          return (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              isInCart={isInCart}
              onAddToCart={() => dispatch(addToCart(product))}
            />
          );
        })}
      </div>
    </>
  );
}

export default ProductsPage;
