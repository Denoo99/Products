import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";

function ProductsPage({ products, cart, loading, onAddToCart, createProduct }) {
  return (
    <>
      {loading && <p className="info-text">Loading products...</p>}

      <ProductForm onCreateProduct={createProduct} />

      <div className="products-list">
        {products.map((product) => {
          const isInCart = cart.some((item) => {
            return item.id === product.id;
          });

          return (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              isInCart={isInCart}
              onAddToCart={() => onAddToCart(product)}
            />
          );
        })}
      </div>
    </>
  );
}

export default ProductsPage;
