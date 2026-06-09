import { useState, useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { getProducts, addProduct } from "./services/ProductService";
import { useSelector } from "react-redux";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cartItems = useSelector((state) => {
    return state.cart.items;
  });

  async function fetchProducts() {
    setLoading(true);
    setError("");

    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
      setError("Something went wrong while fetching products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async (newProduct) => {
    setLoading(true);
    setError("");

    try {
      const createdProduct = await addProduct(newProduct);

      setProducts([...products, createdProduct]);

      console.log(createdProduct);
    } catch (error) {
      console.log(error);
      setError("Something went wrong while creating the product.");
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
        cartCount={cartItems.length}
      />

      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route
          path="/products"
          element={
            <ProductsPage
              products={products}
              loading={loading}
              createProduct={createProduct}
            />
          }
        />

        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
