import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
      setError("Something went wrong while fetching products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const exists = cart.some((item) => item.id === product.id);

    if (!exists) {
      setCart([...cart, product]);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app">
      <Header title="Product Store" subtitle="React Practice App" />

      {loading && <p>Loading products...</p>}

      {error && <p className="error">{error}</p>}

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            isInCart={cart.some((item) => item.id === product.id)}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>

      <Cart
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        total={total}
      />
    </div>
  );
}

export default App;
