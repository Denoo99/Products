import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import Cart from "./components/Cart";
import ProductForm from "./components/ProductForm";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://fakestoreapi.com/";
  async function fetchProducts() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}products`);
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      setError("Something went wrong while fetching products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(function () {
    fetchProducts();
  }, []);

  function handleAddToCart(product) {
    setCart([...cart, product]);
  }

  function handleRemoveFromCart(id) {
    const updatedCart = cart.filter(function (item) {
      return item.id !== id;
    });

    setCart(updatedCart);
  }

  function handleClearCart() {
    setCart([]);
  }

  let total = 0;

  cart.forEach((item) => {
    total = total + item.price;
  });

  const createProduct = async (newProduct) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const createdProduct = await response.json();

      setProducts([...products, createdProduct]);

      console.log(createdProduct);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {loading && <p className="info-text">Loading products...</p>}

      {error && <p className="error-text">{error}</p>}

      <Header title="Product Store" subtitle="Welcome!" />
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
              onAddToCart={() => handleAddToCart(product)}
            />
          );
        })}
      </div>

      <Cart
        cart={cart}
        total={total}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <ProductForm onCreateProduct={createProduct} />
    </div>
  );
}

export default App;
