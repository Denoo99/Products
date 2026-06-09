import { useState, useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

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
      {error && <p className="error-text">{error}</p>}

      <Header
        title="Product Store"
        subtitle="Welcome!"
        cartCount={cart.length}
      />

      <Routes>
        {/* default path */}
        <Route path="/" element={<Navigate to="/products" />} />

        <Route
          path="/products"
          element={
            <ProductsPage
              products={products}
              cart={cart}
              loading={loading}
              onAddToCart={handleAddToCart}
              createProduct={createProduct}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              total={total}
              handleRemoveFromCart={handleRemoveFromCart}
              handleClearCart={handleClearCart}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
